import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/graphql/interfaces/context';

@Resolver()
export class AnimalsResolver {
  constructor(
    private readonly animalService: AnimalsService, //
  ) {}

  @Query(() => [Animal])
  fetchAnimals(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Query(() => Animal)
  fetchAnimal(
    @Args('animal_id') animal_id: string, //
  ): Promise<Animal> {
    return this.animalService.findOne({ animal_id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Animal)
  createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
    @Context() context: IContext,
  ): Promise<Animal> {
    const shelter_id = context.req.user; // context.req.user를 user 변수에 할당
    return this.animalService.create({ shelter_id, createAnimalInput }); // user 변수를 사용하여 animalService.create() 호출
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Animal)
  updateAnimal(
    @Args('animal_id') animal_id: string,
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
    @Context() context: IContext,
  ): Promise<Animal> {
    const current_id = context.req.user;
    return this.animalService.update({
      animal_id,
      current_id,
      updateAnimalInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteAnimal(
    @Args('animal_id') animal_id: string, //
    @Context() context: IContext,
  ): Promise<boolean> {
    const current_id = context.req.user;
    return this.animalService.delete({ animal_id, current_id });
  }
}
