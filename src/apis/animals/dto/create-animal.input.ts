import { Field, InputType } from '@nestjs/graphql';
import {
  ANIMAL_CATEGORY_ENUM,
  SEX_CATEGORY_ENUM,
} from '../entities/animal.entity';
// import { UserInput } from 'src/apis/users/dto/create-user.input';

@InputType()
export class CreateAnimalInput {
  @Field(() => String)
  animal_id: string;

  @Field(() => ANIMAL_CATEGORY_ENUM)
  animal_category: ANIMAL_CATEGORY_ENUM;

  @Field(() => SEX_CATEGORY_ENUM)
  sex: SEX_CATEGORY_ENUM;

  @Field(() => String)
  ad_start: string;

  @Field(() => String)
  ad_finish: string;

  @Field(() => Boolean)
  isAdopt: boolean;

  @Field(() => Boolean)
  isReservation: boolean;

  @Field(() => String)
  img: string;

  @Field(() => Boolean)
  isNeuter: boolean;

  @Field(() => String)
  description: string;

  @Field(() => String)
  location: string;

  // @Field(() => ShelterInput)
  // shelter: ShelterInput;

  // @Field(() => UserInput)
  // user: UserInput;
}
