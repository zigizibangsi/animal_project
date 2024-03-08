import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Reservation } from 'src/apis/reservations/entities/reservation.entity';

@Entity()
@ObjectType()
export class Shelter {
  @PrimaryGeneratedColumn('uuid')
  primary_id: string;

  @Column()
  @Field(() => String)
  id: string;

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
