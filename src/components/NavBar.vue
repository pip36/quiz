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
        <router-link ref="signUpButton" v-if="!loggedIn" class="navbar-item" to="/signup">
          <strong>Create Account</strong>
        </router-link>
        <router-link ref="logInButton" v-if="!loggedIn" class="navbar-item" to="/signin">
          <strong>Login</strong>
        </router-link>
        <router-link ref="createQuizButton" v-if="loggedIn" class="navbar-item" to="/quizmaker">
          <strong>Make a Quiz</strong>
        </router-link>
        <router-link ref="profileButton" v-if="loggedIn" class="navbar-item" to="/profile">
          <strong>Profile</strong>
        </router-link>
        <a ref="logOutButton" id="logout" v-if="loggedIn" @click="signOut" class="navbar-item">
          <strong>logout</strong>
        </a>
      </div>
    </div>

  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  props: ['loggedIn'],
  methods: {
    signOut() {
      this.$emit('logout')
    }
  }
}
</script>


<style scoped>
  
</style>
