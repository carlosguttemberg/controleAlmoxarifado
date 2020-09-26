import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEquipaments1601145091882
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipaments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'group_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'subgroup_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'departament_id',
            type: 'uuid',
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
      'equipaments',
      new TableForeignKey({
        name: 'EquipamentGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'equipaments',
      new TableForeignKey({
        name: 'EquipamentSubGroup',
        columnNames: ['subgroup_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subgroups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'equipaments',
      new TableForeignKey({
        name: 'EquipamentDepartament',
        columnNames: ['departament_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'departaments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipaments');
  }
}
