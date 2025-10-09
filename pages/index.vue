<template>
  <!-- Header -->
  <Headerpage />

  <!-- Hero Section -->
  <section
    class="bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10"
  >
    <!-- Left Text -->
    <div class="max-w-xl space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Organize Your <span class="text-indigo-600">Books</span> Like Never Before
      </h1>
      <p class="text-gray-600 text-lg leading-relaxed">
        Track your favorite authors, manage your reading list, and discover new titles — all
        in one intuitive and easy-to-use platform built for book lovers.
      </p>

      <div class="flex gap-4 pt-4">
        <NuxtLink
          to="/books"
          class="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md"
        >
          📚 Explore Books
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition"
        >
          🚀 Get Started
        </NuxtLink>
      </div>
    </div>

    <!-- Right Image -->
    <img
      src="/book-home.png"
      alt="Books"
      class="w-full md:w-[420px] rounded-2xl shadow-2xl"
    />
  </section>

  <!-- Features Section -->
  <section class="py-24 bg-white px-6 md:px-16 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
      Why Choose <span class="text-indigo-600">Book Management</span>?
    </h2>

    <div class="grid md:grid-cols-3 gap-10">
      <div
        class="bg-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
      >
        <div class="text-indigo-600 text-4xl mb-4">📖</div>
        <h3 class="font-semibold text-lg mb-2">Easy Book Tracking</h3>
        <p class="text-gray-600">
          Quickly add, view, and update books in your library with a few clicks.
        </p>
      </div>

      <div
        class="bg-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
      >
        <div class="text-indigo-600 text-4xl mb-4">👨‍💻</div>
        <h3 class="font-semibold text-lg mb-2">Author Management</h3>
        <p class="text-gray-600">
          Keep your authors organized with linked book information and profiles.
        </p>
      </div>

      <div
        class="bg-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
      >
        <div class="text-indigo-600 text-4xl mb-4">⚡</div>
        <h3 class="font-semibold text-lg mb-2">Fast & Secure</h3>
        <p class="text-gray-600">
          Enjoy a smooth and secure experience with JWT authentication and modern APIs.
        </p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section
    class="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-20 px-6 md:px-16"
  >
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Take Control of Your Books?
    </h2>
    <p class="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
      Start organizing your reading collection today — it’s free, fast, and simple to get
      started.
    </p>
    <NuxtLink
      to="/register"
      class="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-100 transition"
    >
      Get Started Now
    </NuxtLink>
  </section>

  <!-- Footer -->
  <Footer />
</template>

<script setup>
// Nothing special yet — uses Headerpage & Footer components
</script>

<style scoped>
section {
  animation: fadeIn 0.8s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
