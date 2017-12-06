<template>
  <div class="mediacard">
   
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <img v-if="altSrc !== undefined" id="image" class="image is-64x64" :src="altSrc">     
            <img v-else id="image" class="image is-64x64" :src="imageUrl">                  
          </div>

          <div class="media-content">
            <p id="title" class="title is-4">
              <router-link slot="title" :to="{ name: 'Quiz', params: { id: quiz.id } }">{{ quiz.data.title }} </router-link>
            </p>
            <p id="category" class="subtitle is-5">
              {{quiz.data.category}}
            </p>
            <p id="description" class="subtitle is-6">
              {{quiz.data.description}}
            </p>

            <div v-if="quiz && quiz.data.owner === currentUser" class="controls">
              <router-link
                id="edit-button"
                class="button is-small"
                
                :to="{name: 'QuizMaker', params: { quiz: quiz }}">
                edit
              </router-link>
          
              <a 
                class="button is-small" 
                id="delete-button"
                ref="deleteButton"
                @click="remove">
                  Delete 
              </a>
            </div> 
          </div>

                 
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

import Storage from '@/helpers/firestoreHelper'
import Auth from '@/authentication/auth'

export default {
  name: 'MediaCard',
  props: ['quiz', 'altSrc'],
  data () {
    return {
      imageUrl: "/static/question.png"
    }
  },
  computed: {
    currentUser: function() {
      return Auth.currentUser()
    }
  },
  mounted () {
    if(this.quiz && this.altSrc === undefined && this.quiz.data.image !== '/static/question.png'){
      Storage.download(this.getImagePath(), (url) => {
        this.imageUrl = url
      })
    }    
  },
  methods: {
    remove () {
      this.$emit('delete')
    },
    getImagePath () {
      return this.quiz.data.owner+'/'+this.quiz.data.image
    }
  }
}
</script>

<style scoped>
  .controls{
    text-align: right;
  }
</style>
