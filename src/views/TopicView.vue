<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BackButton from '@/components/BackButton.vue'
import NavbarItem from '@/components/NavbarItem.vue'
import CardItem from '@/components/CardItem.vue'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const topicId = route.params.id

const state = reactive({
  topic: {},
  isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/topics/${topicId}`)
    state.topic = response.data
    console.log('Fetched topic:', state.topic)
  } catch (error) {
    console.error('Error fetching topic', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <NavbarItem />
  <BackButton />
  <section v-if="!state.isLoading" class="bg-blue-100">
    <div class="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <h1 class="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              {{ state.topic.title }}
            </h1>
            <div
              class="text-gray-500 flex align-middle justify-center md:justify-start"
            ></div>
          </div>

          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-4 sm:mt-6">
            <h3 class="text-blue-800 text-lg font-bold mb-4 sm:mb-6">
              Description
            </h3>
            <p class="mb-2 sm:mb-4">{{ state.topic.description }}</p>
          </div>
        </main>
      </div>
      <!-- Card Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CardItem
          v-for="level in state.topic.levels"
          :key="level.level"
          :topic="state.topic"
          :level="level"
        >
          <h2 class="text-2xl font-bold mb-2 text-white">
            Level {{ level.level }}
          </h2>
        </CardItem>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader color="#1D4ED8" />
  </div>
</template>
