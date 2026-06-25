import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity('boards')
export class BoardEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    () => ColumnEntity,
    (column) => column.board,
  )
  columns!: ColumnEntity[];
}