import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueConstraintToMembership1654350817114
    implements MigrationInterface
{
    name = 'AddUniqueConstraintToMembership1654350817114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_65788c47883ba03e06100e98ab" ON "membership" ("project_id", "user_id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_65788c47883ba03e06100e98ab"
        `)
    }
}
