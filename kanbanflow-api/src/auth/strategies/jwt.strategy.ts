//strategy funciona para validar o token. 
//verifica o status e veracidade do token jwt
// verifica assinatura (se foi o seu secret jwt que escreveu), expiração e extrai o usuário

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from 'src/users/users.service';


type JwtPayload = {
    sub: number;
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(
      payload.sub,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}