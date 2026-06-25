import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnEntity } from './entities/column.entity';
import { BoardEntity } from '../boards/entities/board.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {

  constructor(
  @InjectRepository(ColumnEntity)
  private readonly columnRepository:
    Repository<ColumnEntity>,

  @InjectRepository(BoardEntity)
  private readonly boardRepository:
    Repository<BoardEntity>,

    //pq ele vai se comunicar com a tabela de boards e com a tabela de column
) {}
  create(createColumnDto: CreateColumnDto) {
    return 'This action adds a new column';
  }

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
