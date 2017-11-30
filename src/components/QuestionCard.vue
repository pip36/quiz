<template>
  <div class="questioncard">
   
    <div class="card">
      <div class="card-content">                 
        <div class="content">
          <slot></slot>                 
        </div>
      </div>
      <footer class="card-footer">
        <a @click="swap" id="swap-button" class="card-footer-item">MoveUp</a>
        <!-- <a href="#" class="card-footer-item">Edit(todo)</a> -->
        <a @click="remove" class="card-footer-item">Delete</a>
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
    },
    remove: function(){
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>

</style>
