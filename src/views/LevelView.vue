<script setup>
import { reactive, ref, onMounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import DrawTool from '@/components/DrawTool.vue'
import LevelButtons from '@/components/LevelButtons.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const topicId = route.params.topicId
const levelId = route.params.levelId

const state = reactive({
  level: {},
  isLoading: true,
})

const isDrawToolActive = ref(false)

const toggleDrawTool = () => {
  isDrawToolActive.value = !isDrawToolActive.value
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/topics')
    const topics = response.data
    const topic = topics.find(t => t.id === topicId)
    if (topic) {
      state.level = topic.levels.find(l => l.level === parseInt(levelId))
    }
  } catch (error) {
    console.error('Error fetching level:', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-white">
    <div class="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main class="relative">
          <!-- Added relative positioning -->
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

          <!-- Drawing container -->
          <div class="relative h-full">
            <DrawTool v-if="isDrawToolActive" class="absolute inset-0" />
          </div>

          <LevelButtons @toggle-draw-tool="toggleDrawTool" />
        </main>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader color="#1D4ED8" />
  </div>
</template>
