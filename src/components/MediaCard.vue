<template>
  <div class="mediacard">
   
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/64x64.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">
              <slot name="title"></slot>
            </p>
            <p class="subtitle is-6">
              <slot name="description"></slot>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'MediaCard'
}
</script>

<style scoped>

</style>
