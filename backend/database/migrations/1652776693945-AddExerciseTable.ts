import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddExerciseTable1652776693945 implements MigrationInterface {
    name = 'AddExerciseTable1652776693945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "exercise" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "test_suite" text NOT NULL,
                CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "exercise"
        `)
    }
}
