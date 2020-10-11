import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMaintenance1602430110600
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'equipament_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'employee_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar(1)',
            default: "'P'",
            isNullable: false,
          },
          {
            name: 'maintenanceType_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp',
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
      'maintenances',
      new TableForeignKey({
        name: 'TypeMaintenance',
        columnNames: ['maintenanceType_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'maintenanceTypes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'maintenances',
      new TableForeignKey({
        name: 'EquipamentMaintenance',
        columnNames: ['equipament_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'equipaments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'maintenances',
      new TableForeignKey({
        name: 'EmployeeMaintenance',
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenances');
  }
}
