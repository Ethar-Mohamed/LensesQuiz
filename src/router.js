import { createWebHistory, createRouter } from "vue-router";
import QuestionOne from "./components/QuestionOne.vue";
import QuestionTwo from "./components/QuestionTwo.vue";
import QuestionThree from "./components/QuestionThree.vue";
import QuestionFour from "./components/QuestionFour.vue";
import QuestionFive from "./components/QuestionFive.vue";
import QuestionSix from "./components/QuestionSix.vue";
import QuestionSeven from "./components/QuestionSeven.vue";

const routes = [
  {
    path: "/",
    name: "QuestionOne",
    component: QuestionOne,
  },
  {
    path: "/question-two",
    name: "QuestionTwo",
    component: QuestionTwo,
  },
  {
    path: "/question-three",
    name: "QuestionThree",
    component: QuestionThree,
  },
  {
    path: "/question-four",
    name: "QuestionFour",
    component: QuestionFour,
  },
  {
    path: "/question-five",
    name: "QuestionFive",
    component: QuestionFive,
  },
  {
    path: "/question-six",
    name: "QuestionSix",
    component: QuestionSix,
  },
  {
    path: "/question-seven",
    name: "QuestionSeven",
    component: QuestionSeven,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
