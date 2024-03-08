import { IAuthUser } from 'src/commons/graphql/interfaces/context';
import { CreateReservationInput } from '../dto/reservation.input';

export interface IReservationsServiceFindOne {
  name: string;
  phone: string;
}

export interface IReservationServiceCreate {
  createReservationInput: CreateReservationInput;
}

export interface IReservationServiceDelete {
  deleteReservationInput: CreateReservationInput;
}

export interface IReservationsServiceFindReservation {
  current_id: IAuthUser['user'];
}
