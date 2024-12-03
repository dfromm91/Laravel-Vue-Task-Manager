<template>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4 mb-8">
      <input
        type="text"
        v-model="localNewTask.title"
        placeholder="Task Title"
        required
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="localNewTask.description"
        placeholder="Task Description (optional)"
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  </template>
  
  <script>
  export default {
    props: ["newTask"],
    data() {
      return {
        localNewTask: { ...this.newTask }, // Create a local copy of the prop
      };
    },
    methods: {
      submitForm() {
        this.$emit("create-task", this.localNewTask); // Emit the new task to the parent
        this.localNewTask = { title: "", description: "" }; // Reset the form
      },
    },
  };
  </script>
  