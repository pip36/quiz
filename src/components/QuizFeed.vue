<template>
  <div class="quizfeed">
   
    <h1 class="subtitle"> <slot></slot> </h1>

    <div v-for="quiz in quizzes">    
      <media-card :quiz="quiz"> 
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

    getQuizzes: function() {
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

    }
    
  }
}
</script>


<style scoped>
  .category-division{
    margin-top: 20px;
  }
</style>
