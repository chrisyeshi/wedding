<template>
  <div class="gallery">
    <div class="image-container" v-for="photo in photos" :key="photo">
      <img class="image" v-lazy="photo">
    </div>
  </div>
</template>

<script>
  import path from 'path';

  export default {
    data () {
      return {
        photos: []
      }
    },
    async created () {
      const globs = import.meta.glob('../assets/photos/*.jpg');
      const modules = await Promise.all(Object.values(globs).map(f => f()));
      const paths = modules.map(m => m.default);
      this.photos = paths;
    }
  }
</script>

<style>
:root {
  --spacing: 8pt;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing);
  padding: var(--spacing);
}

.image-container {
  border-radius: var(--spacing);
  position: relative;
  width: calc(50% - var(--spacing) / 2);
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.image-container:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>