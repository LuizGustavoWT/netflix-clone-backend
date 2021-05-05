import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovieCategoryTable1619697935859
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies_categories',
        columns: [
          {
            name: 'movieId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['movieId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            name: 'MovieToCategory',
          },
          {
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            name: 'CategoryToMovie',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies_categories');
  }
}
