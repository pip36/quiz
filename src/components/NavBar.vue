<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    
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
        <router-link v-show="!loggedIn" class="navbar-item" to="/signup">
          <strong>Create Account</strong>
        </router-link>
        <router-link v-show="!loggedIn" class="navbar-item" to="/signin">
          <strong>Login</strong>
        </router-link>
        <router-link v-show="loggedIn" class="navbar-item" to="/quizmaker">
          <strong>Make a Quiz</strong>
        </router-link>
        <router-link v-show="loggedIn" class="navbar-item" to="/profile">
          <strong>Profile</strong>
        </router-link>
        <a v-show="loggedIn" @click="signOut" class="navbar-item" id="logout">
          <strong>logout</strong>
        </a>
      </div>
    </div>

  </nav>
</template>

<script>
import Auth from '@/authentication/auth'

export default {
  name: 'Navbar',
  computed: {
    loggedIn: function() {
      return Auth.isLoggedIn()
    }
  },
  methods: {
    signOut() {
      Auth.logout()
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
  
</style>
