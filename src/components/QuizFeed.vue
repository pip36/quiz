<template>
  <div class="quizfeed">
   
    <h1 class="subtitle"> <slot></slot> </h1>

    <div v-for="(quiz, index) in quizzes" :key="quiz.id">    
      <media-card :quiz="quiz" @delete="deleteQuiz(quiz.id, index)"> </media-card>
    </div>
    <div v-if="quizzes.length === 0 && !isLoading" class="notification"> 
      <h3> Oops, no quizzes found </h3> 
    </div>
    <div v-if="isLoading" class="button is-loading"> </div>

  </div>
</template>


<script>
import MediaCard from '@/components/MediaCard'

export default {
  name: 'Home',
  props: ['tag', 'category'],
  components: {
    'media-card': MediaCard
  },

  data () {
    return{
      quizzes: [],
      isLoading: false
    }
  },

  created() {
    this.getQuizzes()
  },

  watch: {
    // whenever question changes, this function will run
    category: function () {
      this.quizzes = []
      this.getQuizzes()
    }
  },
  
  methods: {

    getQuizzes () {
      this.isLoading = true
      if(this.tag === undefined && this.category === undefined){
        var ref = this.$store.state.db.collection("quizzes")
      }
      else if(this.tag === 'owned'){
        var uid = this.$store.state.currentUser.uid
        var ref = this.$store.state.db.collection('quizzes').where('owner', '==', uid)
      }else if(this.tag !== undefined){
        var ref = this.$store.state.db.collection("quizzes").where('tags.'+this.tag, '==', 'true')
      }else if(this.category !== undefined){
        var ref = this.$store.state.db.collection("quizzes").where('category', '==', this.category)
      }
      
      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.quizzes.push({
            id: doc.id, 
            data: doc.data() 
          })
        })
        this.isLoading = false
      })

    },

    deleteQuiz (id, index) {
      if(confirm('Are you sure you want to delete this quiz?')){
        this.$store.state.db.collection("quizzes").doc(id).delete().then(() => {
            this.$store.commit('addNotification', {type:'success', message:'Document successfully deleted!'})
            this.quizzes.splice(index,1)
        }).catch(function(error) {
            this.$store.commit('addNotification', {type:'danger', message:'Error deleting document ' + error})
        });
      }
    }
    
  }
}
</script>


<style scoped>
  .category-division{
    margin-top: 20px;
  }
  .is-loading{
    width: 80px;
    border: none;
    font-size: 45px;
  }
  
</style>
