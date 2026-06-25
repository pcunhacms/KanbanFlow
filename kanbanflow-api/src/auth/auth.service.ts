import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

//o authService é responsavel por receber email e senha, buscar
// no userRepository (banco) e comparar 

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

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
