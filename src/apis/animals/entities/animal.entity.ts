import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Shelter } from 'src/apis/shelters/entities/shelter.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ANIMAL_CATEGORY_ENUM {
  DOG = 'DOG',
  CAT = 'CAT',
  ETC = 'ETC',
}

registerEnumType(ANIMAL_CATEGORY_ENUM, {
  name: 'ANIMAL_CATEGORY_ENUM',
});

export enum SEX_CATEGORY_ENUM {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(SEX_CATEGORY_ENUM, {
  name: 'SEX_CATEGORY_ENUM',
});

@Entity()
@ObjectType()
export class Animal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Field(() => String)
  animal_id: string;

  @Column({ type: 'enum', enum: ANIMAL_CATEGORY_ENUM })
  @Field(() => ANIMAL_CATEGORY_ENUM)
  animal_category: ANIMAL_CATEGORY_ENUM;

  @Column({ type: 'enum', enum: SEX_CATEGORY_ENUM })
  @Field(() => SEX_CATEGORY_ENUM)
  sex: SEX_CATEGORY_ENUM;

  @Column({ type: 'date' })
  @Field(() => String)
  ad_start: Date;

  @Column({ type: 'date' })
  @Field(() => String)
  ad_finish: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdopt: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isReservation: boolean;

  @Column()
  @Field(() => String)
  img: string;

  @Column()
  @Field(() => Boolean)
  isNeuter: boolean;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  location: string;

  @ManyToOne(() => Shelter)
  @Field(() => Shelter)
  shelter: Shelter;

  @UpdateDateColumn() // 데이터 수정시 수정 시간 자동으로 추가
  updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
