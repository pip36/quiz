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
        <a @click="edit" id="edit-button" class="card-footer-item">Edit</a>
        <a @click="remove" id="delete-button" class="card-footer-item">Delete</a>
      </footer>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'QuestionCard',
  methods: {
    swap () {
      this.$emit('swap')
    },
    remove () {
      this.$emit('delete')
    },
    edit () {
      this.$emit('edit')
    }
  }
}
</script>

<style scoped>

</style>
