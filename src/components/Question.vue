<template>

  <div class="question">
  
    <ul class="has-text-centered">
      <h2 class="subtitle"> {{question.title }} </h2>
      <li v-for="(answer, index) in shuffledAnswers" :key="index">
        <div :class="{'notification': true, 
                      'is-success': answer===selectedAnswer && correct,
                      'is-danger': answer===selectedAnswer && !correct}"> 
          <button 
            class="button is-info answer"
            @click="checkAnswer(index)"
            :disabled="answered"> 
            {{answer}} 
          </button>
        </div>
      </li> 
    </ul>

  </div>

</template>

<script>

export default {
  name: 'Question',
  props: ['question', 'correct', 'answered'],
  data () {
    return {
      selectedAnswer: null
    }
  },
  computed: {
    shuffledAnswers: function() {
      return this.shuffleArray(this.question.possibleAnswers)
    }
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    },

    checkAnswer(index) {
      var correctAnswer = this.question.correctAnswer
      var clickedAnswer = this.question.possibleAnswers[index]
      this.selectedAnswer = clickedAnswer
      if (correctAnswer === clickedAnswer) {
        this.$emit('answer', true)
      }else{
        this.$emit('answer', false)  
      }   
    }
  }
}
</script>


<style scoped>
  .answer{
    min-width: 200px;
  }
</style>
