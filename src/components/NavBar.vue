<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <strong @click="burgerOpen=false">QuizHome</strong>
      </router-link>

      <button class="button navbar-burger" :class="{'is-active': burgerOpen}" @click="toggleBurger()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu" :class="{'is-active': burgerOpen}">
      <div class="navbar-end">
        <router-link ref="signUpButton" v-if="!loggedIn" class="navbar-item" to="/signup">
          <strong @click="toggleBurger()">Create Account</strong>
        </router-link>
        <router-link ref="logInButton" v-if="!loggedIn" class="navbar-item" to="/signin">
          <strong @click="toggleBurger()">Login</strong>
        </router-link>
        <router-link ref="createQuizButton" v-if="loggedIn" class="navbar-item" to="/quizmaker">
          <strong @click="toggleBurger()">Make a Quiz</strong>
        </router-link>
        <router-link ref="profileButton" v-if="loggedIn" class="navbar-item" to="/profile">
          <strong @click="toggleBurger()">Profile</strong>
        </router-link>
        <a ref="logOutButton" id="logout" v-if="loggedIn" @click="signOut()" class="navbar-item">
          <strong @click="toggleBurger()">logout</strong>
        </a>
      </div>
    </div>

  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  props: ['loggedIn'],
  data () {
    return {
      burgerOpen: false
    }
  },
  methods: {
    signOut() {
      this.$emit('logout')
    },
    toggleBurger() {
      console.log("toggle")
      if(this.burgerOpen){ this.burgerOpen = false }
      else{ this.burgerOpen = true }
    }
  }
}
</script>


<style scoped>
  
</style>
