import { createRouter, createWebHashHistory } from 'vue-router';
import authMiddleware from './middleware/auth-middleware'

const routes = [
  {
    path: '/',
    name: 'root',
    component: () =>
      import('../views/ProfileView.vue'),
      // meta: { layout: 'auth' },

  },
  {
    path: '/invite',
    name: 'invite',
    component: () =>
      import('../views/InviteView.vue'),
      meta: { layout: 'auth' },

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
      meta: { layout: 'auth' },

  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(authMiddleware);

export default router;
