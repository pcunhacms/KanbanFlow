import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { BoardEntity } from './entities/board.entity';
@Injectable()
export class BoardsService {


  constructor(
          @InjectRepository(BoardEntity)
          private readonly boardRepository: Repository<BoardEntity>,
          // repository é o objeto responsavel por conversar com a tabela
          //apesar de estar usando a tabela (entity) chamamos de repository
          //entity = tabela | repository => cobjeto que conversa com a tabela
      ) {}


    async create(createBoardDto: CreateBoardDto) {
      const board = this.boardRepository.create({
        ...createBoardDto,
      });

      return await this.boardRepository.save(
        board,
      )
    }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
