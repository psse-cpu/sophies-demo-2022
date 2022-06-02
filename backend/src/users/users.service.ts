import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Registrant } from './registrant.dto'
import { UserWithoutHash } from './user-without-hash.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findBy({ email }).then((results) => results[0])
  }

  emailExists(email: string): Promise<boolean> {
    return this.userRepository.countBy({ email }).then((count) => count > 0)
  }

  async register(user: Registrant): Promise<User> {
    const { password: plainTextPassword, ...profile } = user
    const passwordHash = await bcrypt.hash(plainTextPassword, 10)
    return this.userRepository.save({ passwordHash, ...profile })
  }

  async allUsers(): Promise<UserWithoutHash[]> {
    return this.userRepository.find()
  }
}
