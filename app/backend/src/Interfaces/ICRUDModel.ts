export interface ICRUDModelReader <T> {
  findAll(): Promise<T[]>
}

export type ICRUDModel<T> = ICRUDModelReader<T>;
