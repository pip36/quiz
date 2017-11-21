<template>

   <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <strong>QuizHome</strong>
      </router-link>

      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link v-show="!this.$store.state.currentUser.uid" class="navbar-item" to="/signup">
          <strong>Create Account</strong>
        </router-link>
        <router-link v-show="!this.$store.state.currentUser.uid" class="navbar-item" to="/signin">
          <strong>Login</strong>
        </router-link>
        <router-link v-show="this.$store.state.currentUser.uid" class="navbar-item" to="/quizmaker">
          <strong>Make a Quiz</strong>
        </router-link>
        <a v-show="this.$store.state.currentUser.uid" @click="signOut" class="navbar-item">
          <strong>logout</strong>
        </a>
      </div>
    </div>     
  </nav>

</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  methods:{
    signOut() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
  
</style>
