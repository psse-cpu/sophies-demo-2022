import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSprintLengthColumn1654172956515 implements MigrationInterface {
    name = 'AddSprintLengthColumn1654172956515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "sprint_length" integer NOT NULL
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "sprint_length"
        `)
    }
}
