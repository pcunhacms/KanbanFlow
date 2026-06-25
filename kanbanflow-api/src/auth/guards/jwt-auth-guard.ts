//o guard serve para proteger as rotas.
//usuario tenta entrar na rota, o guard aparece, chama o strategy, o strategy valida o token
//responde o guard e ele libera ou nao a rota.

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}