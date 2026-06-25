
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';


//entity significa que essa classe é uma tabela no banco de dados. Sem @Entity fica uma classe comum.


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;


    @Column({
        unique: true,
    })
    email!: string;

    @Column()
    password!: string;

}