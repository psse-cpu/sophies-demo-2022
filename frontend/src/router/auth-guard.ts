import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

import { currentUser } from 'src/auth'

const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized
): Promise<RouteLocationRaw | boolean> => {
  const user = await currentUser()
  if (!user && to.meta.requiresAuth && to.name !== 'login') {
    return { name: 'login' }
  }

  return true
}

export default authGuard
