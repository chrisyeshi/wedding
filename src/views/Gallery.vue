<template>
  <div class="gallery">
    <div class="image-container"
        :class="{ selected: photo.mode === 'selected' }"
        v-for="(photo, iPhoto) in photos" :key="photo">
      <img class="image" v-lazy="photo" @click="select(photo, iPhoto)">
    </div>
    <vue-easy-lightbox
      scrollDisabled
      escDisabled
      moveDisabled
      :visible="isLightboxVisible"
      :imgs="photos"
      :index="iPhoto"
      @hide="hideLightbox"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
  import path from 'path';
  import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    components: {
      VueEasyLightbox
    },
    data () {
      return {
        photos: [],
        iPhoto: 0,
        isLightboxVisible: false
      }
    },
    async created () {
      const globs = import.meta.glob('../assets/photos/*.jpg');
      const modules = await Promise.all(Object.values(globs).map(f => f()));
      this.photos = modules.map(m => m.default);
    },
    methods: {
      select (photo, iPhoto, event) {
        this.iPhoto = iPhoto;
        this.isLightboxVisible = true;
      },
      hideLightbox () {
        this.isLightboxVisible = false;
      }
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
  max-width: 1440px;
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

.selected {
  width: 100%;
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