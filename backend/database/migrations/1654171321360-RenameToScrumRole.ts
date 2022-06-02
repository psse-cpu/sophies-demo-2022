import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameToScrumRole1654171321360 implements MigrationInterface {
    name = 'RenameToScrumRole1654171321360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "membership"
                RENAME COLUMN "project_role" TO "scrum_role"
        `)
        await queryRunner.query(`
            ALTER TYPE "public"."membership_project_role_enum"
            RENAME TO "membership_scrum_role_enum"
        `)
        await queryRunner.query(`
            ALTER TYPE "public"."membership_scrum_role_enum"
            RENAME TO "membership_scrum_role_enum_old"
        `)
        await queryRunner.query(`
            CREATE TYPE "public"."membership_scrum_role_enum" AS ENUM('product owner', 'Scrum Master', 'member')
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role" DROP DEFAULT
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role" TYPE "public"."membership_scrum_role_enum" USING "scrum_role"::"text"::"public"."membership_scrum_role_enum"
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role"
            SET DEFAULT 'member'
        `)
        await queryRunner.query(`
            DROP TYPE "public"."membership_scrum_role_enum_old"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."membership_scrum_role_enum_old" AS ENUM('owner', 'maintainer', 'member', 'reporter')
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role" DROP DEFAULT
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role" TYPE "public"."membership_scrum_role_enum_old" USING "scrum_role"::"text"::"public"."membership_scrum_role_enum_old"
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ALTER COLUMN "scrum_role"
            SET DEFAULT 'member'
        `)
        await queryRunner.query(`
            DROP TYPE "public"."membership_scrum_role_enum"
        `)
        await queryRunner.query(`
            ALTER TYPE "public"."membership_scrum_role_enum_old"
            RENAME TO "membership_scrum_role_enum"
        `)
        await queryRunner.query(`
            ALTER TYPE "public"."membership_scrum_role_enum"
            RENAME TO "membership_project_role_enum"
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
                RENAME COLUMN "scrum_role" TO "project_role"
        `)
    }
}
