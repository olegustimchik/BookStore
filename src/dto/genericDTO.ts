import { constructDto } from '../dto/constructDTO';

export abstract class GenericDto {
  constructor(data: unknown) {
    Object.assign(this, constructDto(this, data));
  }
}
