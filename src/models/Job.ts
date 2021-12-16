import { Entity } from "@/utilities/Repositories/Entity";

export class Job {
  public id = null;
  public createdAt = null;
  public description = '';
  public start: Date | null = null;
  public stop: Date | null = null;

  constructor(description = '') {
    this.start = new Date();
    this.description = description;
  }

  public get duration(): number {
    let millis: number;
    if (this.stop && this.start) {
      console.log('first')
      millis = this.stop.getTime() - this.start.getTime();
    } else if (this.start) {
      console.log('second')
      millis = Date.now() - this.start.getTime();
    } else {
      console.log('third')
      millis = 0;
    }
    return this.getAsHours(millis);
  }

  private getAsHours(milliseconds: number): number {
    return (milliseconds / 1000) / 3600;
  }
}

export interface JobDto extends Entity {
  description: string;
  start: string | undefined;
  stop: string | undefined;
}

export interface IpcResponse<T> {
  data: T;
  message: string;
  status: string;
}