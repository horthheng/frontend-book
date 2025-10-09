<template>
  <header
    class="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" class="w-10 h-10 rounded-full" />
      <h1 class="text-2xl font-semibold text-blue-700">Book Management</h1>
    </div>

    <!-- Navigation -->
    <nav class="flex gap-6 text-gray-700 font-medium">
      <NuxtLink
        to="/"
        class="hover:text-blue-600 transition"
        exact-active-class="text-blue-600 font-semibold"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/books"
        class="hover:text-blue-600 transition"
        exact-active-class="text-blue-600 font-semibold"
      >
        Books
      </NuxtLink>
      <NuxtLink
        to="/author"
        class="hover:text-blue-600 transition"
        exact-active-class="text-blue-600 font-semibold"
      >
        Authors
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
// No logic needed for now — this component is purely presentational
</script>

<style scoped>
/* Optional styling for active link animations */
a {
  transition: color 0.2s ease;
}
</style>
