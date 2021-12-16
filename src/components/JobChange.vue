<template>
  <div content-is-centered>
    <button @click="getPreviousJobs">Load Previous Jobs</button>
    <label for="jobInput">Job Description: </label>
    <input
      @keydown.enter="addJob"
      type="text"
      v-model="jobInput"
      id="jobInput"
    />
    <table>
      <thead>
        <th>Description</th>
        <th>Duration</th>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job">
          <td>{{ job.description }}</td>
          <td>{{ job.duration.toFixed(3) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { JobRepository } from '@/utilities/Repositories/JobRepository';
import { onActivated } from 'vue';
import { Vue, Options } from 'vue-class-component';
import { Job } from '../models/Job';

@Options({})
export default class JobChange extends Vue {
  jobInput = '';
  jobRepo: JobRepository = new JobRepository();

  public get jobs(): Job[] {
    return this.jobRepo.jobCollection;
  }

  setup(): void {
    // mounted
    onActivated(() => {
      console.log('Component is beforeMounted!')
      this.jobRepo.get();
    })
  }

  getPreviousJobs(): void {
    console.log('Pressing button')
    this.jobRepo.get();
  }

  addJob(): void {
    if (!this.jobInput) {
      return;
    }
    const newJob = new Job(this.jobInput);
    console.log(newJob);
    newJob.start = new Date();
    this.jobRepo.add(newJob);
    this.jobInput = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}

table, th, td {
  border: 1px solid black;
  border-radius: 10px;
}

.content-is-centered {
  display: flex;
  flex-direction: row;
  align-content: center;
}
</style>
