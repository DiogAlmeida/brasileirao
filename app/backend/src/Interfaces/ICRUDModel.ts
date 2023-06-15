import { ID } from '.';

export interface ICRUDModelTeam <T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUsers <T> {
  findByEmail(email: string): Promise<T | null>,
}
