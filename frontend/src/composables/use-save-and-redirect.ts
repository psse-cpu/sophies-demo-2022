import { useRoute, useRouter } from 'vue-router'
import type { UserWithoutHash } from 'backend/src/users/user-without-hash.dto'

import localforage from 'localforage'

interface ComposableReturn {
  saveUserAndRedirect(response: UserWithoutHash): Promise<void>
}

export const useSaveAndRedirect = (): ComposableReturn => {
  const router = useRouter()
  const route = useRoute()

  const saveUserAndRedirect = async (user: UserWithoutHash) => {
    await localforage.setItem('currentUser', user)
    router.push(route.redirectedFrom?.fullPath ?? '/')
  }

  return { saveUserAndRedirect }
}
