import localforage from 'localforage'
import { UserWithoutHash } from 'app/../backend/src/users/user-without-hash.dto'
import { useSaveAndRedirect } from './use-save-and-redirect'

const pushSpy = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({
    redirectedFrom: {
      fullPath: '/somewhere',
    },
  }),
  useRouter: vi.fn(() => ({
    push: pushSpy,
  })),
}))

describe('useSaveAndRedirect()', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('#saveAndRedirect', () => {
    it('gives localForage the correct args', () => {
      const { saveUserAndRedirect } = useSaveAndRedirect()
      const spy = vi.spyOn(localforage, 'setItem')

      saveUserAndRedirect({
        id: 1,
        email: 'mike@yahoo.com',
      } as UserWithoutHash)

      expect(spy).toHaveBeenCalledWith('currentUser', {
        id: 1,
        email: 'mike@yahoo.com',
      })
    })

    it('redirects the user', () => {
      const { saveUserAndRedirect } = useSaveAndRedirect()
      saveUserAndRedirect({
        id: 1,
        email: 'mike@yahoo.com',
      } as UserWithoutHash)

      expect(pushSpy).toHaveBeenCalledWith('/somewhere')
    })
  })
})
