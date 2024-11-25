import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDriverTable1732539848994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
		CREATE TABLE drivers (
      "id" SERIAL PRIMARY KEY,
			"name" VARCHAR(255) NOT NULL,
			"description" TEXT NULL,
			"vehicle" VARCHAR(255) NOT NULL,
			"rating" SMALLINT NOT NULL,
			"comment" TEXT NULL,
			"pricePerKm" INT NOT NULL,
			"minimumMeters" INT NOT NULL
		);
	`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE drivers;`);
  }
}
