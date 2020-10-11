import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Equipament from '@modules/equipaments/infra/typeorm/entities/Equipament';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import MaintenanceTypes from '@modules/maintenanceTypes/infra/typeorm/entities/MaintenanceTypes';

@Entity('maintenances')
class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  equipament_id: string;

  @Column()
  status: string;

  @ManyToOne(() => Equipament)
  @JoinColumn({ name: 'equipament_id' })
  equipament: Equipament;

  @Column()
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  maintenanceType_id: string;

  @ManyToOne(() => MaintenanceTypes)
  @JoinColumn({ name: 'maintenanceType_id' })
  maintenanceTypes: MaintenanceTypes;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Maintenance;
