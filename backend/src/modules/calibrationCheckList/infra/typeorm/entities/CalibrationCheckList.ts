import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Calibration from '@modules/calibrations/infra/typeorm/entities/Calibration';
import CheckListCalibration from '@modules/checkListCalibration/infra/typeorm/entities/CheckListCalibration';

@Entity('calibrationCheckLists')
class CalibrationCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  calibration_id: string;

  @ManyToOne(() => Calibration)
  @JoinColumn({ name: 'calibration_id' })
  calibration: Calibration;

  @Column()
  checkListCalibration_id: string;

  @ManyToOne(() => CheckListCalibration)
  @JoinColumn({ name: 'checkListCalibration_id' })
  checkListCalibration: CheckListCalibration;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CalibrationCheckList;
