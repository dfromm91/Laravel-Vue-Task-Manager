<template>
  <div class="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="Enter your email"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Enter your password"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { login } from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null; // Clear previous errors
        const response = await login({
          email: this.email,
          password: this.password,
        });
        console.log("LoginForm emitting token:", response.access_token); // Debug log
        this.$emit("login-success", response.access_token); // Emit token to parent
      } catch (err) {
        this.error =
          err.response?.data?.message || "Login failed. Please check your credentials.";
      }
    },
  },
};
</script>
