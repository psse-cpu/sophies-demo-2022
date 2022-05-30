import { User } from 'src/generated/graphql'
import localforage from 'localforage'

export function currentUser(): Promise<Omit<User, 'passwordHash'> | null> {
  return localforage.getItem<User>('currentUser')
}
