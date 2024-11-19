<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  topic: {
    type: Object,
  },
})

const showFullDescription = ref(false)

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed(() => {
  let description = props.topic.description
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...'
  }
  return description
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-3 sm:p-4">
      <div class="mb-4 sm:mb-6">
        <h3 class="text-lg sm:text-xl font-bold">{{ topic.title }}</h3>
      </div>

      <div class="mb-4 sm:mb-5">
        <div>{{ truncatedDescription }}</div>
        <button
          @click="toggleFullDescription"
          class="text-blue-500 hover:text-blue-600 mb-5"
        >
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <div class="border border-gray-100 mb-5"></div>
      <RouterLink
        :to="'/topics/' + topic.id"
        class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
      >
        START
      </RouterLink>
    </div>
  </div>
</template>
