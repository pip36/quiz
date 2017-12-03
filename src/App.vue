<template>
  <div id="app">
    <nav-bar :logged-in="loggedIn" @logout="logout()"></nav-bar>
    <notification-bar :notifications="notifications" @close="removeNotification($event)"> </notification-bar>
    <router-view :currentUser="currentUser"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar'
import Auth from '@/authentication/auth'
import NotificationBar from '@/components/NotificationBar'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar,
    'notification-bar': NotificationBar
  },
  computed: {
    loggedIn: function () {
      return Auth.isLoggedIn()
    },
    currentUser: function () {
      return Auth.currentUser()
    },
    notifications: function () {
      return this.$store.state.notifications
    }
  },
  methods: {
    logout () {
      Auth.logout()
      this.$router.push('/')
    },
    removeNotification (index) {
      this.$store.commit('removeNotification', index)
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
