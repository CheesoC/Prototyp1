<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import logo from '@/assets/img/logo.png'
import { ref, computed, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const isDarkMode = ref(false)
const isMenuOpen = ref(false)

const goBack = () => {
  router.back()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const isActiveLink = routePath => {
  return route.path === routePath
}

const isHomePage = computed(() => {
  return route.path === '/'
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <nav class="transition-all duration-300 bg-gray-100 border-b border-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex h-auto min-h-[5rem] items-center justify-between"
      >
        <!-- Logo Section -->
        <div class="flex items-center space-x-4">
          <button
            v-if="!isHomePage"
            @click="goBack"
            class="text-blue-800 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-md flex items-center"
          >
            <i class="pi pi-arrow-circle-left mr-2"></i>
          </button>

          <RouterLink class="flex flex-shrink-0 items-center space-x-2" to="/">
            <img class="h-8 sm:h-10 w-auto" :src="logo" alt="Ez Math Logo" />
            <span
              class="hidden sm:block text-blue-800 text-xl sm:text-2xl font-bold"
              >EZ Math</span
            >
          </RouterLink>

          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleDarkMode"
            class="text-blue-800 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-md"
          >
            <i class="pi pi-sun"></i>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-blue-800 hover:bg-gray-300 p-2 rounded-md"
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
                isActiveLink(link.to) ? 'bg-gray-300' : '',
                'hover:bg-gray-300 dark:hover:bg-gray-600',
                'hover:text-black dark:hover:text-white',
                'text-blue-800',
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
          class="md:hidden absolute top-full z-50 left-55 right-0 bg-white shadow-lg rounded-b-lg"
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
                isActiveLink(link.to) ? 'bg-gray-300' : '',
                'hover:bg-gray-300',
                'hover:text-white',
                'text-blue-800',
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
