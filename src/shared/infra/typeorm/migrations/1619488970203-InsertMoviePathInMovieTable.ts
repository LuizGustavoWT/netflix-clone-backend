import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class InsertMoviePathInMovieTable1619488970203
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies',
      new TableColumn({
        name: 'moviePath',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('movies', 'moviePath');
  }
}
