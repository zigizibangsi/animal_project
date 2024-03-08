import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Shelter } from '../shelters/entities/shelter.entity';
import { ShelterService } from '../shelters/shelters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal, //
      User, //
      Shelter,
    ]),
  ],
  providers: [
    AnimalsResolver, //
    AnimalsService,
    // UsersService,
    ShelterService,
  ],
})
export class AnimalsModule {}
