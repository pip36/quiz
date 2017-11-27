<template>

  <div class="container has-text-centered">
    <h1 class="title"> Done! </h1>
    <p> You got {{correctAnswers}}/{{questions.length}} correct </p>
    <h2 class="subtitle"> That's {{scorePercentage}}% </h2>
    <h3 class="subtitle" v-if="scorePercentage == 100"> WOW Good job! </h3>
    <h3 class="subtitle" v-else-if="scorePercentage >= 80"> Well done! </h3>
    <h3 class="subtitle" v-else-if="scorePercentage >= 50"> Not bad... </h3>
    <h3 class="subtitle" v-else-if="scorePercentage >= 1"> Hmm... maybe have another go? </h3>
    <h3 class="subtitle" v-else-if="scorePercentage <= 0"> Well at least you can't do any worse... </h3>
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
