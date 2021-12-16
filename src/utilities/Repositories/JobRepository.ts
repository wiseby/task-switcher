import { IpcResponse, Job, JobDto } from '@/models/Job';

export class JobRepository {
  public activeJob = new Job();
  public jobCollection: Job[] = [];

  public add(job: Job): void {
    console.log('Job being added: ', job);
    this.activeJob.stop = new Date();
    console.log(this.jobCollection);
    this.jobCollection.push(job);
    const transferData: JobDto[] = this.jobCollection.map((job: Job) => {
      const dto: JobDto = {
        description: job.description,
        start: job.start?.toString(),
        stop: job.stop?.toString(),
      };
      return dto;
    });
    this.send(`jobs/${job.start?.toDateString()}.json`, transferData);
    this.activeJob = job;
  }
  public update(job: Job): void {
    this.send('jobs.json', job);
  }
  public remove(id: number): void {
    console.log('jobs.json', 'Removing entity');
  }
  public get(): Job[] {
    const today = new Date();
    this.request<Job[]>(
      `jobs/${today.toDateString()}.json`,
      (response: IpcResponse<JobDto[]>) => {
        console.log(response);
        const initializedJobs: Job[] = response.data.map((job: JobDto) => {
          const initJob = new Job();
          initJob.description = job.description;
          initJob.start = new Date(job.start?.toString() ?? '');
          initJob.stop = new Date(job.start?.toString() ?? '');
          return initJob;
        });
        this.jobCollection = initializedJobs;
        return initializedJobs;
      }
    );
    return this.jobCollection;
  }

  /* eslint-disable */
  public send(file: string, data: any): void {
    let sendData = {};
    if (Array.isArray(data)) {
      sendData = [...data];
    } else {
      sendData = { ...data };
    }
    (window as any).api.send('WRITE_FILE', { file: file, data: sendData });
  }

  public request<T>(file: string, callback: any): IpcResponse<T> {
    console.log('requesting Jobs');
    (window as any).api.send('READ_FILE', { file: file });
    return (window as any).api.receive('READ_FILE', callback);
  }
    /* eslint-enable */
}
