<template>
  <div class="fullscreen">
    <div class="background-image-container">
      <img class="background-image" src="/236A7258_center_flip.jpg" />
      <paula-name>{{ $t("message.paula") }}</paula-name>
      <chris-name>{{ $t("message.chris") }}</chris-name>
    </div>
  </div>
  <content class="fullscreen">
    <save-the-date>Save the Date</save-the-date>
    <wedding-info>
      <for-wedding>{{ $t("message.wedding") }}</for-wedding>
      <wedding-date>09.24.2022 (Sat)</wedding-date>
      <wedding-location>Newark, California</wedding-location>
      <wedding-wait>{{ $t("message.invitation") }}</wedding-wait>
    </wedding-info>
  </content>
</template>

<script setup></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mali:wght@200&family=Roboto:wght@100&display=swap");

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

paula-name {
  position: absolute;
  top: 30%;
  left: 41%;
  color: white;
  font-size: 18pt;
  transform: rotate(10deg);
}

chris-name {
  position: absolute;
  top: 25%;
  left: 53%;
  color: white;
  font-size: 18pt;
  transform: rotate(-15deg);
}

content {
  color: white;
}

save-the-date {
  display: block;
  font-family: "Great Vibes", cursive;
  font-size: 50pt;
  position: fixed;
  top: 10vh;
  /*left: 0;*/
  /*right: 0;*/
  /*text-align: center;*/
}

wedding-info {
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

wedding-title {
  display: block;
}

wedding-date {
  display: block;
}

wedding-wait {
  display: block;
}
</style>
