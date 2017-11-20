<template>
  <div class="quizzes">
     <section class="section">
      <div class="container">
        <h1 class="title">
          Quizzes
        </h1>
      </div>
     </section>
  
    <ul>
        <li v-for="quiz in quizzes">
            <router-link :to="{ name: 'Quiz', params: { id: quiz.id } }">{{ quiz.data.title }}</router-link>  
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Quizzes',
  data () {
    return {
      quizzes: []
    }
  },
 
  mounted() {
    this.getQuizzes()
  },
  methods: {
    getQuizzes: function() {

      this.$store.state.db.collection("quizzes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.quizzes.push({
              id: doc.id, 
              data: doc.data() 
          })
    
        })
      })

    }
    
  }
}
</script>


<style scoped>

</style>
