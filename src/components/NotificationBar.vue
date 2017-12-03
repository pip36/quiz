<template>
  <div class="notificationbar">
    <div class="container">
      <template v-for="(note, index) in notifications">
        <div :class="{ 'notification':true, 'is-danger': note.type=='danger', 'is-success': note.type == 'success'}" :key="index">
          <button class="delete" @click="$emit('close', index)"></button>
          {{ note.message }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Notificationbar',
  props: ['notifications']
}
</script>


<style scoped>
  .notificationbar{
    position: fixed;
    width: 100%;
    z-index: 10;
    opacity: 0.8;
  } 
</style>
