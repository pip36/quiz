<template>
  <div class="quizzes">

    <section class="section">
      <div class="container">
        <quiz-feed>All Quizzes</quiz-feed>
      </div>
    </section>
     
  </div>
</template>


<script>
import QuizFeed from '@/components/QuizFeed'

export default {
  name: 'Quizzes',
  components: {
    'quiz-feed': QuizFeed
  },
}
</script>


<style scoped>

</style>
