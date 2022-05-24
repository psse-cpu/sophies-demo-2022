import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import authGuard from './auth-guard'

import routes from './routes'

const createHistoryFactory = () => {
  if (process.env.SERVER) {
    return createMemoryHistory
  }

  return process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  const createHistory = createHistoryFactory()

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(authGuard)

  return Router
})
