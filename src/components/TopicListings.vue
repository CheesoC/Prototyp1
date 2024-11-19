<script setup>
import { RouterLink } from 'vue-router'
import TopicListing from './TopicListing.vue'
import { reactive, defineProps, onMounted } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  topics: [],
  isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get('/api/topics')
    state.topics = response.data
  } catch (error) {
    console.error('Error fetching topics', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="bg-blue-100 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
        BROWSE TOPICS
      </h2>
      <!--Show loading spinner while loading is true-->
      <div v-if="state.isLoading" class="flex justify-center items-center p-4">
        <PulseLoader color="#1D4ED8" />
      </div>
      <!--Show topic listings when loading is false-->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TopicListing
          v-for="topic in state.topics.slice(0, limit || state.topics.length)"
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
