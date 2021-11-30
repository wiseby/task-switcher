<template>
  <div content-is-centered>
    <label for="jobInput">Job Description: </label>
    <input
      @keydown.enter="addJob"
      type="text"
      v-model="jobInput"
      id="jobInput"
    />
    <ul>
      <li v-for="job in jobList" :key="job">{{ job.description }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { JobRepository } from "@/utilities/Repositories/JobRepository";
import { Vue, Options } from "vue-class-component";
import { Job } from "../models/Job";

@Options({})
export default class JobChange extends Vue {
  currentjob: Job = { description: "", start: null, stop: null };
  jobInput = "";
  jobList: Job[] = [];
  jobRepo: JobRepository = new JobRepository();

  addJob(): void {
    if (!this.jobInput) {
      return;
    }
    const newJob = { ...this.currentjob };
    newJob.description = this.jobInput;
    newJob.start = new Date();
    this.jobList.push(newJob);
    this.jobInput = "";
    const gotJob = this.jobRepo.get();
    console.log('Got this job: ', gotJob);
    this.jobRepo.add(newJob);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-is-centered {
  display: flex;
  align-content: center;
}
</style>
