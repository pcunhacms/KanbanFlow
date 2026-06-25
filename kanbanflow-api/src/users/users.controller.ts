import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch
} from '@nestjs/common';
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


  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
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