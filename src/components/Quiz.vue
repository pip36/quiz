<template>
  <div class="quiz">
    <h1> Quiz </h1>
    <router-link to="/">Home</router-link>
    <router-link to="/quizzes">Find A quiz</router-link>
    
    <template v-if="quiz.title !== undefined">
      <h1> {{quiz.title}} </h1>
      <ul>
        {{ quiz.questions[currentQuestion].title }}
        <li v-for="(answer, index) in quiz.questions[currentQuestion].possibleAnswers"> 
          <button @click="checkAnswer(index)"> {{answer}} </button>
        </li> 
      </ul>
    </template>

    <template v-if="correct">
      correct answer
    </template>
    <template v-if="incorrect">
      Wrong
    </template>
  </div>
</template>

<script>

export default {
  name: 'Quiz',
  data () {
    return {
      quiz: {},
      currentQuestion: 0,
      correct: false,
      incorrect: false
    }
  },
  created() {
    this.setQuiz()
  },
  mounted() {
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
      var correctAnswer = this.quiz.questions[this.currentQuestion].answer
     
     return (correctAnswer == index) ? this.correct = true : this.incorrect = true    
    }
  }
}
</script>


<style scoped>

</style>
