<template>
  <footer class="bg-slate-900 text-slate-300 py-10 mt-20">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <!-- Brand -->
      <div>
        <h3 class="text-white text-2xl font-bold mb-3">Book Management</h3>
        <p class="text-slate-400">
          Simplify how you organize, track, and discover your favorite books and authors.
        </p>
      </div>

      <!-- Links -->
      <div>
        <h4 class="text-white font-semibold mb-3">Quick Links</h4>
        <ul class="space-y-2">
          <li><NuxtLink to="/" class="hover:text-indigo-400">Home</NuxtLink></li>
          <li><NuxtLink to="/books" class="hover:text-indigo-400">Books</NuxtLink></li>
          <li><NuxtLink to="/authors" class="hover:text-indigo-400">Authors</NuxtLink></li>
          <li><NuxtLink to="/login" class="hover:text-indigo-400">Login</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-semibold mb-3">Contact</h4>
        <ul class="space-y-2 text-slate-400">
          <li>Email: support@bookapp.com</li>
          <li>Phone: +855 123 456 789</li>
          <li>Phnom Penh, Cambodia</li>
        </ul>
      </div>
    </div>

    <div class="text-center text-slate-500 mt-10 border-t border-slate-800 pt-4 text-sm">
      © 2025 Book Management — All rights reserved.
    </div>
  </footer>
</template>

<script setup>
// Empty — purely presentational
</script>
