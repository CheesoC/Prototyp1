<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import TaskItem from '@/components/TaskItem.vue'
import ButtonDraw from '@/components/ButtonDraw.vue'
import ButtonSkip from '@/components/ButtonSkip.vue'
import ButtonSolve from '@/components/ButtonSolve.vue'
import Progressbar from '@/components/ProgressBar.vue'
import DrawTool from '@/components/DrawTool.vue'
import { saveProgress, loadProgress } from '@/utils/localStorage'

const showDrawTool = ref(false)
const progress = ref(0)
const taskItemRef = ref()
const topicId = ref(null)
const levelId = ref(null)

const toggleDrawTool = () => {
  showDrawTool.value = !showDrawTool.value
}

const handleSkip = () => {
  taskItemRef.value.skipTask()
}

function onSolveClick() {
  taskItemRef.value.checkSolution()
}

const updateProgress = value => {
  progress.value += value
  if (progress.value >= 100) {
    markLevelCompleted()
  }
}

const markLevelCompleted = () => {
  const completedLevels = loadProgress('completedLevels') || {}
  if (!completedLevels[topicId.value]) {
    completedLevels[topicId.value] = []
  }
  if (!completedLevels[topicId.value].includes(levelId.value.toString())) {
    completedLevels[topicId.value].push(levelId.value.toString())
    saveProgress('completedLevels', completedLevels)
  }
}

onMounted(() => {
  const route = useRoute()
  topicId.value = route.params.topicId
  levelId.value = route.params.levelId

  const completedLevels = loadProgress('completedLevels') || {}
  if (
    completedLevels[topicId.value] &&
    completedLevels[topicId.value].includes(levelId.value.toString())
  ) {
    // Level is completed, but do not set progress to 100%
  }
})
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <BackButton class="back-button" />
    <Progressbar :progress="progress" />
    <TaskItem ref="taskItemRef" @updateProgress="updateProgress" />
    <DrawTool
      v-if="showDrawTool"
      class="draw-tool absolute inset-0 bottom-[72px]"
    />
    <div class="fixed bottom-0 left-0 right-0 bg-gray-300 shadow-md py-4 z-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <ButtonDraw @toggle-draw-tool="toggleDrawTool" />
        <ButtonSkip @skip="handleSkip" />
        <ButtonSolve @checkSolution="onSolveClick" />
      </div>
    </div>
  </div>
</template>
