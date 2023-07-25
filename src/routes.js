import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';
import Vocabulary from '@/pages/vocabulary/index.vue';
import Login from '@/pages/auth/login.vue';
import Registration from '@/pages/auth/registration.vue';
import Quiz from '@/pages/quiz.vue';
import Testing from '@/pages/testing.vue';
import QuizResult from '@/pages/quiz-result.vue';
import { useAuthStore } from '@/store/auth';


function isAuth() {
  const authStore = useAuthStore();
  if (!authStore.isAuth()) return { name: 'login' };
}

export const routes = [
  { path: '/', component: Index, name: 'index', beforeEnter: [isAuth] },
  { path: '/vocabulary', component: Vocabulary, name: 'vocabulary', beforeEnter: [isAuth] },
  { path: '/quiz/:type', component: Quiz, name: 'quiz', beforeEnter: [isAuth] },
  { path: '/testing/:type', component: Testing, name: 'testing', beforeEnter: [isAuth] },
  { path: '/quiz-result/:hash', component: QuizResult, name: 'quiz-result', beforeEnter: [isAuth] },
  { path: '/login', component: Login, name: 'login' },
  { path: '/registration', component: Registration, name: 'registration' },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
