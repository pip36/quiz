<template>

  <div class="quiz">
    <section class="section">
      <div class="container"> 
        <template v-if="quiz.title !== undefined && !finished">
          
          <h1 class="title"> {{quiz.title}} </h1>
          <p> {{correctAnswers}}/{{quiz.questions.length}} correct </p>

          <question 
            :question="quiz.questions[currentQuestion]"
            :correct="correct"
            :answered="answered"
            @answer="setCorrect($event)"> 
          </question>

          
          <div class="section has-text-centered">
            <button 
              v-if="answered && currentQuestion < quiz.questions.length-1" 
              class="button is-primary is-large" 
              @click="loadNextQuestion()">
                Next Question
            </button>
            <button 
              v-if="answered && currentQuestion >= quiz.questions.length-1" 
              class="button is-primary is-large" 
              @click="showResults()">
                Show Results
            </button>
          </div>
        </template>

        <results v-show="finished" :correctAnswers="correctAnswers" :questions="quiz.questions"> </results>
  
      </div>
    </section>
  </div>

</template>

<script>
import Question from '@/components/Question'
import Results from '@/components/Results'

export default {
  name: 'Quiz',
  components: {
    'question': Question,
    'results': Results
  },
  data () {
    return {
      quiz: {},
      currentQuestion: 0,
      answered: false,
      correct: null,
      correctAnswers: 0,
      finished: false
    }
  },
  created() {
    this.setQuiz()
    this.loadQuiz()
  },
  methods: {
    setQuiz(){
      var id = this.$route.params.id
      if(id !== undefined){  this.$store.commit('setQuiz', id) }  
    },

    loadQuiz() {      
      var quizRef = this.$store.state.db.collection("quizzes").doc(this.$store.state.activeQuiz)
      quizRef.get().then((doc) => {
        if (doc.exists) {       
          this.quiz = doc.data()
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });     
    },

    setCorrect(bool) {
      this.answered = true
      this.correct = bool
      if(bool == true){ this.correctAnswers++ }
    },

    loadNextQuestion() {
      if(this.currentQuestion + 1 < this.quiz.questions.length){
        this.correct = null
        this.answered = false   
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
