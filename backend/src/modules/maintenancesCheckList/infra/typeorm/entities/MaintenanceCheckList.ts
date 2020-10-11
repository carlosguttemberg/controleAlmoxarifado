import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Maintenance from '@modules/maintenances/infra/typeorm/entities/Maintenance';
import CheckListMaintenance from '@modules/checkListMaintenance/infra/typeorm/entities/CheckListMaintenance';

@Entity('maintenanceCheckLists')
class MaintenanceCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  maintenance_id: string;

  @ManyToOne(() => Maintenance)
  @JoinColumn({ name: 'maintenance_id' })
  maintenance: Maintenance;

  @Column()
  checkListMaintenance_id: string;

  @ManyToOne(() => CheckListMaintenance)
  @JoinColumn({ name: 'checkListMaintenance_id' })
  checkListMaintenance: CheckListMaintenance;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MaintenanceCheckList;
