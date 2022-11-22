<template>
  <div class="container">
    <section class="section invite">
      <div class="background-container">
        <img class="background-image" src="/236A7258_center_flip.jpg" />
      </div>
      <div class="greeting">
        <div class="section-title">{{ message.invite }}</div>
        <div class="hey">{{ message.hey }}</div>
      </div>
      <div class="quick-fact">
        <div>{{ message.quickWedding }}</div>
        <div>{{ message.quickDate }}</div>
        <div>{{ message.quickLocation }}</div>
        <div class="rsvp-shortcut" @click="scrollToRsvp">
          {{ message.quickRSVP }}
        </div>
    </div>
    </section>
    <section class="section location">
      <div class="map">
        <img class="yuanshan-image" src="/yuan_shan.webp" @click="onClickMap"/>
        <div class="icon material-symbols-rounded">open_in_new</div>  
      </div>
      <div class="info">
        <div class="section-title">{{ message.locationTitle }}</div>
        <div class="link" @click="onClickMap">
          <div class="name">{{ message.locationName }}</div>
          <div class="street">{{ message.locationStreet }}</div>
          <div class="city">{{ message.locationCity }}</div>
        </div>
      </div>
    </section>
    <section class="section photos">
      <div class="section-title">{{ message.photoTitle }}</div>
      <div class="photos-container">
        <a class="image-container" href="/gallery"
          v-for="(photo, iPhoto) in photoPaths" :key="photo">
          <img class="image" v-lazy="photo">
        </a>
      </div>
      <a class="more" :href="`/gallery?guest=${this.guestKey}&language=${this.language}`">
        {{ message.photoMore }}
      </a>
    </section>
    <section class="section rsvp" ref="rsvp">
      <form class="rsvp-form" @submit.prevent="onSubmit">
        <div class="section-header">
          <div class="title">{{ message.rsvpTitle }}</div>
          <div class="subtitle">{{ message.rsvpSubtitle }}</div>
        </div>
        <label class="label" for="name">{{ message.rsvpNameLabel }}</label>
        <input
          type="text" id="name" name="name"
          :placeholder="message.rsvpNamePlaceholder"
          v-model="guestForm.name">
        <label class="label" for="attend">{{ message.rsvpAttendLabel }}</label>
        <div class="can-toggle">
          <input
            type="checkbox" id="attend" name="attend" checked
            v-model="guestForm.attend">
          <label for="attend">
            <div
              class="can-toggle__switch"
              :data-checked="message.rsvpAttendYes"
              :data-unchecked="message.rsvpAttendNo"></div>
          </label>
        </div>
        <label class="label" for="adult-count">
          {{ message.rsvpAdultCountLabel }}
        </label>
        <input
          type="number" id="adult-count" name="adult-count"
          :placeholder="message.rsvpAdultCountPlaceholder"
          v-model="guestForm.adultCount">
        <label class="label" for="kid-count">
          {{ message.rsvpKidCountLabel }}
        </label>
        <input
          type="number" id="kid-count" name="kid-count"
          :placeholder="message.rsvpKidCountPlaceholder"
          v-model="guestForm.kidCount">
        <label class="label" for="notes">{{ message.rsvpNoteLabel }}</label>
        <textarea id="notes" name="notes" rows=8
          :placeholder="message.rsvpNotePlaceholder"
          v-model="guestForm.notes"></textarea>
        <input class="submit" type="submit" :value="submitStyle.text" :style="{ 'background-color': submitStyle.backgroundColor }">
      </form>
    </section>
  </div>
</template>

<script>
import GSheetReader from 'g-sheets-api';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxM9cO5LCZlUdQYV3qdK-MEHpYWallmH0",
  authDomain: "wedding-3ab41.firebaseapp.com",
  projectId: "wedding-3ab41",
  storageBucket: "wedding-3ab41.appspot.com",
  messagingSenderId: "267476527814",
  appId: "1:267476527814:web:0c83d52525e3101b3845c7",
  measurementId: "G-CPY9Q8GWJS"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
  props: {
    guestKey: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'zh'
    }
  },

  data () {
    return {
      guest: null,
      photoPaths: [],
      guestForm: {
        name: '',
        email: '',
        attend: true,
        adultCount: '',
        kidCount: '',
        note: ''
      },
      submitStatus: 'default'
    }
  },

  computed: {
    message() {
      let msg = {
        invite: 'Invitation',
        hey: this.guest ? `to ${this.guest.name}` : '',
        quickWedding: 'Paula & Chris',
        quickDate: '12.24.2022 (Sat)',
        quickLocation: 'Grand Hotel Taipei, 麒麟宴會廳',
        quickRSVP: 'RSVP by 12.01',
        locationTitle: 'Location',
        locationName: 'Grand Hotel Taipei, 麒麟宴會廳',
        locationStreet: 'No. 1, Section 4, Zhongshan N Rd',
        locationCity: 'Zhongshan District， Taipei City',
        scheduleTitle: 'Schedule',
        scheduleEntryTime: '5:00 PM',
        scheduleEntryName: 'Entry & Champagne',
        scheduleCeremonyTime: '5:30 PM',
        scheduleCeremonyName: 'Ceremony',
        scheduleBarOpenTime: '6:00 PM',
        scheduleBarOpenName: 'Cocktail Hour & Bar Opens',
        scheduleReceptionTime: '7:00 PM',
        scheduleReceptionName: 'Reception Begins',
        scheduleBarCloseTime: '10:00 PM',
        scheduleBarCloseName: 'Reception Ends & Bar Closes',
        photoTitle: 'Photos',
        photoMore: 'More',
        rsvpTitle: 'R S V P',
        rsvpSubtitle: 'Please respond by 12.01',
        rsvpNameLabel: 'Name',
        rsvpNamePlaceholder: 'Your Name',
        rsvpEmailLabel: 'Email',
        rsvpEmailPlaceholder: 'this@that.com',
        rsvpAttendLabel: 'Attend',
        rsvpAttendYes: 'Yes',
        rsvpAttendNo: 'No',
        rsvpAdultCountLabel: 'Adult #',
        rsvpAdultCountPlaceholder: 'How many adults?',
        rsvpKidCountLabel: 'Kid #',
        rsvpKidCountPlaceholder: 'Under 12 years old',
        rsvpNoteLabel: 'Notes',
        rsvpNotePlaceholder: 'Dietary restrictions, high chair, and things we should know?',
        rsvpSubmit: 'Submit',
        rsvpSubmitting: 'Submitting...',
        rsvpSubmitted: 'Submitted. Thanks!',
        rsvpSubmitError: 'Error. Please reach out.',
        faq: 'F A Q'
      }
      if (this.language === 'zh') {
        return {
          ...msg,
          invite: '歸寧喜宴',
          quickWedding: '張寶方 & 葉鬱蔥',
          quickDate: '民國111年12月24日星期六',
          quickLocation: '台北圓山大飯店 麒麟宴會廳',
          quickRSVP: '請於 12月1日 前回覆',
          locationTitle: '時間 & 地點',
          locationName: '台北圓山大飯店 麒麟宴會廳',
          locationStreet: '台北市中山區中山北路四段一號',
          locationCity: '中午十二時 入席',
          scheduleTitle: '日程',
          scheduleEntryName: '賓客進場 & 享用香檳',
          scheduleCeremonyName: '結婚儀式',
          scheduleBarOpenName: '雞尾酒時間 & 吧台開張',
          scheduleReceptionName: '婚宴開始',
          scheduleBarCloseName: '婚宴結束 & 吧台關閉',
          photoTitle: '我們的一些照片',
          photoMore: '更多',
          rsvpTitle: '敬請回覆',
          rsvpSubtitle: '請於 12月1日 前回覆',
          rsvpNameLabel: '名字',
          rsvpNamePlaceholder: '您的名字',
          rsvpEmailLabel: '電子郵件',
          rsvpEmailPlaceholder: 'this@that.com',
          rsvpAttendLabel: '是否參加',
          rsvpAttendYes: '是',
          rsvpAttendNo: '否',
          rsvpAdultCountLabel: '大人數',
          rsvpAdultCountPlaceholder: '有多少大人？',
          rsvpKidCountLabel: '小孩數',
          rsvpKidCountPlaceholder: '有多少小孩（12 歲以下）？',
          rsvpNoteLabel: '留言',
          rsvpNotePlaceholder: '任何我們需要知道的？特殊餐點需求（例：素食）？',
          rsvpSubmit: '確認',
          rsvpSubmitting: '上傳中，請稍等',
          rsvpSubmitted: '已確認，謝謝',
          rsvpSubmitError: '確認失敗，請電聯',
          faq: '常見問題'
        }
      }
      if (this.language === 'zh-yue') {
        return {
          ...msg
        }
      }
      return msg
    },

    submitStyle () {
      if (this.submitStatus === 'default') {
        return { text: this.message.rsvpSubmit, backgroundColor: '' }
      }
      if (this.submitStatus === 'submitting') {
        return { text: this.message.rsvpSubmitting, backgroundColor: 'Orange' }
      }
      if (this.submitStatus === 'submitted') {
        return { text: this.message.rsvpSubmitted, backgroundColor: '#70c767' }
      }
      if (this.submitStatus === 'error') {
        return { text: this.message.rsvpSubmitError, backgroundColor: 'red' }
      }
    },
  },

  async created () {
    const options = {
      apiKey: 'AIzaSyCe4Q52Hmqrcr8sGGN5TZ0miP6IpRY9ulo',
      sheetId: '14BiEbQ8HBIf4OjoNlxoblmomIAGodDncW99uq11r_Qg',
      sheetName: 'our_inputs',
    }
    GSheetReader(options, rows => {
      this.guest = rows.find(row => row.key === this.guestKey);
      this.guestForm = {
        ...this.guestForm,
        ...this.guest
      }
    }).catch(err => {
      console.error(err);
    });
    const globs = import.meta.glob('../assets/photos/*.jpg');
    const modules = await Promise.all(Object.values(globs).map(f => f()));
    this.photoPaths = modules.map(m => m.default).slice(0, 4);
  },

  methods: {
    scrollToRsvp() {
      this.$refs.rsvp.scrollIntoView({behavior: 'smooth'});
    },

    onSubmit(event) {
      this.submit();
    },

    async submit() {
      const appScriptUrl =
          'https://script.google.com/macros/s/AKfycbwh_TzROEPsRF5c5Iwmc1opRbGuAkMs_D9A16WFUt1R1icnbr0NP-EUcpttpLLp0NoJ/exec';
      this.submitStatus = 'submitting'
      try {
        const res =
            await fetch(
              appScriptUrl + '?' + new URLSearchParams(this.guestForm),
              { method: 'POST' });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        this.submitStatus = 'submitted'
      } catch(error) {
        alert(error);
        this.submitStatus = 'error'
      }
    },

    onClickMap() {
      let common = 'goo.gl/maps/91F5ApnozZskAbkR7';
      if ((navigator.platform.indexOf("iPhone") != -1) || 
         (navigator.platform.indexOf("iPad") != -1) || 
         (navigator.platform.indexOf("iPod") != -1))
        window.open('maps://' + common);
      else /* else use Google */
        window.open('https://' + common);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Great+Vibes&family=Mali:wght@400&family=Moon+Dance&family=Overlock&family=Sniglet&family=Tillana&family=Waterfall&display=swap');

.container {
  height: 100vh;
  width: 100vw;
  max-width: 800px;
  overflow-x: hidden;
  overflow-y: scroll;
  /*scroll-snap-type: y proximity;*/
  font-family: "Mali", cursive;
}

.section {
  height: 750px;
  scroll-snap-align: start;
  overflow: hidden;
}

.section-title {
  justify-self: center;
  font-family: "Dancing Script", cursive;
  font-size: 48pt;
  line-height: 48pt;
}

.invite {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  background-color: #202020;
}

.invite .background-container {
  position: relative;
  height: 100%;
}

.invite > .background-container > .background-image {
  height: 100%;
  object-fit: contain;
}

.invite > .greeting {
  position: absolute;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.invite > .greeting > .section-title {
  line-height: 56pt;
}

.invite > .greeting > .hey {
  font-size: 16pt;
}

.invite > .background-container > .paula-name {
  position: absolute;
  top: 30%;
  left: 41%;
  color: white;
  font-size: 18pt;
}

.invite > .background-container > .chris-name {
  position: absolute;
  top: 25%;
  left: 55%;
  color: white;
  font-size: 18pt;
}

.invite > .quick-fact {
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 20pt;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 14px;
  box-shadow: 0 0 5rem rgb(0 0 0 /100%);
  padding: 8pt;
}

.invite > .quick-fact > .rsvp-shortcut {
  text-decoration: underline;
}

.location {
  /*background: #3A4A51;*/
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  align-items: center;
  position: relative;
}

.location:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/paper_texture.jpg");
  background-position: center;
  background-size: cover;
  filter: grayscale();
  z-index: -2;
}

.location:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background: #3A4A51;*/
  background: #cb8566;
  opacity: 0.75;
  z-index: -1;
}

.location > .map {
  position: relative;
  width: 65%;
  max-width: 300px;
}

.location > .map > .yuanshan-image {
  width: 100%;
  border-radius: 8px;
}

.location > .map > .icon {
  color: IndianRed;
  position: absolute;
  right: 8px;
  bottom: 12px;
  pointer-events: none;
}

.location > .info {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
  color: #4b1200;
}

.location > .info > .section-title {
  font-size: 28pt;
  line-height: 42pt;
}

.location > .info > .link {
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-decoration: underline;
}

.schedule {
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: #794524;*/
  background: #3A4A51;
  color: white;
  position: relative;
}

.schedule > .info {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: minmax(min-content, max-content);
  gap: 36px;
}

.schedule > .info > .section-title {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  font-size: 28pt;
}

.schedule > .info > .time {
  justify-self: end;
}

.photos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  /*background: darkslategray;*/
  background: #8A4931;
  gap: 8pt;
}

.photos > .section-title {
  text-align: center;
  font-size: 28pt;
}

.photos-container {
  --spacing: 8pt;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing);
  padding: var(--spacing);
  justify-content: center;
}

.photos-container > .image-container {
  border-radius: var(--spacing);
  position: relative;
  width: calc(50% - var(--spacing) / 2);
  min-width: 100px;
  max-width: 200px;
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.photos-container > .image-container:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.photos-container > .image-container > .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.photos > .more {
  text-align: center;
  font-size: 14pt;
  color: white !important;
}

.photos > .more:visited {
  color: white !important;
}

.rsvp {
  height: 950px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #292929;
}

.rsvp-form {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr;
  gap: 24px;
}

.rsvp-form > .section-header {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
}

.rsvp-form > .section-header > .title {
  font-family: "Dancing Script", cursive;
  font-size: 24pt;
  text-align: center;
}

.rsvp-form > .section-header > .subtitle {
  font-size: 12pt;
  margin-top: 8px;
  text-align: center;
}

.rsvp-form > .label {
  justify-self: end;
}

.rsvp-form > .submit {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
}

.rsvp-form > .faq {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  color: white !important;
  font-size: 18pt;
}

input, textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  background: #292929;
  border-style: solid;
  border-radius: 8px;
  border-color: silver;
  border-width: 1px;
  font-family: "Mali", cursive;
  font-size: 12pt;
  padding: 12px;
  color: white;
  min-width: 0px;
}

input[type=email]:invalid {
  border-color: tomato;
}

input[type=text] {
}

input[type=number] {
}

input[type=submit] {
  background: #3a3a3a;
  width: 256px;
}

.rsvp-form > textarea {
  resize: none;
}

.can-toggle {
  position: relative;
  font-family: "Mali", cursive;
}
.can-toggle *, .can-toggle *:before, .can-toggle *:after {
  box-sizing: border-box;
}
.can-toggle input[type=checkbox] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.can-toggle input[type=checkbox][disabled] ~ label {
  pointer-events: none;
}
.can-toggle input[type=checkbox][disabled] ~ label .can-toggle__switch {
  opacity: 0.4;
}
.can-toggle input[type=checkbox]:checked ~ label .can-toggle__switch:before {
  content: attr(data-unchecked);
  left: 0;
}
.can-toggle input[type=checkbox]:checked ~ label .can-toggle__switch:after {
  content: attr(data-checked);
}
.can-toggle label {
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
}
.can-toggle label .can-toggle__label-text {
  flex: 1;
  padding-left: 32px;
}
.can-toggle label .can-toggle__switch {
  position: relative;
}
.can-toggle label .can-toggle__switch:before {
  content: attr(data-checked);
  position: absolute;
  top: 0;
  text-transform: uppercase;
  text-align: center;
}
.can-toggle label .can-toggle__switch:after {
  content: attr(data-unchecked);
  position: absolute;
  z-index: 5;
  text-transform: uppercase;
  text-align: center;
  background: white;
  transform: translate3d(0, 0, 0);
}
.can-toggle input[type=checkbox][disabled] ~ label {
  color: rgba(234, 0, 48, 0.5);
}
.can-toggle input[type=checkbox]:focus ~ label .can-toggle__switch, .can-toggle input[type=checkbox]:hover ~ label .can-toggle__switch {
  background-color: tomato;
}
.can-toggle input[type=checkbox]:focus ~ label .can-toggle__switch:after, .can-toggle input[type=checkbox]:hover ~ label .can-toggle__switch:after {
  color: #b70026;
}
.can-toggle input[type=checkbox]:hover ~ label {
  color: #d1002b;
}
.can-toggle input[type=checkbox]:checked ~ label:hover {
  color: #55bc49;
}
.can-toggle input[type=checkbox]:checked ~ label .can-toggle__switch {
  background-color: #70c767;
}
.can-toggle input[type=checkbox]:checked ~ label .can-toggle__switch:after {
  color: #4fb743;
}
.can-toggle input[type=checkbox]:checked:focus ~ label .can-toggle__switch, .can-toggle input[type=checkbox]:checked:hover ~ label .can-toggle__switch {
  background-color: seagreen;
}
.can-toggle input[type=checkbox]:checked:focus ~ label .can-toggle__switch:after, .can-toggle input[type=checkbox]:checked:hover ~ label .can-toggle__switch:after {
  color: #47a43d;
}
.can-toggle label .can-toggle__label-text {
  flex: 1;
}
.can-toggle label .can-toggle__switch {
  transition: background-color 0.3s cubic-bezier(0, 1, 0.5, 1);
  background: #ff0538;
}
.can-toggle label .can-toggle__switch:before {
  color: rgba(255, 255, 255, 0.5);
}
.can-toggle label .can-toggle__switch:after {
  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0, 1, 0.5, 1);
  transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1);
  color: #ea0030;
}
.can-toggle input[type=checkbox]:focus ~ label .can-toggle__switch:after, .can-toggle input[type=checkbox]:hover ~ label .can-toggle__switch:after {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
}
.can-toggle input[type=checkbox]:checked ~ label .can-toggle__switch:after {
  transform: translate3d(65px, 0, 0);
}
.can-toggle input[type=checkbox]:checked:focus ~ label .can-toggle__switch:after, .can-toggle input[type=checkbox]:checked:hover ~ label .can-toggle__switch:after {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
}
.can-toggle label {
  font-size: 14pt;
}
.can-toggle label .can-toggle__switch {
  height: 49px;
  flex: 0 0 134px;
  border-radius: 8px;
}
.can-toggle label .can-toggle__switch:before {
  left: 67px;
  font-size: 12pt;
  line-height: 49px;
  width: 67px;
  padding: 0 12px;
}
.can-toggle label .can-toggle__switch:after {
  top: 2px;
  left: 2px;
  border-radius: 8px;
  width: 65px;
  line-height: 45px;
  font-size: 12pt;
}
.can-toggle label .can-toggle__switch:hover:after {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
}
</style>