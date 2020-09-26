import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Group from '@modules/groups/infra/typeorm/entities/Group';
import SubGroup from '@modules/subGroups/infra/typeorm/entities/SubGroup';
import Departament from '@modules/departaments/infra/typeorm/entities/Departament';

@Entity('equipaments')
class Equipament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  group_id: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  subgroup_id: string;

  @ManyToOne(() => SubGroup)
  @JoinColumn({ name: 'subgroup_id' })
  subgroup: SubGroup;

  @Column()
  departament_id: string;

  @ManyToOne(() => Departament)
  @JoinColumn({ name: 'departament_id' })
  departament: Departament;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Equipament;
