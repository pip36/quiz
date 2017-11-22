<template>

  <div class="quiz">
    <section class="section">
      <div class="container"> 
        <template v-if="quiz.title !== undefined && !finished">
          <h1 class="title"> {{quiz.title}} </h1>
          <p> {{correctAnswers}}/{{quiz.questions.length}} correct </p>


          <ul class="has-text-centered">
            <h2 class="subtitle"> {{ quiz.questions[currentQuestion].title }} </h2>
            <li v-for="(answer, index) in shuffledAnswers" :key="index">
              <div :class="{'notification': true, 
                            'is-success': answer===selectedAnswer && correct,
                            'is-danger': answer===selectedAnswer && incorrect}"> 
                <button 
                  class="button is-info answer"
                  @click="checkAnswer(index)"
                  :disabled="correct || incorrect"> 
                  {{answer}} 
                </button>
              </div>
            </li> 
          </ul>
          <div class="section has-text-centered">
            <button 
              v-if="selectedAnswer && currentQuestion < quiz.questions.length-1" 
              class="button is-primary is-large" 
              @click="loadNextQuestion()">
              Next Question
            </button>
            <button 
              v-if="selectedAnswer && currentQuestion >= quiz.questions.length-1" 
              class="button is-primary is-large" 
              @click="showResults()">
              Show Results
            </button>
          </div>
        </template>

        <template>
          <div class="container has-text-centered" v-show="finished">
            <h1 class="title"> Done! </h1>
            <p> You got{{correctAnswers}}/{{quiz.questions.length}} correct </p>
            <h3 class="subtitle"> That's {{scorePercentage}}% </h3>
          </div>
        </template>
       
      </div>
    </section>
  </div>

</template>

<script>

export default {
  name: 'Quiz',
  data () {
    return {
      quiz: {},
      currentQuestion: 0,
      selectedAnswer: null,
      correct: false,
      incorrect: false,
      correctAnswers: 0,
      finished: false
    }
  },
  computed: {
    shuffledAnswers: function() {
      return this.shuffleArray(this.quiz.questions[this.currentQuestion].possibleAnswers)
    },
    scorePercentage: function(){
      return Math.round((this.correctAnswers/this.quiz.questions.length)*100)
    }
  },
  created() {
    this.setQuiz()
  },
  mounted() {
    this.loadQuiz()
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    },

    setQuiz(){
      var id = this.$route.params.id
      if(id !== undefined){  this.$store.commit('setQuiz', id) }
      
    },

    loadQuiz() {      
      var quizRef = this.$store.state.db.collection("quizzes").doc(this.$store.state.activeQuiz)
      quizRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
         
          this.quiz = doc.data()
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });     
    },

    checkAnswer(index) {
      var correctAnswer = this.quiz.questions[this.currentQuestion].correctAnswer
      var clickedAnswer = this.quiz.questions[this.currentQuestion].possibleAnswers[index]
      this.selectedAnswer = clickedAnswer
      if (correctAnswer === clickedAnswer) {
        this.correct = true
        this.correctAnswers++
      }else{
        this.incorrect = true    
      }   
    },

    loadNextQuestion() {
      if(this.currentQuestion + 1 < this.quiz.questions.length){
        this.correct = false
        this.incorrect = false
        this.selectedAnswer = null    
        this.currentQuestion++
      }
    },

    showResults() {
      this.finished = true
    }
  }
}
</script>


<style scoped>
  .answer{
    min-width: 200px;
  
  }
</style>
