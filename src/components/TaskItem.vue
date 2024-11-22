<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

// Solution Checking
const emit = defineEmits(['solutionChecked'])
const userInput = ref('')

const shownTaskIds = ref([])
const completedTaskCount = ref(0)

// Modified loadRandomTask function
const loadRandomTask = () => {
  if (state.level && state.level.tasks.length > 0) {
    // Filter out already shown tasks using taskId
    let availableTasks = state.level.tasks.filter(
      task => !shownTaskIds.value.includes(task.taskId),
    )

    // Reset if all tasks have been shown
    if (availableTasks.length === 0 || completedTaskCount.value >= 5) {
      shownTaskIds.value = []
      availableTasks = state.level.tasks
      //alert('You have completed all tasks!') // Alert when all tasks are completed
    }

    // Pick random task from available ones
    const randomIndex = Math.floor(Math.random() * availableTasks.length)
    state.task = availableTasks[randomIndex]
    shownTaskIds.value.push(state.task.taskId) // Use taskId here
    userInput.value = ''

    console.log('Shown tasks:', shownTaskIds.value) // Debug logging
  }
}

const skipTask = () => {
  loadRandomTask()
}

const checkSolution = () => {
  const cleanedInput = userInput.value.trim()
  const isCorrect = cleanedInput === state.task.solution
  console.log('Task solution:', state.task.solution)
  console.log('User input:', userInput.value)
  console.log('Checking solution:', isCorrect)
  emit('solutionChecked', isCorrect)

  if (isCorrect) {
    emit('updateProgress', 20) // Emit event to update progress
    completedTaskCount.value++
    //alert('Correct! Well done!')
    setTimeout(() => {
      loadRandomTask()
    }, 10) // Wait for alert to close
  } else {
    alert('Wrong answer, try again!')
  }
}

defineExpose({ checkSolution, skipTask })

// Fetching Topic and Level
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
    loadRandomTask() // Initial task load
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
      <h1
        class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold"
      >
        Level {{ state.level.level }} - {{ state.level.title }}
      </h1>
    </div>

    <div
      v-if="!state.isLoading"
      class="flex items-center justify-center min-h-screen fixed inset-0"
    >
      <h1
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
      >
        {{ state.task.problem }} =
      </h1>
      <!--Solution Input -->
      <input
        v-model="userInput"
        type="text"
        class="ml-2 sm:ml-3 md:ml-4 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-3 border border-gray-300 rounded"
      />
    </div>

    <div v-else class="flex justify-center items-center min-h-[24rem]">
      <PulseLoader color="#1D4ED8" />
    </div>
  </div>
</template>
