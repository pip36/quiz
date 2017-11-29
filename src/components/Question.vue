<template>

  <div class="question">
  
    <ul class="has-text-centered">
      <h2 class="subtitle"> {{question.title }} </h2> 
        <img v-if="imageUrl" :src="imageUrl" class="image is-128x128 center">    
      <li v-for="(answer, index) in shuffledAnswers" :key="index">
        <div :class="{'notification': true, 
                      'is-success': answer===selectedAnswer && correct && answered,
                      'is-danger': answer===selectedAnswer && !correct && answered}"> 
          <button 
            class="button is-info answer"
            @click="checkAnswer(index)"
            :disabled="answered"> 
            {{answer}} 
          </button>
          <div v-if="answered && answer===selectedAnswer" class="content">
            <p v-if="correct"> Correct! </p>
            <p v-else> Wrong! </p>
          </div>
        </div>
      </li> 
    </ul>

  </div>

</template>

<script>

import Storage from '@/helpers/firestoreHelper'

export default {
  name: 'Question',
  props: ['question', 'owner', 'correct', 'answered'],
  data () {
    return {
      selectedAnswer: null,
      imageUrl: null
    }
  },
  mounted () {
    if(this.question.media !== undefined && this.question.media != false){
      this.loadImage(this.owner + '/media/' + this.question.media)
    }
  },
  watch: {
    question: function() {
      if(this.question.media !== undefined && this.question.media != false){
        this.loadImage(this.owner + '/media/' + this.question.media)
      }
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
    },

    loadImage (path) {
      Storage.download(path, (url) => {
        this.imageUrl = url
      })
    }
  }
}
</script>


<style scoped>
  .answer{
    min-width: 200px;
  }

  .center{
    margin-left: auto;
    margin-right: auto;
  }
</style>
