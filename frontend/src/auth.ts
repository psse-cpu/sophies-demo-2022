import { User } from 'src/generated/graphql'
import localforage from 'localforage'
import { UserWithoutHash } from 'backend/src/users/user-without-hash.dto'

export function currentUser(): Promise<UserWithoutHash | null> {
  return localforage.getItem<User>('currentUser')
}
