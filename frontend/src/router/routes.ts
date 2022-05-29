import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main-layout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('src/pages/index-page.vue'),
      },
    ],
  },
  {
    path: '/guest',
    component: () => import('src/layouts/guest-layout.vue'),
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('src/pages/login-page.vue'),
      },
      {
        name: 'registration',
        path: 'register',
        component: () => import('src/pages/registration-page.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/error-not-found.vue'),
  },
]

export default routes
