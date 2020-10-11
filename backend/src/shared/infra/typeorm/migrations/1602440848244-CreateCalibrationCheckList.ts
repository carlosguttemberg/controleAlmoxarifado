import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCalibrationCheckList1602440848244
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'calibrationCheckLists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'calibration_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checkListCalibration_id',
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
      'calibrationCheckLists',
      new TableForeignKey({
        name: 'CheckCalibration',
        columnNames: ['calibration_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'calibrations',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'calibrationCheckLists',
      new TableForeignKey({
        name: 'CheckListCalibration',
        columnNames: ['checkListCalibration_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'checkListCalibration',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('calibrationCheckLists');
  }
}
