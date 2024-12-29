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
  <section class="bg-gray-100 text-black py-8 sm:py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-blue-800 mb-6 text-center">
        PROGRESS
      </h2>
      <div
        v-if="state.isLoading"
        class="flex justify-center items-center min-h-[24rem]"
      >
        <PulseLoader color="#1D4ED8" />
      </div>
      <div v-else>
        <div v-for="topic in state.topics" :key="topic.id" class="mb-6">
          <h2 class="text-2xl font-bold mb-4">{{ topic.title }}</h2>
          <div class="text-white grid grid-cols-5 gap-2">
            <RouterLink
              v-for="level in topic.levels"
              :key="level.level"
              :to="`/topics/${topic.id}/level/${level.level}`"
              class="block"
            >
              <div
                :class="[
                  'p-1 rounded-lg text-center flex flex-col justify-center items-center cursor-pointer border border-black dark:border-white',
                  isLevelCompleted(topic.id, level.level)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-800 hover:bg-blue-900',
                ]"
                :style="{ fontSize: '0.75rem', padding: '0.5rem' }"
                @click="goToLevel(topic.id, level.level)"
              >
                <h3 class="text-sm font-bold">Level {{ level.level }}</h3>
                <p class="hidden sm:block">{{ level.title }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
