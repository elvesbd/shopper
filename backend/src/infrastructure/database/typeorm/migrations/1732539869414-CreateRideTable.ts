import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRideTable1732539869414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
		CREATE TABLE rides (
      id UUID PRIMARY KEY,
			customer_id VARCHAR(255) NOT NULL,
			origin VARCHAR(255) NOT NULL,
			destination VARCHAR(255) NOT NULL,
			distance INT NOT NULL,
			duration VARCHAR(50) NOT NULL,
			driver_id INT NOT NULL,
			driver_name VARCHAR(255) NOT NULL,
			value INT NOT NULL,
			date TIMESTAMP NOT NULL
		);
	`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE rides;`);
  }
}
