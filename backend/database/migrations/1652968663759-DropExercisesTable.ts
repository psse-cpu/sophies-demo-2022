import { MigrationInterface, QueryRunner } from 'typeorm'

// manually written, TypeORM can't detect nuked entity classes
export class DropExercisesTable1652968663759 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DROP TABLE exercise;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE public.exercise (
                id integer NOT NULL,
                title character varying NOT NULL,
                test_suite text NOT NULL,
                author_id integer NOT NULL,
                CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id")
            );            
            `
        )

        await queryRunner.query(`
            ALTER TABLE "exercise"
            ADD CONSTRAINT "FK_af18e28519183bb47e63a9a3c3b" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }
}
