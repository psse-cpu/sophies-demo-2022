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
      {
        name: 'my-projects',
        path: '/my-projects',
        component: () => import('src/pages/projects/my-projects-page.vue'),
      },
      {
        name: 'project',
        path: '/project/:projectId',
        component: () => import('src/pages/projects/project-view-page.vue'),
        props: true,
      },
      {
        name: 'new-project',
        path: '/project/new',
        component: () => import('src/pages/projects/new-project-page.vue'),
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
        component: () => import('src/pages/guest/login-page.vue'),
      },
      {
        name: 'registration',
        path: 'register',
        component: () => import('src/pages/guest/registration-page.vue'),
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
