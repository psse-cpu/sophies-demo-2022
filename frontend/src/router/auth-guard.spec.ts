// strategy taken from here - actually very good and makes sense
// https://medium.com/js-dojo/unit-testing-vue-router-1d091241312

import { RouteLocationNormalized } from 'vue-router'
import { RegistrationSource } from 'app/../backend/src/users/registration-source'
import authGuard from './auth-guard'
import * as auth from '../auth'

const mockUser = {
  id: 1,
  email: 'a',
  familyName: '',
  givenName: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  registrationSource: RegistrationSource.GOOGLE,
}

describe('authGuard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('passes when the route does not require authentication (logged-in user)', () => {
    vi.spyOn(auth, 'currentUser').mockResolvedValue(mockUser)

    const to = {
      name: 'guest',
      meta: { requiresAuth: false },
    } as unknown as RouteLocationNormalized

    const actual = authGuard(to, {} as RouteLocationNormalized)
    return expect(actual).resolves.toBe(true)
  })

  it('passes when the route does not require authentication (no user)', () => {
    // eslint-disable-next-line unicorn/no-null -- localForage returns null
    vi.spyOn(auth, 'currentUser').mockResolvedValue(null)

    const to = {
      name: 'guest',
      meta: { requiresAuth: false },
    } as unknown as RouteLocationNormalized

    const actual = authGuard(to, {} as RouteLocationNormalized)
    return expect(actual).resolves.toBe(true)
  })

  it('passes when the requires authentication but there is a current user', () => {
    vi.spyOn(auth, 'currentUser').mockResolvedValue(mockUser)

    const to = {
      name: 'secret',
      meta: { requiresAuth: true },
    } as unknown as RouteLocationNormalized

    const actual = authGuard(to, {} as RouteLocationNormalized)
    return expect(actual).resolves.toBe(true)
  })

  it('redirects when the requires authentication but no currentUser', () => {
    // eslint-disable-next-line unicorn/no-null -- localForage returns null
    vi.spyOn(auth, 'currentUser').mockResolvedValue(null)

    const to = {
      name: 'secret',
      meta: { requiresAuth: true },
    } as unknown as RouteLocationNormalized

    const actual = authGuard(to, {} as RouteLocationNormalized)
    return expect(actual).resolves.toStrictEqual({ name: 'login' })
  })

  it('passes when trying to switch to the login route (no infinite redirect)', () => {
    // eslint-disable-next-line unicorn/no-null -- localForage returns null
    vi.spyOn(auth, 'currentUser').mockResolvedValue(null)

    const to = {
      name: 'login',
      meta: { requiresAuth: true },
    } as unknown as RouteLocationNormalized

    const actual = authGuard(to, {} as RouteLocationNormalized)
    return expect(actual).resolves.toBe(true)
  })
})
