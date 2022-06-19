<template>
  <div class="faq-container">
    <div class="header">
      <a :href="`/?guest=${this.guestKey}&language=${language}`" class="icon material-symbols-rounded">arrow_back</a>
      <div class="header-title">F A Q</div>
    </div>
    <div class="entry" v-for="(entry, iEntry) in this.entries" :key="iEntry">
      <div class="question">{{ entry.question }}</div>
      <div class="answer">{{ entry.answer }}</div>
    </div>
  </div>
</template>

<script>
import GSheetReader from 'g-sheets-api';

export default {
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
      entries: []
    }
  },

  async created () {
    const lang = this.language || 'en'
    const sheetName = `faq_${lang}`
    const options = {
      apiKey: 'AIzaSyCe4Q52Hmqrcr8sGGN5TZ0miP6IpRY9ulo',
      sheetId: '14BiEbQ8HBIf4OjoNlxoblmomIAGodDncW99uq11r_Qg',
      sheetName: sheetName
    }
    GSheetReader(options, rows => {
      this.entries = rows
    }).catch(err => {
      console.error(err);
    });
  }
}
</script>

<style scoped>
.faq-container {
  --spacing: 8pt;
  padding: var(--spacing);
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Mali", cursive;
}

.faq-container > .header {
  font-size: 18pt;
  line-height: 36pt;
  position: relative;
  height: 36pt;
  max-height: 36pt;
  min-height: 36pt;
  margin-bottom: 8px;
}

.faq-container > .header > .icon {
  position: absolute;
  left: 4pt;
  top: 8pt;
  color: white !important;
  text-decoration: none !important;
}

.faq-container > .header > .header-title {
  text-align: center;
  font-family: "Dancing Script", cursive;
}

.faq-container .entry {
  margin-bottom: 36px;
}

.faq-container .question {
  font-size: 16pt;
  line-height: 36pt;
}

.faq-container .answer {
  font-size: 14pt;
  line-height: 24pt;
}

@media (prefers-color-scheme: dark) {
  .faq-container {
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .faq-container {
    color: #202020;
  }
}
</style>