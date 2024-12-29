<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const correctSound = new Audio('/sounds/correct.mp3')
const falseSound = new Audio('/sounds/false.mp3')
const levelCompleteSound = new Audio('/sounds/levelpass.mp3')
const levelFailSound = new Audio('/sounds/levelfail.mp3')

// Solution Checking
const emit = defineEmits(['solutionChecked', 'levelCompleted'])
const userInput = ref('')

const shownTaskIds = ref([])
const completedTaskCount = ref(0)
let mistakes = 0
let skips = 0

// Modified loadRandomTask function
const loadRandomTask = () => {
  if (state.level && state.level.tasks.length > 0) {
    // Filter out already shown tasks using taskId
    let availableTasks = state.level.tasks.filter(
      task => !shownTaskIds.value.includes(task.taskId),
    )
    console.log(availableTasks.length)
    // Reset if all tasks have been shown
    if (completedTaskCount.value >= 5) {
      shownTaskIds.value = []
      availableTasks = state.level.tasks
      emit('levelCompleted')
      router.back()
      setTimeout(() => {
        toast.success('Level complete! Great job!')
        setTimeout(() => {
          levelCompleteSound.play()
        }, 200)
      }, 300)
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
  skips++
  if (skips > 2) {
    toast.error('No more skips left!')
    setTimeout(() => {
      falseSound.play()
    }, 200)
  } else {
    loadRandomTask()
  }
}

const checkSolution = () => {
  let cleanedInput = userInput.value.trim()
  cleanedInput = parseFloat(cleanedInput).toString() // Convert to number and back to string to remove trailing zeros
  const isCorrect = cleanedInput === state.task.solution
  emit('solutionChecked', isCorrect)
  if (isCorrect) {
    emit('updateProgress', 20) // Emit event to update progress
    completedTaskCount.value++
    if (completedTaskCount.value < 5) {
      toast.success('Correct! Well done!')
      setTimeout(() => {
        correctSound.play()
      }, 200)
    }
    loadRandomTask()
  } else {
    mistakes++
    if (mistakes > 2) {
      router.back()
      setTimeout(() => {
        toast.error('Too many mistakes! Try again.')
        setTimeout(() => {
          levelFailSound.play()
        }, 200)
      }, 300)
    } else {
      toast.error('Incorrect, try again.')
      setTimeout(() => {
        falseSound.play()
      }, 200)
    }
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
    const response = await axios.get(
      `https://ezmath-data1.onrender.com/topics/${topicId}`,
    )
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
  <div class="text-black min-h-screen flex flex-col">
    <div v-if="!state.isLoading">
      <div class="text-center p-4">
        <h1
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold"
        >
          Level {{ state.level.level }} - {{ state.level.title }}
        </h1>
      </div>

      <div class="flex items-center justify-center fixed inset-0">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
        >
          {{ state.task.problem }} =
        </h1>
        <!--Solution Input -->
        <input
          v-model="userInput"
          type="text"
          inputmode="decimal"
          class="dark:text-black ml-2 sm:ml-3 md:ml-4 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-3 border border-gray-300 rounded"
        />
      </div>
    </div>

    <div v-else class="flex justify-center items-center min-h-[24rem]">
      <PulseLoader color="#1D4ED8" />
    </div>
  </div>
</template>
