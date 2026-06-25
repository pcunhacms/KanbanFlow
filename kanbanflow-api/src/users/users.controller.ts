import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


//o controller so tem uma funcao: receber requisicoes HTTP.
// nao deve saber como salvar um usuario, validar senha 
// controller pega a requisicao e passa pro service, o service da a resposta
//o controller passa a resposta pro usuario.


@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(
      Number(id),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      updateUserDto,
    );
  }

  @Delete(':id')
  delete (
    @Param('id') id: string,
  ) {
    return this.usersService.delete(
      Number(id),
    );
  }



}