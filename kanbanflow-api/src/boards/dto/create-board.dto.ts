import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBoardDto {

    @IsNotEmpty()
    name!: string;


    @IsNumber()
    board_id!: number;


}
