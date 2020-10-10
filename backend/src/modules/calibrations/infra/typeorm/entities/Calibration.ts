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
import CalibrationTypes from '@modules/calibrationTypes/infra/typeorm/entities/CalibrationTypes';

@Entity('calibrations')
class Calibrations {
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
  calibrationType_id: string;

  @ManyToOne(() => CalibrationTypes)
  @JoinColumn({ name: 'calibrationType_id' })
  calibrationTypes: CalibrationTypes;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Calibrations;
