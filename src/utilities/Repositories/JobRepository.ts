import { Job } from "@/models/Job";
import { JsonWriter } from "../JsonWriter";
import { RepositoryBase } from "./RepositoryBase";

export class JobRepository implements RepositoryBase<Job> {

  private writer: JsonWriter;

  constructor() {
    this.writer = new JsonWriter();
  }

  public add(job: Job): void {
    this.writer.send(job.description);
  }
  public update(job: Job): void {
    this.writer.send(job.description);
  }
  public remove(id: number): void {
    console.log('Removing entity')
  }
  public get(id?: number): Job {
    const data = this.writer.request()
    return { description: data, start: null, stop: null };
  }
}