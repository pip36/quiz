<template>

  <div class="profile">
    <section class="section">
      <div class="container"> 
        <h1 class='title'> Profile </h1>
        <ul>
          <li v-for="quiz in quizzes">    
            <media-card :quiz="quiz"> 
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
  name: 'Profile',
  data () {
    return {
      quizzes: []
    }
  },

  components: {
    'media-card': MediaCard
  },

  created() {
    this.getQuizzes()
  },

  methods: {
    getQuizzes: function() {
      var uid = this.$store.state.currentUser.uid
      //var ref = this.$store.state.db.collection('users').doc(uid).collection('quizzes')
      var ref = this.$store.state.db.collection('quizzes').where('owner', '==', uid)
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
  
</style>
