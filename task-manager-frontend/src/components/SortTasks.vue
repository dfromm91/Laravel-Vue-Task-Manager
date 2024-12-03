<template>
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Sort Tasks</h3>
      <div class="flex gap-4">
        <label class="flex items-center">
          <input
            type="radio"
            value="oldest"
            v-model="selectedSort"
            class="mr-2"
            @change="emitSort"
          />
          Oldest
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="newest"
            v-model="selectedSort"
            class="mr-2"
            @change="emitSort"
          />
          Newest
        </label>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSort: "oldest", // Default sorting option
      };
    },
    methods: {
      emitSort() {
        this.$emit("sort-tasks", this.selectedSort); // Emit the selected sort option to the parent
      },
    },
  };
  </script>
  
  <style>
  /* Additional styling if needed */
  </style>
  