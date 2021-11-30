import { IEntity } from "./IEntity";

export interface RepositoryBase<T extends IEntity> {
  add(entity: T): void;
  update(entity: T): void;
  remove(id: number): void;
  get(id?: number): T;
}