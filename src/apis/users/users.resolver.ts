import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/graphql/interfaces/context';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @Context() context: IContext, //
  ): string {
    // 유저 정보 꺼내오기
    console.log('================');
    console.log(context.req.user);
    console.log('================');
    return '인가에 성공하였습니다.';
  }

  @Mutation(() => User)
  async createUser(
    @Args('id') id: string,
    @Args('password') password: string,
    @Args('shelter_name') shelter_name: string,
    @Args('shelter_number') shelter_number: string,
    @Args('department_name') department_name: string,
    @Args('department_number') department_number: string,
  ): Promise<User> {
    return this.usersService.create({
      id,
      password,
      shelter_name,
      shelter_number,
      department_name,
      department_number,
    });
  }
}
