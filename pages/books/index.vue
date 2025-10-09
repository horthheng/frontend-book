<template>
  <!-- header-->
   <Headerpage/>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 px-6 md:px-16 py-16"
  >
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-0">
        📚 Our <span class="text-indigo-600">Book Collection</span>
      </h1>
      <button
        @click="openForm('create')"
        class="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-md"
      >
        <span class="material-icons">add</span>
        Create Book
      </button>
    </div>

    <!-- Search -->
    <div class="max-w-2xl mx-auto mb-10">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search books by title or author..."
        class="w-full px-5 py-3 rounded-xl border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

<!-- Book Grid -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  <div
    v-for="book in filteredBooks"
    :key="book.id"
    class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col relative"
  >
    <!-- Book Image -->
    <div class="relative">
      <img
        :src="book.image ? `http://localhost:5000/uploads/${book.image}` : '/default-book.png'"
        alt="Book cover"
        class="w-full h-56 object-cover rounded-xl mb-4"
      />

      <!-- More Icon on Top Right of Image -->
      <button
        @click="book.showMenu = !book.showMenu"
        class="absolute top-2 right-2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow-md transition"
      >
        <span class="material-icons text-gray-700">more_vert</span>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="book.showMenu"
        class="absolute top-10 right-2 w-32 bg-white shadow-lg rounded-lg z-50"
      >
        <button
          @click="openForm('update', book); book.showMenu = false"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
        >
          <span class="material-icons text-sm">edit</span>
          Update
        </button>
        <button
          @click="deleteBook(book.id); book.showMenu = false"
          class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
        >
          <span class="material-icons text-sm">delete</span>
          Delete
        </button>
      </div>
    </div>

    <!-- Title and Author -->
    <h3 class="text-lg font-semibold text-slate-800 mt-2">{{ book.title }}</h3>
    <p class="text-slate-500 text-sm mb-4">
      by {{ book.author?.name || 'Unknown Author' }}
    </p>
  </div>
</div>


    <div v-if="!filteredBooks.length" class="text-center text-slate-500 py-20">
      No books found.
    </div>

    <!-- Modal Form -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 w-full max-w-lg relative">
        <h2 class="text-2xl font-bold mb-6">
          {{ formType === "create" ? "Create Book" : "Update Book" }}
        </h2>
        <form @submit.prevent="submitForm">
          <!-- Title -->
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Title</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <!-- Author Dropdown -->
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Author</label>
            <select
              v-model="formData.authorId"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="" disabled>Select Author</option>
              <option v-for="a in authors" :key="a.id" :value="a.id">
                {{ a.name }}
              </option>
            </select>
          </div>

          <!-- Image Upload -->
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Book Image</label>
            <input type="file" @change="handleImageUpload" class="w-full" />
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="mt-3 w-32 h-32 object-cover rounded-lg"
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {{ formType === "create" ? "Create" : "Update" }}
            </button>
          </div>
        </form>

        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Footer -->
   <Footer/>
</template>

<script setup>
import axios from "axios";

const searchQuery = ref("");
const books = ref([]);
const authors = ref([]);
const showModal = ref(false);
const formType = ref("create");
const formData = ref({ id: null, title: "", authorId: "", image: null });
const imagePreview = ref(null);

// Fetch books
const fetchBooks = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/books");
    books.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Fetch authors
const fetchAuthors = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/authors");
    authors.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Filter books
const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return books.value.filter(
    (b) =>
      b.title?.toLowerCase().includes(q) ||
      b.author?.name?.toLowerCase().includes(q)
  );
});

// Open modal
const openForm = (type, book = null) => {
  formType.value = type;
  if (type === "update" && book) {
    formData.value = {
      id: book.id,
      title: book.title,
      authorId: book.author?.id || "",
      image: null,
    };
    imagePreview.value = book.image || null;
  } else {
    formData.value = { id: null, title: "", authorId: "", image: null };
    imagePreview.value = null;
  }
  showModal.value = true;
};

// Close modal
const closeModal = () => (showModal.value = false);

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  formData.value.image = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Submit form
const submitForm = async () => {
  try {
    const payload = new FormData();
    payload.append("title", formData.value.title);
    payload.append("authorId", String(formData.value.authorId));
    if (formData.value.image) payload.append("image", formData.value.image);

    if (formType.value === "create") {
      await axios.post("http://localhost:5000/api/books", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book created!");
    } else {
      await axios.put(
        `http://localhost:5000/api/books/${formData.value.id}`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Book updated!");
    }

    closeModal();
    fetchBooks();
  } catch (err) {
    console.error("Submit error:", err.response?.data || err);
    alert("Failed to submit form.");
  }
};

// Delete book
const deleteBook = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    books.value = books.value.filter((b) => b.id !== id);
    alert("Book deleted!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete book.");
  }
};

// Init
onMounted(() => {
  fetchBooks();
  fetchAuthors();
});
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
