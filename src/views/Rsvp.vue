<template>
  <div class="container">
    <section class="section invite">
      <div class="background-container">
        <img class="background-image" src="/236A7258_center_flip.jpg" />
        <div class="chris-name">Chris</div>
        <div class="paula-name">Paula</div>
      </div>
      <div class="greeting">
        <div class="hey">{{ hey }}</div>
        <div class="join">Please join us.</div>
      </div>
      <div class="quick-fact">
        <div>Wedding</div>
        <div>09.24.2022 (Sat)</div>
        <div>Ardenwood Farm, Newark, CA</div>
    </div>
    </section>
    <section class="section location">
      <div class="map">
        <img class="ardenwood-image" src="/ardenwood_location.jpg"  @click="onClickMap"/>
        <div class="icon material-symbols-rounded">open_in_new</div>  
      </div>
      <div class="info">
        <div class="label">Location</div>
        <div class="link" @click="onClickMap">
          <div class="name">Ardenwood Historic Farm</div>
          <div class="street">34600 Ardenwood Blvd.</div>
          <div class="city">Fremont, CA 94555</div>
        </div>
      </div>
    </section>
    <section class="section schedule">
      <div class="info">
        <div class="label">Schedule</div>
        <div class="time">5:00 PM</div><div>Entry & Champaigne</div>
        <div class="time">5:30 PM</div><div>Do You & I Do</div>
        <div class="time">6:00 PM</div><div>Cocktail Hour & Bar Opens</div>
        <div class="time">7:00 PM</div><div>Reception Begins</div>
        <div class="time">10:00 PM</div><div>Reception Ends & Bar Closes</div>
      </div>
    </section>
    <section class="section photos">
      <div class="label">Photos</div>
      <div class="photos-container">
        <a class="image-container" href="/gallery"
          v-for="(photo, iPhoto) in photoPaths" :key="photo">
          <img class="image" v-lazy="photo">
        </a>
      </div>
      <a class="more" href="/gallery">More</a>
    </section>
    <section class="section rsvp">
      <form class="rsvp-form" @submit.prevent="onSubmit">
        <label class="title">RSVP</label>
        <label class="label" for="name">Name</label>
        <input type="text" id="name" name="name" v-model="guestForm.name">
        <label class="label" for="email">Email</label>
        <input type="text" id="email" name="email" v-model="guestForm.email">
        <label class="label" for="attend">Attend</label>
        <div class="can-toggle">
          <input
            type="checkbox" id="attend" name="attend" checked
            v-model="guestForm.attend">
          <label for="attend">
            <div
              class="can-toggle__switch" data-checked="Yes"
              data-unchecked="No"></div>
          </label>
        </div>
        <!-- <input
          type="checkbox" id="attend" name="attend" checked
          v-model="guestForm.attend"> -->
        <label class="label" for="adult-count">Adult #</label>
        <input
          type="number" id="adult-count" name="adult-count"
          v-model="guestForm.adultCount">
        <label class="label" for="kid-count">Kid #</label>
        <input
          type="number" id="kid-count" name="kid-count"
          v-model="guestForm.kidCount">
        <label class="label" for="notes">Notes</label>
        <textarea id="notes" name="notes" rows=8 placeholder="Vegan, vegetarian, high chair?" v-model="guestForm.notes"></textarea>
        <input class="submit" type="submit" value="Submit">
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
      default: 'en'
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
      }
    }
  },

  computed: {
    hey() {
      return this.guest ? `Hey, ${this.guest.name}!` : `Hey!`;
    }
  },

  async created () {
    const options = {
      apiKey: 'AIzaSyCe4Q52Hmqrcr8sGGN5TZ0miP6IpRY9ulo',
      sheetId: '14BiEbQ8HBIf4OjoNlxoblmomIAGodDncW99uq11r_Qg',
      sheetName: 'our_inputs',
    }
    GSheetReader(options, rows => {
      this.guest = rows.find(row => row.key === this.guestKey);
    }).catch(err => {
      console.error(err);
    });
    const globs = import.meta.glob('../assets/photos/*.jpg');
    const modules = await Promise.all(Object.values(globs).map(f => f()));
    this.photoPaths = modules.map(m => m.default).slice(0, 6);
  },

  methods: {
    onSubmit(event) {
      this.validate();
      this.submit();
    },

    validate() {

    },

    async submit() {
      const appScriptUrl =
          'https://script.google.com/macros/s/AKfycbwh_TzROEPsRF5c5Iwmc1opRbGuAkMs_D9A16WFUt1R1icnbr0NP-EUcpttpLLp0NoJ/exec';
      try {
        const res =
            await fetch(
              appScriptUrl + '?' + new URLSearchParams(this.guestForm),
              { method: 'POST' });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        alert(this.guestForm);
      } catch(error) {
        alert(error);
      }
    },

    onClickMap() {
      let common = 'maps.google.com/maps?q=Ardenwood Historic Farm, Newark, CA';
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
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mali:wght@400&family=Roboto:wght@100&display=swap");

.container {
  height: 100vh;
  width: 100vw;
  max-width: 1440px;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  font-family: "Mali", cursive;
}

.section {
  height: 90vh;
  scroll-snap-align: start;
  overflow: hidden;
}

.invite {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
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

.location {
  background: #3A4A51;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  align-items: center;
}

.location > .map {
  position: relative;
  width: 65%;
  max-width: 300px;
}

.location > .map > .ardenwood-image {
  width: 100%;
  border-radius: 8px;
}

.location > .map > .icon {
  color: dimgray;
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
}

.location > .info > .label {
  line-height: 36px;
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
  background: #6b3e2e;
  color: white;
}

.schedule > .info {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: minmax(min-content, max-content);
  gap: 36px;
}

.schedule > .info > .label {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  font-family: "Great Vibes", cursive;
  font-size: 48pt;
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
  background: darkslategray;
  gap: 8pt;
}

.photos > .label {
  text-align: center;
  font-family: "Great Vibes", cursive;
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
}

.photos > .more:visited {
  color: white;
}

.rsvp {
  height: 850px;
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

.rsvp-form > .title {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  /*font-family: "Great Vibes", cursive;*/
  font-size: 24pt;
}

.rsvp-form > .label {
  justify-self: end;
}

.rsvp-form > .submit {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
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
  font-family: "Mali", cursive;
  font-size: 12pt;
  padding: 12px;
  color: white;
  min-width: 0px;
}

input[type=text] {
}

input[type=number] {
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

/*input[type=checkbox] {
  width: 36px;
  height: 36px;
  position: relative;
  margin: 0;
}

input[type=checkbox]:checked {
  background: #6b3e2e;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type=checkbox]:checked:before {
  content: '\2713';
  color: white;
  font-size: 36px;
}*/

input[type=submit] {
  background: #3a3a3a;
  width: 256px;
}

.rsvp-form > textarea {
  resize: none;
}
</style>