<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref } from 'vue'

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
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative p-4">
    <div
      class="p-4 relative group"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <RouterLink
        :to="`/topics/${props.topic.id}/level/${props.level.level}`"
        class="block"
      >
        <div
          class="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 h-auto min-h-[150px] rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-2 text-white">
            {{ isHovered ? props.level.title : `Level ${props.level.level}` }}
          </h2>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
