import { InputType, OmitType } from '@nestjs/graphql';
import { Shelter } from '../entities/shelter.entity';

@InputType()
export class ShelterInput extends OmitType(Shelter, ['id'], InputType) {}
