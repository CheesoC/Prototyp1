<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <section class="bg-blue-100">
    <div
      class="max-w-7xl mx-auto py-1 pb-0 sm:py-2 sm:pb-1 md:py-3 md:pb-2 px-4 sm:px-6 lg:px-8"
    >
      <div class="flex justify-start">
        <button
          @click="goBack"
          class="text-blue-500 hover:text-blue-600 flex items-center font-bold"
        >
          <i class="pi pi-arrow-circle-left mr-3"></i> Back
        </button>
      </div>
    </div>
  </section>
</template>
