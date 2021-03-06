<template>

  <div class="question">
  
    <ul class="has-text-centered">
      <h2 class="subtitle"> {{question.title }} </h2> 
      <img v-if="imageUrl" :src="imageUrl" class="image is-128x128 center">  

      <div class="space-top" v-if="question.type == 'Multiple Choice' || question.type == undefined"> 
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
            <div v-if="answered && answer===selectedAnswer" class="content space-top">
              <p v-if="correct"> Correct! </p>
              <p v-else> Wrong! </p>
            </div>
          </div>
        </li> 
      </div>

      <div v-if="question.type == 'Typed Answer'" class="space-top"> 
        <input v-if="!answered" class="input space-top" type="text" placeholder="Enter you answer..." v-model="selectedAnswer">
        <button v-if="!answered" @click="$emit('answer', false)" class="button is-primary space-top"> I don't know </button>
          <div v-if="correct && answered" class="notification is-success space-top"> 
            <div class="content">
              <p> Correct! </p>
            </div>
          </div>
      </div>

      <div v-if="question.type == 'Typed List'" class="space-top"> 
        <ul>
          <li class="tag is-medium answer-slot" :class="{'is-success': listAnswerFound(answer)}" v-for="(answer, index) in question.possibleAnswers">
            <p v-if="listAnswerFound(answer)"> {{answer}} </p> 
            <p v-else> ? </p>       
          </li>
        </ul>
        <input v-if="!answered" class="input space-top" type="text" placeholder="Enter you answer..." v-model="selectedAnswer">
        <button v-if="!answered" @click="$emit('answer', false)" class="button is-primary space-top"> Give Up </button>
      </div>
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
      imageUrl: null,
      listAnswers: []
    }
  },
  mounted () {
    if(this.question.media !== undefined && this.question.media != false){
      this.loadImage(this.owner + '/media/' + this.question.media)
    }
  },
  watch: {
    question: function() {
      // reset list
      this.listAnswers = []
      if(this.question.media !== undefined && this.question.media != false){
        this.loadImage(this.owner + '/media/' + this.question.media)
      }else {
        this.imageUrl = null
      }
    },
    selectedAnswer: function() {
      if(this.question.type =='Typed Answer' || this.question.type =='Typed List'){
        this.typedCorrectMatch()
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

    strip(str) {
      return str.replace(/\s/g, "").toLowerCase()
    },

    listAnswerFound(str) {
      return this.listAnswers.indexOf(str.replace(/\s/g, "").toLowerCase()) > -1
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

    typedCorrectMatch () {
      var correctAnswers = this.question.possibleAnswers
      for(var i = 0; i < correctAnswers.length; i++){
        var answer = correctAnswers[i].replace(/\s/g, "").toLowerCase()
        var typed = this.selectedAnswer.replace(/\s/g, "").toLowerCase()
        if(answer === typed){
          if(this.question.type == 'Typed Answer'){
            this.$emit('answer', true)
            return
          }else if(this.question.type == 'Typed List' && 
                   this.listAnswers.indexOf(answer) === -1){
            this.listAnswers.push(answer)
            this.selectedAnswer = ''
            if(this.listAnswers.length === this.question.possibleAnswers.length){
              this.$emit('answer', true)
              return
            }
             this.$emit('score')
          }
          
        }
      }
      return false
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

  .answer-slot{
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .space-top{
    margin-top: 20px;
  }
</style>
