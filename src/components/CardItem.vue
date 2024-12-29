<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref, onMounted } from 'vue'
import { loadProgress } from '@/utils/localStorage'

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
  level: {
    type: Object,
    required: true,
  },
})

const isHovered = ref(false)
const isLevelCompleted = ref(false)
const hoveredTask = ref(null)

onMounted(() => {
  const completedLevels = loadProgress('completedLevels') || {}
  console.log('Completed Levels:', completedLevels) // Debug logging
  isLevelCompleted.value =
    completedLevels[props.topic.id] &&
    completedLevels[props.topic.id].includes(props.level.level.toString())
  console.log(
    `Is Level ${props.level.level} Completed:`,
    isLevelCompleted.value,
  ) // Debug logging
})

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.level.tasks && props.level.tasks.length > 0) {
    const randomIndex = Math.floor(Math.random() * props.level.tasks.length)
    hoveredTask.value = props.level.tasks[randomIndex]
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  hoveredTask.value = null
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative p-2 sm:p-4">
    <div
      class="p-2 sm:p-4 relative group"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <RouterLink
        :to="`/topics/${props.topic.id}/level/${props.level.level}`"
        class="block"
      >
        <div
          :class="[
            'hover:scale-105 h-auto min-h-[100px] sm:min-h-[150px] rounded-lg flex flex-col items-center justify-center text-center cursor-pointer',
            isLevelCompleted
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-800 hover:bg-blue-900',
          ]"
        >
          <h2 class="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-white">
            Level {{ props.level.level }}
          </h2>
          <p class="text-sm sm:text-lg font-semibold text-white">
            {{
              isHovered && hoveredTask ? hoveredTask.problem : props.level.title
            }}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
