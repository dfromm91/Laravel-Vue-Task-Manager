<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Edit Task</h2>
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <input
            type="text"
            v-model="localEditingTask.title"
            placeholder="Task Title"
            required
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            v-model="localEditingTask.description"
            placeholder="Task Description"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="$emit('cancel-edit')"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["editingTask"],
    data() {
      return {
        localEditingTask: { ...this.editingTask }, // Create a local copy of the prop
      };
    },
    methods: {
      submitForm() {
        this.$emit("update-task", this.localEditingTask); // Emit the updated task to the parent
      },
    },
  };
  </script>
  