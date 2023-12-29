import { IsNotEmpty, IsString } from 'class-validator';

export class AlarmItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
