import { IEntity } from "@/utilities/Repositories/IEntity";

export interface Job extends IEntity {
  description: string;
  start: Date | null;
  stop: Date | null;
}
