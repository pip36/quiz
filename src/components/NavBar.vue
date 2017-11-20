<template>
  <div class="navbar">
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
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>


<style scoped>

</style>
