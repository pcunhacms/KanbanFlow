import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        // repository é o objeto responsavel por conversar com a tabela
    ) { }

    //private users: User[] = [];

    async create(createUserDto: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            10
        )

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        // cria uma instância de UserEntity

        return await this.userRepository.save(user);

        // gera um INSERT no PostgreSQL
    }

    async findAll() {
        return await this.userRepository.find();
        //gera algo como SELECT * FROM users;
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            }
        })
    }

    async findOne(id: number) {

        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException(
                'Usuário não encontrado',
            );
        }

        return user;
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ) {

        const user = await this.findOne(id);

        //assing sobrescreve apenas os campos enviados 
        Object.assign(
            user,
            updateUserDto,
        );

        return await this.userRepository.save(user);
    }


    async delete(id: number) {
        const user = await this.findOne(id);
        //chamamos findOne pq ela ja trata caso o id passado nao exista.
        //se existir ele faz o resto da funcao delete

        await this.userRepository.remove(user)
        //como se fosse um DELETE FROM users

        return {
            message: "Usuário deletado com sucesso!"
        }
    }

}