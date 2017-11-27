<template>
  <div class="quizfeed">
   
    <h1 class="subtitle"> <slot></slot> </h1>

    <div v-for="(quiz, index) in quizzes" :key="quiz.id">    
      <media-card :quiz="quiz" @delete="deleteQuiz(quiz.id, index)"> 
        <router-link slot="title" :to="{ name: 'Quiz', params: { id: quiz.id } }">{{ quiz.data.title }} </router-link>
        <p slot="category"> {{quiz.data.category}} </p>
        <p slot="description"> {{quiz.data.description}} </p>
      </media-card>
    </div>

  </div>
</template>


<script>
import MediaCard from '@/components/MediaCard'

export default {
  name: 'Home',
  props: ['tag'],
  components: {
    'media-card': MediaCard
  },

  data () {
    return{
      quizzes: []
    }
  },

  created() {
    this.getQuizzes()
  },
  
  methods: {

    getQuizzes () {
      if(this.tag === undefined){
        var ref = this.$store.state.db.collection("quizzes")
      }
      else if(this.tag === 'owned'){
        var uid = this.$store.state.currentUser.uid
        var ref = this.$store.state.db.collection('quizzes').where('owner', '==', uid)
      }else{
        var ref = this.$store.state.db.collection("quizzes").where('tags.'+this.tag, '==', 'true')
      }
      
      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.quizzes.push({
            id: doc.id, 
            data: doc.data() 
          })
        })
      })

    },

    deleteQuiz (id, index) {
      if(confirm('Are you sure you want to delete this quiz?')){
        this.$store.state.db.collection("quizzes").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.quizzes.splice(index,1)
        }).catch(function(error) {
            console.error("Error removing document: ", error);
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
</style>
