import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';



//o authService é responsavel por receber email e senha, buscar
// no userRepository (banco) e comparar 

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }


    async register(registerDto: RegisterDto) {
        const userExists = await this.usersService.findByEmail(registerDto.email);
        if (userExists) {
            throw new BadRequestException('Email já cadastrado');
        }

        const user = await this.usersService.create(registerDto)


        const access_token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            access_token,
        };
    }



    async login(loginDto: LoginDto) {



        const user = await this.usersService.findByEmail(
            loginDto.email,
        );

        if (!user) {
            throw new UnauthorizedException(
                'Email ou senha inválidos',
            );
        };

        const passwordMatches =
            await bcrypt.compare(
                loginDto.password,
                user.password,
            );

        console.log("COMPARE RESULT", passwordMatches)

        if (!passwordMatches) {
            throw new UnauthorizedException(
                'Email ou senha inválidos',
            );
        };

        const access_token = this.jwtService.sign({
            sub: user.id,
            email: user.email
        });

        return {
            access_token
        };
    }
}
