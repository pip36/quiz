<template>
  <div id="app">
    <nav-bar :logged-in="loggedIn" @logout="logout()"></nav-bar>
    <router-view :currentUser="currentUser"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar'
import Auth from '@/authentication/auth'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar
  },
  computed: {
    loggedIn: function () {
      return Auth.isLoggedIn()
    },
    currentUser: function () {
      return Auth.currentUser()
    }
  },
  methods: {
    logout () {
      Auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
