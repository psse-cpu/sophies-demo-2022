import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFkToExercises1652803531114 implements MigrationInterface {
    name = 'AddFkToExercises1652803531114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exercise"
            ADD "author_id" integer NOT NULL
        `)
        await queryRunner.query(`
            ALTER TABLE "exercise"
            ADD CONSTRAINT "FK_af18e28519183bb47e63a9a3c3b" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exercise" DROP CONSTRAINT "FK_af18e28519183bb47e63a9a3c3b"
        `)
        await queryRunner.query(`
            ALTER TABLE "exercise" DROP COLUMN "author_id"
        `)
    }
}
