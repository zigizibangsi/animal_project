import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Shelter } from '../shelters/entities/shelter.entity';
import { ShelterService } from '../shelters/shelters.service';
import { Reservation } from './entities/reservation.entity';
import { Animal } from '../animals/entities/animal.entity';
import { AnimalsService } from '../animals/animals.service';
import { AnimalsResolver } from '../animals/animals.resolver';
import { UsersService } from '../users/users.service';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal, //
      User, //
      Shelter,
      Reservation,
    ]),
  ],
  providers: [
    AnimalsResolver, //
    AnimalsService, //
    UsersService, //
    ShelterService,
    ReservationsResolver,
    ReservationsService,
  ],
})
export class ReservationsModule {}
