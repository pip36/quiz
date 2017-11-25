<template>
  <div class="mediacard">
   
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <slot name="image">
                <img :src="imageURL">  
              </slot>        
            </figure>
          </div>

          <div class="media-content">
            <p class="title is-4">
              <slot name="title"></slot>
            </p>
            <p class="subtitle is-6">
              <slot name="description"></slot>
            </p>
          </div>

          <div class="media-right">
            <router-link
              v-if="quiz && quiz.data.owner === currentUserId" 
              :to="{name: 'QuizMaker', params: { quiz: quiz }}">
              edit
            </router-link>
          </div>        
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'MediaCard',
  props: ['quiz'],
  data () {
    return {
      imageURL: "/static/question.png"
    }
  },
  mounted () {
    if(this.quiz && this.quiz.data.image !== '/static/question.png'){
      this.loadImage(this.imagePath)
    }
    
  },
  computed: {
    imagePath: function() {
      return this.quiz.data.owner+'/'+this.quiz.data.image
    },
    currentUserId: function(){
      return this.$store.state.currentUser.uid
    }
  },
  methods: {
    loadImage: function(path){
      var pathRef = this.$store.state.storage.ref(path)
      pathRef.getDownloadURL().then((url) => {
        this.imageURL = url
      }).catch(function(error) {
        //TODO Error Handling
        console.log(error.message)
      });
    }
  }
}
</script>

<style scoped>

</style>
