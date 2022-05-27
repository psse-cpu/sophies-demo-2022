import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserWithoutHash } from './user.entity'
import { RegistrationSource } from './registration-source'

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

  // TODO: fix other info -- just a quick hack since need to run errands
  // labels: tech-debt
  async register(
    email: string,
    plainTextPassword: string,
    // eslint-disable-next-line unicorn/no-object-as-default-parameter -- false +
    otherInfo: {
      givenName?: string
      familyName?: string
      registrationSource?: RegistrationSource
    } = {
      givenName: '',
      familyName: '',
      registrationSource: RegistrationSource.LOCAL,
    }
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10)
    return this.userRepository.save({ email, passwordHash, ...otherInfo })
  }

  async allUsers(): Promise<UserWithoutHash[]> {
    return this.userRepository.find()
  }
}
