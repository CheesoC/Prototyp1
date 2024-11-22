<script setup>
import { ref } from 'vue'
import BackButton from '@/components/BackButton.vue'
import TaskItem from '@/components/TaskItem.vue'
import ButtonDraw from '@/components/ButtonDraw.vue'
import ButtonSkip from '@/components/ButtonSkip.vue'
import ButtonSolve from '@/components/ButtonSolve.vue'
import Progressbar from '@/components/ProgressBar.vue'
import DrawTool from '@/components/DrawTool.vue'

const showDrawTool = ref(false)

const toggleDrawTool = () => {
  showDrawTool.value = !showDrawTool.value
}

const taskItemRef = ref()

const handleSkip = () => {
  taskItemRef.value.skipTask() // Changed from skip() to skipTask()
}

function onSolveClick() {
  taskItemRef.value.checkSolution()
}
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <BackButton class="back-button" />
    <Progressbar />
    <TaskItem ref="taskItemRef" />
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
