<template>

  <div class="quiz">
    <section class="section">
      <div class="container"> 
        <template v-if="quiz.title !== undefined && !finished">         
          <h1 class="title"> {{quiz.title}} </h1>
          <p> {{correctAnswers}}/{{maximumScore}} correct </p>

          <question 
            ref="question"
            :question="quiz.questions[currentQuestion]"
            :owner="quiz.owner"
            :correct="correct"
            :answered="answered"
            @answer="setCorrect($event)"
            @score="incrementScore()"> 
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

        <results v-if="finished" :correctAnswers="correctAnswers" :numberCorrect="correctAnswers" :totalPossible="maximumScore" @reset="resetQuiz()"> </results>
  
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
  computed: {
    maximumScore: function() {
      var questionArr = this.quiz.questions
      var total = 0
      for(var i = 0; i < questionArr.length; i++){
        if(questionArr[i].type == 'Typed List'){
          total += questionArr[i].possibleAnswers.length
        }else{
          total++
        }
      }
      return total
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

    resetQuiz () {
      this.currentQuestion = 0
      this.answered = false
      this.correct = null
      this.finished = false
      this.correctAnswers = 0
    },

    setCorrect(bool) {
      this.answered = true
      this.correct = bool
      if(bool == true){ this.correctAnswers++ }
    },

    incrementScore() {
      this.correctAnswers++
    },

    completeList() {
      this.answered = true
      this.correct = true
    },

    loadNextQuestion() {
      if(this.currentQuestion + 1 < this.quiz.questions.length){
        this.correct = null
        this.answered = false   
        this.currentQuestion++
        this.$refs.question.selectedAnswer = ''
      }
    },

    showResults() {
      this.finished = true
      //update the playedCount
      var quizRef = this.$store.state.db.collection("quizzes").doc(this.$store.state.activeQuiz);

      this.$store.state.db.runTransaction((transaction) => {
        return transaction.get(quizRef).then((quiz) => {      
          var newCount = 1
          var newTotal = this.correctAnswers
          if(quiz.data().playedCount !== undefined){  
            newCount = quiz.data().playedCount + 1 
          }
          if(quiz.data().totalScore !== undefined){ 
            newTotal = quiz.data().totalScore + this.correctAnswers 
          }
          transaction.update(quizRef, { 
            playedCount: newCount,
            totalScore: newTotal
          })
          return newCount     
        })
        }).then((count) => {
          console.log("Play count increased to ", count)
        }).catch(function(err) {
          console.error(err);
        })
    }
  }
}
</script>


<style scoped>
  .answer{
    min-width: 200px;
  
  }
</style>
