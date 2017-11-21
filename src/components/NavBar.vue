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
        <router-link class="navbar-item" to="/quizmaker">
          <strong>Make a Quiz</strong>
        </router-link>
      </div>
    </div>     
  </nav>

</template>

<script>
export default {
  name: 'Navbar'
}
</script>


<style scoped>
  
</style>
