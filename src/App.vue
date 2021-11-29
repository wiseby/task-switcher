<template>
  <h1>Task Switcher</h1>
  <p>Making your day easier to manage</p>
  <p>
    Start a new task by entering a description in the box below followed by
    enter.
  </p>
  <JobChange />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import JobChange from "./components/JobChange.vue";

@Options({
  components: {
    JobChange,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
