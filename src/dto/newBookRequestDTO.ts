import { GenericDto } from './genericDTO';
import { Expose } from 'class-transformer';
import { IsDecimal, IsString, MaxLength, MinLength } from 'class-validator';

export class NewBookRequestDTO extends GenericDto {
  @IsString()
  @Expose()
  @MaxLength(50)
  @MinLength(3)
  title: string;

  @IsString()
  @Expose()
  @MaxLength(250)
  @MinLength(3)
  description: string;

  @IsDecimal()
  @Expose()
  price: string;
}
