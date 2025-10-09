<template>
  <!-- Header -->
  <headerpage />

  <!-- Main Content -->
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Title and Add Button -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Authors</h1>
        <button
          @click="openAddModal"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Author
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

      <!-- Authors Grid -->
      <div
        v-else
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <div
          v-for="author in authors"
          :key="author.id"
          class="relative bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
        >
          <!-- Manage buttons -->
          <div class="absolute top-3 right-3 flex gap-2">
            <button
              @click="openEditModal(author)"
              class="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <i class="ri-edit-2-line text-lg"></i>
            </button>
            <button
              @click="deleteAuthor(author.id)"
              class="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <i class="ri-delete-bin-6-line text-lg"></i>
            </button>
          </div>

          <img
            :src="author.image || '/default-avatar.png'"
            alt="Author image"
            class="w-24 h-24 rounded-full object-cover mb-4 border"
          />
          <h2 class="text-lg font-semibold text-gray-800">{{ author.name }}</h2>
          <p class="text-gray-500 text-sm mt-1">
            {{ author.bio || 'No bio available' }}
          </p>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 relative"
    >
      <h2 class="text-xl font-semibold mb-2">
        {{ isEditing ? 'Edit Author' : 'Add Author' }}
      </h2>

      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      <form @submit.prevent="saveAuthor" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Author name"
          required
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          v-model="form.image"
          type="text"
          placeholder="Image URL (optional)"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          v-model="form.bio"
          rows="3"
          placeholder="Author bio"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {{ isEditing ? 'Update' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</template>

<script setup>
import axios from 'axios'

// State
const authors = ref([])
const loading = ref(true)
const error = ref(null)

// Modal state
const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, name: '', bio: '', image: '' })

// Fetch all authors
const fetchAuthors = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:5000/api/authors')
    authors.value = res.data
  } catch (err) {
    console.error('Fetch failed:', err)
    error.value = 'Failed to load authors.'
  } finally {
    loading.value = false
  }
}

// Add new author
const addAuthor = async () => {
  await axios.post('http://localhost:5000/api/authors', form.value)
  await fetchAuthors()
  closeModal()
}


// Initialize data
onMounted(fetchAuthors)
</script>
