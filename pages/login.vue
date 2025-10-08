<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/bg-login.png')"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Login Box -->
    <div
      class="relative z-10 w-full max-w-sm bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center -mt-20 mb-6">
        <div class="bg-gray-300 p-4 rounded-full border border-white/40 shadow-md">
          <img src="/logo.png" alt="Logo" class="w-16 h-16 object-contain rounded-full" />
        </div>
      </div>

      <h2 class="text-center text-white text-2xl font-semibold mb-8">
        Login
      </h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <!-- Remember + Forgot -->
        <div class="flex items-center justify-between text-sm text-gray-200">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              class="form-checkbox text-green-400 focus:ring-green-400"
            />
            <span>Remember me</span>
          </label>
          <a href="#" class="hover:underline">Forgot Password?</a>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-green-800/80 hover:bg-green-700 text-white py-2 rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-md"
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios, { type AxiosError } from 'axios'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // Use Axios instance directly
    const response = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Login Response:', response.data)
    alert('Login successful!')
  } catch (err: any) {
    console.error('Login Error:', err)
    alert('Login failed: ' + (err.response?.data?.message || err.message))
  }
}
</script>

<style scoped>
input::placeholder {
  color: rgba(255, 255, 255, 0.75);
}
</style>
