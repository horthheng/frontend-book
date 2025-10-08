<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/bg-login.png')"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Register Box -->
    <div
      class="relative z-10 w-full max-w-sm bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center -mt-20 mb-6">
        <div class="bg-gray-300 p-4 rounded-full border border-white/40 shadow-md">
          <img src="/logo.png" alt="Logo" class="w-16 h-16 object-contain rounded-full" />
        </div>
      </div>

      <h2 class="text-center text-white text-2xl font-semibold mb-6">Register</h2>

      <!-- Error Message -->
      <p v-if="error" class="text-red-400 text-sm mb-4 text-center">{{ error }}</p>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-800/80 hover:bg-green-700 text-white py-2 rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-md disabled:opacity-50"
        >
          {{ loading ? 'Registering...' : 'REGISTER' }}
        </button>
      </form>

      <!-- Link to Login -->
      <p class="mt-4 text-center text-white text-sm">
        Already have an account?
        <a href="/login" class="underline hover:text-green-400">Login</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

const handleRegister = async () => {
  error.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    return
  }

  loading.value = true
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    console.log('Register Response:', response.data)
    router.push('/')
  } catch (err: any) {
    console.error('Register Error:', err)
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>
