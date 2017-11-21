<template>
  <div class="home">
   
    <section class="section">
      <div class="container">
        <h1 class="title">
            Simple Quiz
        </h1>
        <p class="subtitle">
          Take and make your own quizzes!
        </p>
      </div>
    </section>
    <router-link class="button is-primary" to="/quizzes">Find A quiz</router-link>
    <router-link class="button is-primary" to="/login">Login</router-link>
    <router-link class="button is-primary" to="/login">Create Account</router-link>
    
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
