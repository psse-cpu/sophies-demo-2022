import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsersAndEntitiesTable1652887775878
  implements MigrationInterface
{
  name = 'AddUsersAndEntitiesTable1652887775878'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "exercise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "test_suite" text NOT NULL,
                "author_id" integer NOT NULL
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "password_hash" text NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "temporary_exercise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "test_suite" text NOT NULL,
                "author_id" integer NOT NULL,
                CONSTRAINT "FK_af18e28519183bb47e63a9a3c3b" FOREIGN KEY ("author_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `)
    await queryRunner.query(`
            INSERT INTO "temporary_exercise"("id", "title", "test_suite", "author_id")
            SELECT "id",
                "title",
                "test_suite",
                "author_id"
            FROM "exercise"
        `)
    await queryRunner.query(`
            DROP TABLE "exercise"
        `)
    await queryRunner.query(`
            ALTER TABLE "temporary_exercise"
                RENAME TO "exercise"
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exercise"
                RENAME TO "temporary_exercise"
        `)
    await queryRunner.query(`
            CREATE TABLE "exercise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "test_suite" text NOT NULL,
                "author_id" integer NOT NULL
            )
        `)
    await queryRunner.query(`
            INSERT INTO "exercise"("id", "title", "test_suite", "author_id")
            SELECT "id",
                "title",
                "test_suite",
                "author_id"
            FROM "temporary_exercise"
        `)
    await queryRunner.query(`
            DROP TABLE "temporary_exercise"
        `)
    await queryRunner.query(`
            DROP TABLE "user"
        `)
    await queryRunner.query(`
            DROP TABLE "exercise"
        `)
  }
}
