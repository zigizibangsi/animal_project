import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';
import {
  CreateReservationInput,
  DeleteReservationInput,
} from './dto/reservation.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/graphql/interfaces/context';

@Resolver()
export class ReservationsResolver {
  constructor(
    private readonly ReservationService: ReservationsService, //
  ) {}

  @Query(() => Reservation)
  fetchReservation(
    @Args('name') name: string, //
    @Args('phone') phone: string, //
  ): Promise<Reservation> {
    return this.ReservationService.findOne({ name, phone });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Reservation])
  checkReservation(@Context() context: IContext): Promise<Reservation[]> {
    const current_id = context.req.user;
    return this.ReservationService.findReservation({ current_id });
  }

  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return this.ReservationService.create({ createReservationInput });
  }

  @Mutation(() => Boolean)
  deleteReservation(
    @Args('deleteReservationInput')
    deleteReservationInput: DeleteReservationInput,
  ): Promise<boolean> {
    return this.ReservationService.delete({ deleteReservationInput });
  }
}
