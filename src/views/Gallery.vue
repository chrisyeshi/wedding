<template>
  <div class="gallery-container">
    <div class="header">
      <a :href="`/?guest=${this.guestKey}&language=${language}`" class="icon material-symbols-rounded">arrow_back</a>
      <div class="header-title">Gallery</div>
    </div>
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
  </div>
</template>

<script>
  import path from 'path';
  import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    components: {
      VueEasyLightbox
    },
    props: {
      guestKey: {
        type: String,
        default: ''
      },
      language: {
        type: String,
        default: 'en'
      }
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

<style scoped>
.gallery-container {
  --spacing: 8pt;
  display: flex;
  flex-direction: column;
}

.gallery-container > .header {
  font-size: 18pt;
  line-height: 36pt;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 36pt;
  max-height: 36pt;
  min-height: 36pt;
  padding: var(--spacing) 0;
  background-color: rgba(32, 32, 32, 0.75);
  color: white !important;
}

.gallery-container > .header > .icon {
  position: absolute;
  left: 12pt;
  top: 16pt;
  color: white !important;
  text-decoration: none !important;
}

.gallery-container > .header > .header-title {
  text-align: center;
  font-family: "Dancing Script", cursive;
}

.gallery {
  padding: var(--spacing);
  margin-top: 48pt;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing);
  max-width: 1440px;
}

.image-container {
  border-radius: var(--spacing);
  position: relative;
  width: calc(50% - var(--spacing) / 2);
  max-width: 200px;
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

@media (prefers-color-scheme: dark) {
  .gallery-container {
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .gallery-container {
    color: #202020;
  }
}
</style>