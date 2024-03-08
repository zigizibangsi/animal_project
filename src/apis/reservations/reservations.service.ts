import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import {
  IReservationServiceCreate,
  IReservationServiceDelete,
  IReservationsServiceFindOne,
  IReservationsServiceFindReservation,
} from './interfaces/reservations-service.interface';
import { Shelter } from '../shelters/entities/shelter.entity';
import { AnimalsService } from '../animals/animals.service';
import { Animal } from '../animals/entities/animal.entity';
import { ShelterService } from '../shelters/shelters.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,

    @InjectRepository(Shelter)
    private readonly sheltersRepository: Repository<Shelter>, //
    private readonly shelterService: ShelterService,

    @InjectRepository(Animal)
    private readonly animalsRepository: Repository<Animal>,
    private readonly animalService: AnimalsService,
  ) {}

  findOne({ name, phone }: IReservationsServiceFindOne): Promise<Reservation> {
    return this.reservationsRepository.findOne({
      where: { name: name, phone: phone },
    });
  }

  async findReservation({
    current_id,
  }: IReservationsServiceFindReservation): Promise<Reservation[]> {
    const current = current_id.id;
    const shelter = await this.shelterService.findShelter_id({
      shelter_id: current,
    });
    const pk = shelter.primary_id;

    return this.reservationsRepository.find({
      where: { shelter: { primary_id: pk } },
      relations: ['shelter'],
    });
  }

  async create({
    createReservationInput,
  }: IReservationServiceCreate): Promise<Reservation> {
    const animal_id = createReservationInput.animal_id;
    const shelter_name = createReservationInput.shelter;

    // 선택 조건으로 동물을 찾음
    const shelter = await this.shelterService.findShelter_name({
      shelter_name: shelter_name,
    });

    if (!animal_id) {
      throw new NotFoundException('Animal not found');
    }

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    const result = this.reservationsRepository.save({
      ...createReservationInput,
      shelter: shelter,
    });
    return result;
  }

  async delete({
    deleteReservationInput,
  }: IReservationServiceDelete): Promise<boolean> {
    const { animal_id, shelter, name, phone, password } = {
      ...deleteReservationInput,
    };

    if (!animal_id) {
      throw new NotFoundException('동물 번호를 확인해주세요.');
    }

    if (!shelter) {
      throw new NotFoundException('보호소를 확인해주세요.');
    }

    if (!name) {
      throw new NotFoundException('이름을 확인해주세요.');
    }

    if (!phone) {
      throw new NotFoundException('연락처를 확인해주세요.');
    }

    if (!password) {
      throw new NotFoundException('비밀번호를 확인해주세요.');
    }

    const result = await this.reservationsRepository.delete({
      animal_id: animal_id,
    });
    return result.affected ? true : false;
  }
}
