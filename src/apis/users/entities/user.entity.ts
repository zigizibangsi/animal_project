import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  primary_id: string;

  @Column()
  @Field(() => String)
  id: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  shelter_name: string;

  @Column()
  @Field(() => String)
  shelter_number: string;

  @Column()
  @Field(() => String)
  department_name: string;

  @Column()
  @Field(() => String)
  department_number: string;
}
