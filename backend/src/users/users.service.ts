import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserWithoutHash } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    })
  }

  async register(email: string, plainTextPassword: string): Promise<User> {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10)
    return this.userRepository.save({ email, passwordHash })
  }

  async allUsers(): Promise<UserWithoutHash[]> {
    return this.userRepository.find()
  }
}
