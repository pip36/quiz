<template>
  <div class="questioncard">
   
    <div class="card">
      <div class="card-content">                 
        <div class="content">
          <slot></slot>                 
        </div>
      </div>
      <footer class="card-footer">
        <a @click="swap" class="card-footer-item">MoveUp</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'QuestionCard',
  methods: {
    swap: function(){
      this.$emit('swap')
    }
  }
}
</script>

<style scoped>

</style>
