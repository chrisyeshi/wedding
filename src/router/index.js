import { createRouter, createWebHistory } from "vue-router";
import SaveTheDate from "@/views/SaveTheDate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:language?",
      name: "SaveTheDate",
      component: SaveTheDate,
      props: true
    },
  ],
});

export default router;
