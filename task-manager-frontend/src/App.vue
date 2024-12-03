<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center p-8">
    <div class="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Task Manager</h1>

      <!-- Show Login Form if not logged in -->
      <div v-if="!isLoggedIn">
        <LoginForm @login-success="handleLoginSuccess" :error="error" />
      </div>

      <!-- Show Task Management if logged in -->
      <div v-else>
        <button
          @click="logout"
          class="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <!-- Sort Tasks -->
        <SortTasks @sort-tasks="sortTasks" />

        <!-- Filter Tasks -->
        <FilterTasks @filter-tasks="filterTasks" />

        <!-- Task Form -->
        <TaskForm :newTask="newTask" @create-task="createTask" />

        <!-- Task List -->
        <TaskList
          :tasks="tasks"
          :loading="loading"
          :error="error"
          :sortOption="sortOption"
          :filterOption="filterOption"
          @toggle-completion="toggleCompletion"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <EditModal
      v-if="editingTask"
      :editingTask="editingTask"
      @update-task="updateTask"
      @cancel-edit="cancelEdit"
    />
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import TaskList from "./components/TaskList.vue";
import TaskForm from "./components/TaskForm.vue";
import EditModal from "./components/EditModal.vue";
import SortTasks from "./components/SortTasks.vue";
import FilterTasks from "./components/FilterTasks.vue";
import axios from "axios";

export default {
  components: { LoginForm, TaskList, TaskForm, EditModal, SortTasks, FilterTasks },
  data() {
    return {
      tasks: [],
      loading: true,
      error: null,
      newTask: { title: "", description: "" },
      editingTask: null,
      sortOption: "oldest", // Default sorting option
      filterOption: "both", // Default filter option
      isLoggedIn:!!localStorage.getItem("auth_token"),
    };
  },

  async mounted() {
    if (this.isLoggedIn) {
      await this.checkAuthStatus();
    }
  },
  methods: {
    async handleLoginSuccess(token) {
    console.log("Login successful, token received:", token); // Debugging log
    localStorage.setItem("auth_token", token); // Store token
    this.isLoggedIn = true; // Update reactive state
    await this.checkAuthStatus(); // Revalidate and fetch tasks
}
,
    // Check if the user is authenticated
    async checkAuthStatus() {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        });
        console.log("Authenticated user:", response.data); // Debugging log
        await this.fetchTasks(); // Fetch tasks upon successful authentication
      } catch (err) {
        console.error("Failed to validate token:", err.message);
        localStorage.removeItem("auth_token");
      }
    },
    // Logout the user
    async logout() {
  try {
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      }
    );
    localStorage.removeItem("auth_token");
    this.isLoggedIn = false; // Update reactive state
    this.tasks = [];
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
}
,
    // Fetch tasks from the backend
    async fetchTasks() {
      try {
        this.loading = true;
        const response = await axios.get("http://localhost:8000/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        });
        this.tasks = response.data.data || [];
      } catch (err) {
        this.error = `Error fetching tasks: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    sortTasks(option) {
      this.sortOption = option;
    },
    filterTasks(option) {
      this.filterOption = option;
    },
    async createTask(newTask) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/tasks",
          newTask,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        this.tasks.push(response.data);
        this.newTask = { title: "", description: "" };
      } catch (err) {
        this.error = `Error creating task: ${err.message}`;
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (err) {
        this.error = `Error deleting task: ${err.message}`;
      }
    },
    async toggleCompletion(task) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/tasks/${task.id}`,
          { is_completed: !task.is_completed },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        task.is_completed = response.data.is_completed;
      } catch (err) {
        this.error = `Error toggling task completion: ${err.message}`;
      }
    },
    editTask(task) {
      this.editingTask = { ...task };
    },
    async updateTask(updatedTask) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/tasks/${updatedTask.id}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        const task = response.data;
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) this.tasks[index] = task;
        this.editingTask = null;
      } catch (err) {
        this.error = `Error updating task: ${err.message}`;
      }
    },
    cancelEdit() {
      this.editingTask = null;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f7f7f7;
}
</style>
