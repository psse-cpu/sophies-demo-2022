import bcrypt from 'bcrypt'
import { InsertResult, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

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

  // TODO: this method has no unit tests
  async register(
    email: string,
    plainTextPassword: string
  ): Promise<InsertResult> {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10)
    return this.userRepository.insert({ email, passwordHash })
  }
}
