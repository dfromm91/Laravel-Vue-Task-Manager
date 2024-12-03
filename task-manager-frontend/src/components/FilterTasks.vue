<template>
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Filter Tasks</h3>
      <div class="flex gap-4">
        <label class="flex items-center">
          <input
            type="radio"
            value="both"
            v-model="selectedFilter"
            class="mr-2"
            @change="emitFilter"
          />
          Both
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="completed"
            v-model="selectedFilter"
            class="mr-2"
            @change="emitFilter"
          />
          Completed
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="pending"
            v-model="selectedFilter"
            class="mr-2"
            @change="emitFilter"
          />
          Pending
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFilter: "both", // Default to showing both completed and pending tasks
      };
    },
    methods: {
      emitFilter() {
        this.$emit("filter-tasks", this.selectedFilter); // Emit the selected filter to the parent
      },
    },
  };
  </script>
  
  <style>
  /* Additional styling if needed */
  </style>
  