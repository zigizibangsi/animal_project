import { IAuthUser } from 'src/commons/graphql/interfaces/context';
import { CreateAnimalInput } from '../dto/create-animal.input';
import { UpdateAnimalInput } from '../dto/update-animal.input';
import { Animal } from '../entities/animal.entity';
import { Shelter } from 'src/apis/shelters/entities/shelter.entity';

export interface IAnimalsServiceCreate {
  createAnimalInput: CreateAnimalInput;
  shelter_id: IAuthUser['user'];
}

export interface IAnimalsServiceFindOne {
  animal_id: string;
}

export interface IAnimalServiceCheckAdopt {
  animal: Animal;
}

export interface IAnimalServiceCheckShelter {
  animal: Animal;
  current: string;
}

export interface IAnimalsServiceUpdate {
  animal_id: string;
  current_id: IAuthUser['user'];
  updateAnimalInput: UpdateAnimalInput;
}

export interface IAnimalServiceDelete {
  animal_id: string;
  current_id: IAuthUser['user'];
}
