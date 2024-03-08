import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => String)
  animal_id: string;

  @Field(() => String)
  shelter: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class DeleteReservationInput {
  @Field(() => String)
  animal_id: string;

  @Field(() => String)
  shelter: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class findOneReservationInput {
  @Field(() => String)
  animal_id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  password: string;
}
