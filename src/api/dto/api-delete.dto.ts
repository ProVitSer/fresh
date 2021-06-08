import  {IsString, IsNotEmpty} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class FileDeleteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    originalname: string;
    
}