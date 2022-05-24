import { User } from 'backend/src/users/user.entity'
import localforage from 'localforage'

export function currentUser(): Promise<User | null> {
  return localforage.getItem<User>('currentUser')
}