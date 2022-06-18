import { createRouter, createWebHistory } from "vue-router";
import SaveTheDate from "@/views/SaveTheDate.vue";
import Gallery from "@/views/Gallery.vue";
import Rsvp from "@/views/Rsvp.vue";
import Faq from "@/views/Faq.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gallery',
      component: Gallery,
      props: route => ({
        guestKey: route.query.guestKey || route.query.guest,
        language: route.query.language
      })
    },
    {
      path: '/save-the-date/:language?',
      component: SaveTheDate,
      props: true
    },
    {
      path: '/rsvp/:guestKey?/:language?',
      component: Rsvp,
      props: true
    },
    {
      path: '/faq',
      component: Faq,
      props: route => ({
        guestKey: route.query.guestKey || route.query.guest,
        language: route.query.language
      })
    },
    {
      path: '/zh',
      component: Rsvp,
      props: { language: 'zh' }
    },
    {
      path: '/:guestKey?/:language?',
      component: Rsvp,
      props: true
    },
    {
      path: '/',
      component: Rsvp,
      props: route => ({
        guestKey: route.query.guestKey || route.query.guest,
        language: route.query.language
      })
    },
  ],
});

export default router;
