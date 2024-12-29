<script setup>
import { RouterLink } from 'vue-router'
import TopicListing from './TopicListing.vue'
import { reactive, defineProps, onMounted, ref, computed } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
  showSearchBar: {
    type: Boolean,
    default: true,
  },
})

const state = reactive({
  topics: [],
  isLoading: true,
})

const searchQuery = ref('')

const filteredTopics = computed(() => {
  if (!searchQuery.value) {
    return state.topics
  }
  return state.topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(async () => {
  try {
    const response = await axios.get('https://ezmath-data1.onrender.com/topics')
    state.topics = response.data
  } catch (error) {
    console.error('Error fetching topics', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="bg-gray-100 border-b border-gray-900 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-800 mb-6 text-center">
        BROWSE TOPICS
      </h2>
      <!-- Search Input -->
      <div v-if="showSearchBar" class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a topic..."
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="flex justify-center items-center p-4">
        <PulseLoader color="#1D4ED8" />
      </div>
      <!-- Show message if no topics match the search query -->
      <div
        v-else-if="filteredTopics.length === 0"
        class="text-center text-gray-500"
      >
        Sorry, "{{ searchQuery }}" does not match any topics &#128577;
      </div>
      <!-- Show topic listings when loading is false -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TopicListing
          v-for="topic in filteredTopics.slice(
            0,
            limit || filteredTopics.length,
          )"
          :key="topic.id"
          :topic="topic"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/topics"
      class="block bg-black text-white font-bold text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >VIEW ALL TOPICS</RouterLink
    >
  </section>
</template>
