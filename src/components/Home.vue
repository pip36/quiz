<template>
  <div class="home">
   
    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">Simple Quiz</h1>
        <p class="subtitle">Take and make your own quizzes!</p>
        <router-link class="button is-primary" to="/quizzes">All Quizzes</router-link>

        <div class="content category-division">         
          <quiz-feed tag="popular"> Popular </quiz-feed>      
        </div>
      </div>
    </section>
    
  </div>
</template>


<script>
import QuizFeed from '@/components/QuizFeed'

export default {
  name: 'Home',
  components: {
    'quiz-feed': QuizFeed
  },
  mounted() {
    console.log(this.$store.state.db)
  }
}
</script>


<style scoped>
  .category-division{
    margin-top: 20px;
  }
</style>
