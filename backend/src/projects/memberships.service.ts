import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { MembershipInput } from './membership-input.dto'
import { Membership } from './membership.entity'
import { ScrumRole } from './scrum-role.enum'

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,

    private dataSource: DataSource
  ) {}

  async addMember(membershipInput: MembershipInput): Promise<Membership[]> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      switch (membershipInput.scrumRole) {
        case ScrumRole.SCRUM_MASTER:
        case ScrumRole.PRODUCT_OWNER:
          await this.membershipRepository.update(
            {
              scrumRole: membershipInput.scrumRole,
              projectId: membershipInput.projectId,
            },
            {
              scrumRole: ScrumRole.MEMBER,
            }
          )
          break
        default:
          break
      }

      await this.membershipRepository.save(membershipInput)
      await queryRunner.commitTransaction()
    } catch {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    return this.membershipRepository.findBy({
      projectId: membershipInput.projectId,
    })
  }
}
