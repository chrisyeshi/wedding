import { createRouter, createWebHistory } from "vue-router";
import SaveTheDate from "@/views/SaveTheDate.vue";
import Gallery from "@/views/Gallery.vue";
import Rsvp from "@/views/Rsvp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      props: true
    },
    {
      path: '/rsvp/:guestKey?/:language?',
      name: 'Rsvp',
      component: Rsvp,
      props: true
    },
    {
      path: '/:language?',
      name: 'SaveTheDate',
      component: SaveTheDate,
      props: true
    },
  ],
});

export default router;
