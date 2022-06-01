import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMemberships1654049388314 implements MigrationInterface {
    name = 'AddMemberships1654049388314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."membership_project_role_enum" AS ENUM('owner', 'maintainer', 'member', 'reporter')
        `)
        await queryRunner.query(`
            CREATE TABLE "membership" (
                "id" SERIAL NOT NULL,
                "project_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "project_role" "public"."membership_project_role_enum" NOT NULL DEFAULT 'member',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ADD CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ADD CONSTRAINT "FK_16a3bd60719b3cebb8ba71266b4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "membership" DROP CONSTRAINT "FK_16a3bd60719b3cebb8ba71266b4"
        `)
        await queryRunner.query(`
            ALTER TABLE "membership" DROP CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d"
        `)
        await queryRunner.query(`
            DROP TABLE "membership"
        `)
        await queryRunner.query(`
            DROP TYPE "public"."membership_project_role_enum"
        `)
    }
}
