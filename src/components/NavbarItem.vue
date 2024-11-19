<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/logo.png'
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const isActiveLink = routePath => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="bg-blue-700 border-b border-blue-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex h-auto min-h-[5rem] items-center justify-between"
      >
        <!-- Logo Section -->
        <RouterLink class="flex flex-shrink-0 items-center space-x-2" to="/">
          <img class="h-8 sm:h-10 w-auto" :src="logo" alt="Ez Math Logo" />
          <span class="hidden sm:block text-white text-xl sm:text-2xl font-bold"
            >Ez Math</span
          >
        </RouterLink>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-white hover:bg-blue-900 p-2 rounded-md"
          >
            <i
              :class="['pi', isMenuOpen ? 'pi-times' : 'pi-bars', 'text-2xl']"
            ></i>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:ml-auto">
          <div class="flex space-x-2">
            <RouterLink
              v-for="(link, index) in [
                { to: '/', text: 'HOME' },
                { to: '/topics', text: 'TOPICS' },
                { to: '/progress', text: 'PROGRESS' },
                { to: '/about', text: 'ABOUT' },
              ]"
              :key="index"
              :to="link.to"
              :class="[
                isActiveLink(link.to) ? 'bg-blue-900' : '',
                'hover:bg-blue-900',
                'hover:text-white',
                'text-white',
                'px-3',
                'py-2',
                'rounded-md',
                'font-bold',
              ]"
            >
              {{ link.text }}
            </RouterLink>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          v-show="isMenuOpen"
          class="md:hidden absolute top-full z-50 left-55 right-0 bg-blue-700 shadow-lg rounded-b-lg"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <RouterLink
              v-for="(link, index) in [
                { to: '/', text: 'HOME' },
                { to: '/topics', text: 'TOPICS' },
                { to: '/progress', text: 'PROGRESS' },
                { to: '/about', text: 'ABOUT' },
              ]"
              :key="index"
              :to="link.to"
              :class="[
                isActiveLink(link.to) ? 'bg-blue-900' : '',
                'hover:bg-blue-900',
                'hover:text-white',
                'text-white',
                'px-3',
                'py-2',
                'rounded-md',
                'font-bold',
                'block',
                'text-center',
              ]"
              @click="isMenuOpen = false"
            >
              {{ link.text }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
