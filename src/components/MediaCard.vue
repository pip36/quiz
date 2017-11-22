<template>
  <div class="mediacard">
   
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <slot name="image">
                <img 
                :src="imageURL" 
                alt="https://bulma.io/images/placeholders/64x64.png">  
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
              v-if="quizdata.owner === currentUserId" 
              to="/profile">
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
  props: ['quizdata'],
  data () {
    return {
      imageURL: "https://bulma.io/images/placeholders/64x64.png"
    }
  },
  mounted () {
    this.loadImage(this.imagePath)
  },
  computed: {
    imagePath: function() {
      return this.quizdata.owner+'/'+this.quizdata.image
    },
    currentUserId: function(){
      return this.$store.state.currentUser.uid
    }
  },
  methods: {
    test: function(){
      console.log(this.quizdata)
      console.log(this.imagePath)
    },
    loadImage: function(path){
      var pathRef = this.$store.state.storage.ref(path)
      pathRef.getDownloadURL().then((url) => {
        // `url` is the download URL 
       

        // Or inserted into an <img> element:
        this.imageURL = url
      }).catch(function(error) {
        // Handle any errors
        console.log(error.message)
      });
    }
  }
}
</script>

<style scoped>

</style>
