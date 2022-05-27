import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMoreUserColumns1653626460664 implements MigrationInterface {
    name = 'AddMoreUserColumns1653626460664'

    // NOTE: edited by hand
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            BEGIN;

            ALTER TABLE "user"
            ADD "family_name" character varying NOT NULL DEFAULT '';

            ALTER TABLE "user"
            ALTER COLUMN "family_name" DROP DEFAULT;

            COMMIT;
        `)

        await queryRunner.query(`
            BEGIN;

            ALTER TABLE "user"
            ADD "given_name" character varying NOT NULL DEFAULT '';
            
            ALTER TABLE "user"
            ALTER COLUMN "given_name" DROP DEFAULT;

            COMMIT;
        `)
        await queryRunner.query(`
            CREATE TYPE "public"."user_registration_source_enum" AS ENUM('local', 'google')
        `)
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "registration_source" "public"."user_registration_source_enum" NOT NULL DEFAULT 'local'
        `)
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "registration_source" DROP DEFAULT
        `)
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `)
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `)
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deleted_at" TIMESTAMP
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deleted_at"
        `)
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updated_at"
        `)
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "created_at"
        `)
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "registration_source"
        `)
        await queryRunner.query(`
            DROP TYPE "public"."user_registration_source_enum"
        `)
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "given_name"
        `)
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "family_name"
        `)
    }
}
