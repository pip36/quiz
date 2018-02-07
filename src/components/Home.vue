<template>
  <div class="home">
   
    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">Quizzical</h1>
        <p class="subtitle">Take and make your own quizzes!</p>
        <router-link class="button is-primary" to="/quizzes">All Quizzes</router-link>

        <div class="content category-division">         
          <quiz-feed tag="popular"> Popular </quiz-feed>      
        </div>

         <div class="field">
            <label class="label">View by Category</label>
            <div class="control">
              <div class="select">
                <select v-model="activeCategory" name="category">
                  <option>Science and Nature</option>
                  <option>Sport</option>
                  <option>General Knowledge</option>
                  <option>Music</option>
                  <option>TV and Film</option>
                  <option>History</option>
                  <option>People</option>
                  <option>Quiz of the Year</option>
                  <option>Geography</option>
                </select>
              </div>
            </div>
          </div>

        <div class="content category-division">         
          <quiz-feed :category="activeCategory"> {{ activeCategory }} </quiz-feed>
        </div>
      </div>     
    </section>
    
  </div>
</template>


<script>
import QuizFeed from '@/components/QuizFeed'

export default {
  name: 'Home',
  components: {
    'quiz-feed': QuizFeed
  },
  data () {
    return {
      activeCategory: 'Science and Nature'
    }
  }
}
</script>


<style scoped>
  .category-division{
    margin-top: 20px;
  }
  .field{
    text-align: left;
  }
</style>
