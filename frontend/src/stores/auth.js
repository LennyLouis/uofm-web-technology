import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const count = ref(0)
  const isLoggedIn = ref(false)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function setIsLoggedIn(value) {
    isLoggedIn.value =value;
  }

  return { count, doubleCount, increment, isLoggedIn, setIsLoggedIn }
})
