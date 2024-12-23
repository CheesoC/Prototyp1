<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { loadProgress } from '@/utils/localStorage'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import NavbarItem from '@/components/NavbarItem.vue'

const state = reactive({
  topics: [],
  isLoading: true,
})

const completedLevels = loadProgress('completedLevels') || {}

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

const isLevelCompleted = (topicId, levelId) => {
  return (
    completedLevels[topicId] &&
    completedLevels[topicId].includes(levelId.toString())
  )
}
</script>

<template>
  <NavbarItem />
  <section class="bg-gray-100 py-8 sm:py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">
        Progress
      </h1>
      <div
        v-if="state.isLoading"
        class="flex justify-center items-center min-h-[24rem]"
      >
        <PulseLoader color="#1D4ED8" />
      </div>
      <div v-else>
        <div v-for="topic in state.topics" :key="topic.id" class="mb-6">
          <h2 class="text-2xl font-bold mb-4">{{ topic.title }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="level in topic.levels"
              :key="level.level"
              :class="[
                'p-4 rounded-lg text-center',
                isLevelCompleted(topic.id, level.level)
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white',
              ]"
            >
              <h3 class="text-xl font-bold">Level {{ level.level }}</h3>
              <p>{{ level.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
