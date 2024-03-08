import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import {
  ISheltersServiceFindOneByID,
  ISheltersServiceFindOneByName,
} from './interfaces/shelters-service.interface';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>, //
  ) {}

  findShelter_id({
    shelter_id,
  }: ISheltersServiceFindOneByID): Promise<Shelter> {
    return this.shelterRepository.findOne({
      where: { id: shelter_id },
    });
  }

  findShelter_name({
    shelter_name,
  }: ISheltersServiceFindOneByName): Promise<Shelter> {
    return this.shelterRepository.findOne({
      where: { shelter_name },
    });
  }
}
