<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const route = useRoute()
const topicId = route.params.topicId
const levelId = route.params.levelId

const state = reactive({
  topic: {},
  level: {},
  isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/topics/${topicId}`)
    state.topic = response.data
    state.level = state.topic.levels.find(level => level.level == levelId)
    if (state.level && state.level.tasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * state.level.tasks.length)
      state.task = state.level.tasks[randomIndex]
    }
    console.log('Fetched topic:', state.topic)
    console.log('Fetched level:', state.level)
    console.log('Fetched task:', state.task)
  } catch (error) {
    console.error('Error fetching topic', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="text-center p-4">
      <h1>Level {{ state.level.level }} - {{ state.level.title }}</h1>
    </div>

    <div
      v-if="!state.isLoading"
      class="flex items-center justify-center h-screen mt-[-10%]"
    >
      <p class="text-4xl font-bold">{{ state.task.problem }} =</p>
      <input
        type="text"
        class="ml-4 p-2 border border-gray-300 rounded"
        placeholder="Your answer"
      />
    </div>

    <div v-else class="flex justify-center items-center min-h-[24rem]">
      <PulseLoader color="#1D4ED8" />
    </div>
  </div>
</template>
