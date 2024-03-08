import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import {
  IAnimalServiceCheckAdopt,
  IAnimalServiceCheckShelter,
  IAnimalServiceDelete,
  IAnimalsServiceCreate,
  IAnimalsServiceFindOne,
  IAnimalsServiceUpdate,
} from './interfaces/animals-service.interface';
import { Shelter } from '../shelters/entities/shelter.entity';
import { ShelterService } from '../shelters/shelters.service';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalsRepository: Repository<Animal>,

    @InjectRepository(Shelter)
    private readonly sheltersRepository: Repository<Shelter>, //
    private readonly shelterService: ShelterService,
  ) {}

  findAll(): Promise<Animal[]> {
    return this.animalsRepository.find({
      relations: ['shelter'],
    });
  }

  findOne({ animal_id }: IAnimalsServiceFindOne): Promise<Animal> {
    return this.animalsRepository.findOne({
      where: { animal_id: animal_id },
      relations: ['shelter'],
    });
  }

  async create({
    shelter_id,
    createAnimalInput,
  }: IAnimalsServiceCreate): Promise<Animal> {
    const shelter = shelter_id.id;
    const shelter_data = await this.shelterService.findShelter_id({
      shelter_id: shelter,
    });

    const result = this.animalsRepository.save({
      ...createAnimalInput,
      shelter: shelter_data,
    });
    return result;
  }

  async update({
    animal_id,
    current_id,
    updateAnimalInput,
  }: IAnimalsServiceUpdate): Promise<Animal> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const animal = await this.findOne({ animal_id });
    const current = current_id.id;

    // 검증은 서비스에서 하자 !!
    this.checkAdopt({ animal });
    this.checkShelter({ animal, current });

    const result = this.animalsRepository.save({
      ...animal,
      ...updateAnimalInput, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
    });
    return result;
  }

  checkAdopt({ animal }: IAnimalServiceCheckAdopt): any {
    if (animal.isAdopt) {
      throw new UnprocessableEntityException('이미 입양 되었습니다.');
    }
  }

  checkShelter({ animal, current }: IAnimalServiceCheckShelter): any {
    if (animal.shelter.id != current)
      throw new UnprocessableEntityException('접근 권한이 없습니다.');
  }

  async delete({
    animal_id,
    current_id,
  }: IAnimalServiceDelete): Promise<boolean> {
    const animal = await this.findOne({ animal_id });
    const current = current_id.id;
    this.checkShelter({ animal, current });

    const result = await this.animalsRepository.softDelete({
      animal_id: animal_id,
    });
    return result.affected ? true : false;
  }
}
