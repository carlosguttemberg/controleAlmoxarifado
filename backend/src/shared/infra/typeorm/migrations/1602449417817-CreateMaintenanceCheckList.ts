import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMaintenanceCheckList1602449417817
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenanceCheckLists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'maintenance_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checkListMaintenance_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar(1)',
            default: "'P'",
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'maintenanceCheckLists',
      new TableForeignKey({
        name: 'CheckMaintenance',
        columnNames: ['maintenance_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'maintenances',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'maintenanceCheckLists',
      new TableForeignKey({
        name: 'CheckListMaintenance',
        columnNames: ['checkListMaintenance_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'checkListMaintenance',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenanceCheckLists');
  }
}
