<template>
  <div class="home">
   
    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">
            Simple Quiz
        </h1>
        <p class="subtitle">
          Take and make your own quizzes!
        </p>
        <router-link class="button is-primary" to="/quizzes">Find A quiz</router-link>

        <div class="content category-division">
          <h1 class="subtitle"> Popular </h1>
          
            <div v-for="quiz in quizzes">    
              <media-card :quiz="quiz"> 
                <router-link slot="title" :to="{ name: 'Quiz', params: { id: quiz.id } }">{{ quiz.data.title }} </router-link>
                <p slot="description"> {{quiz.data.description}} </p>
              </media-card>
            </div>
       
        </div>

        <div class="content category-division">
          <h1 class="subtitle"> New </h1>
          <media-card>
            <p slot="title"> TODO </p>
            <p slot="description"> TODODODODODODODD </p>
          </media-card>
          <media-card>
            <p slot="title"> TODO </p>
            <p slot="description"> TODODODODODODODD </p>
          </media-card>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>

import MediaCard from '@/components/MediaCard'

export default {
  name: 'Home',
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
      this.$store.state.db.collection("quizzes").where('tags.popular', '==', 'true').get().then((querySnapshot) => {
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
