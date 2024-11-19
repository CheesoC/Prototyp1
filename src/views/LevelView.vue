<script setup>
import { reactive, onMounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const topicId = route.params.topicId
const levelId = route.params.levelId

const state = reactive({
  level: {},
  isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/topics/${topicId}/level/${levelId}`)
    state.level = response.data
  } catch (error) {
    console.error('Error fetching level:', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-blue-100">
    <div class="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <h1 class="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              {{ state.level.title }}
            </h1>
            <div
              class="text-gray-500 flex align-middle justify-center md:justify-start"
            ></div>
          </div>

          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-4 sm:mt-6">
            <h3 class="text-blue-800 text-lg font-bold mb-4 sm:mb-6">
              Description
            </h3>
            <p class="mb-2 sm:mb-4">{{ state.level.description }}</p>
          </div>
        </main>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader color="#1D4ED8" />
  </div>
</template>
