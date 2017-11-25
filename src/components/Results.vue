<template>

  <div class="container has-text-centered">
    <h1 class="title"> Done! </h1>
    <p> You got{{correctAnswers}}/{{questions.length}} correct </p>
    <h3 class="subtitle"> That's {{scorePercentage}}% </h3>
  </div>

</template>

<script>

export default {
  name: 'Quiz',
  props: ['questions', 'correctAnswers'],
  computed: {
    scorePercentage: function(){
      return Math.round((this.correctAnswers/this.questions.length)*100)
    }
  }
}
</script>


<style scoped>
  .answer{
    min-width: 200px;
  
  }
</style>
