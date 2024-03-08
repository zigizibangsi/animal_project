import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { Shelter } from '../shelters/entities/shelter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Shelter,
    ]),
  ],
  providers: [
    UsersResolver, //
    UsersService,
  ],
  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
