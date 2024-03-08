export interface IUsersServiceCreate {
  id: string;
  password: string;
  shelter_name: string;
  shelter_number: string;
  department_name: string;
  department_number: string;
}

export interface IUsersServiceFindOneById {
  id: string;
}
