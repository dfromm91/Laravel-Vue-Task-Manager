<template>
  <div>
    <ul v-if="paginatedTasks.length" class="space-y-4">
      <li
        v-for="task in paginatedTasks"
        :key="task.id"
        class="border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <!-- Task Details -->
        <div>
          <h3 class="text-lg font-bold text-gray-800">{{ task.title }}</h3>
          <p class="text-sm text-gray-600">{{ task.description }}</p>
          <p class="text-sm text-gray-500">
            <span
              class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
              :class="task.is_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
              {{ task.is_completed ? "Completed" : "Pending" }}
            </span>
          </p>
        </div>

        <!-- CRUD Buttons -->
        <div class="flex flex-wrap sm:flex-nowrap sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
          <button 
            @click="$emit('toggle-completion', task)"
            class="w-full sm:w-[120px] text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-center">
            {{ task.is_completed ? "Mark Pending" : "Mark Complete" }}
          </button>

          <button
            @click="$emit('edit-task', task)"
            class="w-full sm:w-auto text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            @click="$emit('delete-task', task.id)"
            class="w-full sm:w-auto text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- No Tasks Found -->
    <div v-if="!loading && paginatedTasks.length === 0" class="text-gray-500 text-center">No tasks found.</div>

    <!-- Pagination Controls -->
    <div v-if="pageCount > 1" class="flex justify-center space-x-2 mt-4">
      <button
        v-for="page in pageCount"
        :key="page"
        @click="currentPage = page"
        :class="page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
        class="px-4 py-2 rounded hover:bg-blue-300"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

 <script>
 export default {
   props: ["tasks", "loading", "error", "sortOption", "filterOption"],
   data() {
     return {
       currentPage: 1, // Track the current page
       tasksPerPage: 3, // Number of tasks to show per page
     };
   },
   computed: {
     // Apply filtering to tasks
     filteredTasks() {
       if (this.filterOption === "completed") {
         return this.tasks.filter((task) => task.is_completed);
       }
       if (this.filterOption === "pending") {
         return this.tasks.filter((task) => !task.is_completed);
       }
       return this.tasks; // Default: show all tasks
     },
     // Apply sorting to filtered tasks
     sortedTasks() {
       const tasks = [...this.filteredTasks];
       if (this.sortOption === "newest") {
         return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
       }
       if (this.sortOption === "oldest") {
         return tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
       }
       return tasks; // Default unsorted
     },
     // Paginate the sorted tasks
     paginatedTasks() {
       const start = (this.currentPage - 1) * this.tasksPerPage;
       const end = start + this.tasksPerPage;
       return this.sortedTasks.slice(start, end);
     },
     // Calculate the number of pages
     pageCount() {
       return Math.ceil(this.sortedTasks.length / this.tasksPerPage);
     },
   },
   watch: {
     // Reset to the first page if the sortOption or filterOption changes
     sortOption() {
       this.currentPage = 1;
     },
     filterOption() {
       this.currentPage = 1;
     },
   },
 };
 </script>
 
  
  