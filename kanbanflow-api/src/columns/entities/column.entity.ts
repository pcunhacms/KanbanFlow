import { BoardEntity } from "src/boards/entities/board.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";



@Entity('columns')
export class ColumnEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(
        () => BoardEntity,
        (board) => board.columns,
    )
    @JoinColumn({
        name: 'board_id',
    })
    board!: BoardEntity;
}