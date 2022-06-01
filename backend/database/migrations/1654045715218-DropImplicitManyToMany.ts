import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropImplicitManyToMany1654045715218 implements MigrationInterface {
    name = 'DropImplicitManyToMany1654045715218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "membership" DROP CONSTRAINT "FK_16a3bd60719b3cebb8ba71266b4"
        `)
        await queryRunner.query(`
            ALTER TABLE "membership" DROP CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d"
        `)
        await queryRunner.query(`
            DROP INDEX "public"."IDX_16a3bd60719b3cebb8ba71266b"
        `)
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e9c72e8d29784031c96f5c6af8"
        `)
        await queryRunner.query(`
            DROP TABLE "membership"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "membership" (
                "user_id" integer NOT NULL,
                "project_id" integer NOT NULL,
                CONSTRAINT "PK_65788c47883ba03e06100e98ab0" PRIMARY KEY ("user_id", "project_id")
            )
        `)
        await queryRunner.query(`
            CREATE INDEX "IDX_e9c72e8d29784031c96f5c6af8" ON "membership" ("user_id")
        `)
        await queryRunner.query(`
            CREATE INDEX "IDX_16a3bd60719b3cebb8ba71266b" ON "membership" ("project_id")
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ADD CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
        await queryRunner.query(`
            ALTER TABLE "membership"
            ADD CONSTRAINT "FK_16a3bd60719b3cebb8ba71266b4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }
}
