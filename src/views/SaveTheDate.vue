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
        if (this.language === 'zh') {
          return {
            paula: '張寶方',
            chris: '葉鬱蔥',
            wedding: '婚禮',
            invitation: '晚些發出正式邀請',
            date: '22年9月24日週六'
          }
        }
        return {
          paula: 'Paula',
          chris: 'Chris',
          wedding: 'Wedding',
          invitation: 'Invitation to follow',
          date: '09.24.2022 (Sat)'
        }
      }
    }
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mali:wght@400&family=Roboto:wght@100&display=swap");

.fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.background-image-container {
  position: relative;
  min-height: 102%;
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
  transform: rotate(10deg);
}

.chris-name {
  position: absolute;
  top: 25%;
  left: 53%;
  color: white;
  font-size: 18pt;
  transform: rotate(-15deg);
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
  font-size: 24pt;
}
</style>
