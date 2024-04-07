import { GenericDto } from './genericDTO';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength, IsDecimal } from 'class-validator';

export class UpdateBookRequestDTO extends GenericDto {
  @IsString()
  @IsOptional()
  @Expose()
  @MaxLength(50)
  @MinLength(3)
  title: string;

  @IsString()
  @Expose()
  @IsOptional()
  @MaxLength(250)
  @MinLength(3)
  description: string;

  @IsDecimal()
  @Expose()
  @IsOptional()
  price: string;
}
