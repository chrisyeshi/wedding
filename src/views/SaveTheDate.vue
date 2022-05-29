<template>
  <div class="fullscreen">
    <div class="background-image-container">
      <img class="background-image" src="/236A7258_center_flip.jpg" />
      <div class="paula-name">{{ message.paula }}</div>
      <div class="chris-name">{{ message.chris }}</div>
    </div>
  </div>
  <div class="content fullscreen">
    <div class="save-the-date">Save the Date</div>
    <div class="wedding-info">
      <div class="wedding-date">{{ message.date }}</div>
      <div>{{ message.wedding }} @ Newark, CA</div>
      <div>{{ message.invitation }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      language: {
        type: String,
        default: 'en'
      }
    },

    computed: {
      message() {
        let msg = {
          paula: 'Paula',
          chris: 'Chris',
          wedding: 'Wedding',
          invitation: 'Invitation to follow',
          date: '09.24.2022 (Sat)'
        }
        if (this.language === 'zh') {
          return {
            ...msg,
            paula: 'Paula',
            chris: 'Chris',
            wedding: '婚禮',
            invitation: '敬請期待',
            date: '09.24.2022 (週六)'
          }
        }
        if (this.language === 'zh-yue') {
          return {
            ...msg,
            wedding: '婚禮',
            invitation: '遲些發請帖',
            date: '09.24.2022 (週六)'
          }
        }
        return msg;
      }
    }
  }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mali:wght@400&family=Roboto:wght@100&display=swap");

.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

.background-image-container {
  position: relative;
  height: 102%;
  font-family: "Mali", cursive;
}

.background-image {
  height: 102%;
  object-fit: contain;
}

.paula-name {
  position: absolute;
  top: 30%;
  left: 41%;
  color: white;
  font-size: 18pt;
}

.chris-name {
  position: absolute;
  top: 25%;
  left: 55%;
  color: white;
  font-size: 18pt;
}

.content {
  color: white;
}

.save-the-date {
  display: block;
  font-family: "Great Vibes", cursive;
  font-size: 50pt;
  position: fixed;
  top: 10vh;
  padding: 5px;
  white-space: nowrap;
}

@media (max-width: 350px) {
  .save-the-date {
    font-size: 45pt;
  }
}

.wedding-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 10vh;
  font-family: "Mali", cursive;
  font-size: 14pt;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 14px;
  box-shadow: 0 0 5rem rgb(0 0 0 /100%);
  padding: 8pt;
}

.wedding-date {
  font-size: 21pt;
}
</style>
