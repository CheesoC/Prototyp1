<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BackButton from '@/components/BackButton.vue'
import NavbarItem from '@/components/NavbarItem.vue'
import CardItem from '@/components/CardItem.vue'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const taskId = route.params.id

const state = reactive({
  task: {},
  isLoading: true,
})

/* Code für Abfrage innerhalb von Aufgabe - später wichtig
onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('Sind Sie sicher, dass Sie zurückgehen möchten? Ihr Fortschritt geht verloren.')
  if (answer) {
    next()
  } else {
    next(false)
  }
})
  */

onMounted(async () => {
  try {
    const response = await axios.get(`/api/tasks/${taskId}`)
    state.task = response.data
  } catch (error) {
    console.error('Error fetching task', error)
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
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <h1 class="text-3xl font-bold mb-4">{{ state.task.title }}</h1>
            <div
              class="text-gray-500 flex align-middle justify-center md:justify-start"
            ></div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-blue-800 text-lg font-bold mb-6">Description</h3>

            <p class="mb-4">
              {{ state.task.description }}
            </p>
          </div>
        </main>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader color="#1D4ED8" />
  </div>

  <CardItem />
</template>
