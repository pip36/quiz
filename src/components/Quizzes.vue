<template>
  <div class="quizzes">
     <section class="section">
      <div class="container">
        <h1 class="title">
          Quizzes
        </h1>
        <ul>
          <li v-for="quiz in quizzes">    
            <media-card> 
              <router-link slot="title" :to="{ name: 'Quiz', params: { id: quiz.id } }">{{ quiz.data.title }} </router-link>
              <p slot="description"> {{quiz.data.description}} </p>
            </media-card>
          </li>
        </ul>
      </div>
     </section>
     
  </div>
</template>

<script>

import MediaCard from '@/components/MediaCard'

export default {
  name: 'Quizzes',
  data () {
    return {
      quizzes: []
    }
  },
  components: {
    'media-card': MediaCard
  },
 
  mounted() {
    this.getQuizzes()
  },
  methods: {

    getQuizzes: function() {
      this.$store.state.db.collection("quizzes").get().then((querySnapshot) => {
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

</style>
