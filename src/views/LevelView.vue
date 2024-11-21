<script setup>
import { ref } from 'vue'
import BackButton from '@/components/BackButton.vue'
import TaskItem from '@/components/TaskItem.vue'
import LevelButtons from '@/components/LevelButtons.vue'
import DrawTool from '@/components/DrawTool.vue'

const showDrawTool = ref(false)

const toggleDrawTool = () => {
  showDrawTool.value = !showDrawTool.value
}
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <BackButton class="back-button" />
    <TaskItem />
    <LevelButtons @toggle-draw-tool="toggleDrawTool" class="level-buttons" />
    <DrawTool v-if="showDrawTool" class="draw-tool" />
  </div>
</template>
