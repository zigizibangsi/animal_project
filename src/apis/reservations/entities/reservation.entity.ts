import { Field, ObjectType } from '@nestjs/graphql';
import { Shelter } from 'src/apis/shelters/entities/shelter.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  primary_id: string;

  @Column()
  @Field(() => String)
  animal_id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  password: string;

  @ManyToOne(() => Shelter)
  @Field(() => Shelter)
  shelter: Shelter;
}
