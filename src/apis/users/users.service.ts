import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneById,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { Shelter } from '../shelters/entities/shelter.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,
  ) {}

  findOneById({ id }: IUsersServiceFindOneById) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create({
    id,
    password,
    shelter_name,
    shelter_number,
    department_name,
    department_number,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.findOneById({ id });
    if (user) throw new ConflictException('이미 등록된 아이디 입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      id,
      password: hashedPassword,
      shelter_name,
      shelter_number,
      department_name,
      department_number,
    });

    const shelter = this.shelterRepository.create({
      id,
      shelter_name,
      shelter_number,
      department_name,
      department_number,
    });

    await this.usersRepository.save(newUser);
    await this.shelterRepository.save(shelter);

    return newUser;
  }
}
