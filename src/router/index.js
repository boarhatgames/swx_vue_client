import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import('../views/LoginView.vue'),
  },
  {
    path: '/invite',
    name: 'invite',
    component: () =>
      import('../views/InviteView.vue'),

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
    path: '/s2w',
    name: 's2w',
    component: () =>
      import(/* webpackChunkName: "s2w" */ '../views/S2wView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "s2w" */ '../views/LoginView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "s2w" */ '../views/ProfileView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
