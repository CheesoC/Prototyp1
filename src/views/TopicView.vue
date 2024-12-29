<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
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
  showDescription: false, // Add this line
})

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://ezmath-data1.onrender.com/topics/${topicId}`,
    )
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
  <div style="padding-top: 5rem">
    <NavbarItem />
    <section v-if="!state.isLoading" class="bg-gray-100 text-black">
      <div
        class="container mx-auto py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-2 sm:p-4 rounded-lg shadow-md text-center md:text-left"
            >
              <div
                class="flex items-center justify-center md:justify-start gap-2"
              >
                <h1 class="text-xl sm:text-2xl font-bold">
                  {{ state.topic.title }}
                </h1>
                <button
                  @click="state.showDescription = !state.showDescription"
                  class="text-blue-800 hover:text-blue-900"
                >
                  <i
                    class="pi"
                    :class="
                      state.showDescription
                        ? 'pi-chevron-up'
                        : 'pi-chevron-down'
                    "
                  ></i>
                </button>
              </div>
              <p v-if="state.showDescription" class="mt-2">
                {{ state.topic.description }}
              </p>
            </div>
          </main>
        </div>
        <!-- Card Items Grid -->
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6"
        >
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
  </div>
</template>
