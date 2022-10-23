import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnmCategoryIdPostTable1666476012906
  implements MigrationInterface
{
  //add_column_category_id_post_table
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: false,
      }),
    );

    //Criando a foreign key
    await queryRunner.createForeignKey(
      'post',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('post');

    //Removendo a foreign key
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('category_id') !== -1,
    );

    await queryRunner.dropForeignKey('post', foreignKey);
    await queryRunner.dropColumn(table, 'category_id');
  }
}
