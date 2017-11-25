<template>
  <div class="profile">

    <section class="section">
      <div class="container"> 
        <h1 class='title'> Profile </h1>
        <quiz-feed tag="owned"> My Quizzes </quiz-feed>
      </div>
    </section>

  </div>
</template>


<script>
import QuizFeed from '@/components/QuizFeed'

export default {
  name: 'Profile',
  components: {
    'quiz-feed': QuizFeed
  }
}
</script>


<style scoped>
  
</style>
