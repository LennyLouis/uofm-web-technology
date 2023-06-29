<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from '@/stores/auth';

const router = useRouter()
const links = ref([
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Image Gallery',
    path: '/imageGallery'
  },
  {
    name: 'MyImages',
    path: '/myImages'
  },
  {
    name: 'Add Image',
    path: '/addImage'
  }
])

const navigate = (routePath) => {
  router.push(`${routePath}`)
}
const auth = useAuthStore()

</script>

<template>
  <div>
    <v-footer app="true">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2 text-none"
          rounded="xl"
          v-if="auth.isLoggedIn"
          @click="navigate(link.path)"
        >
          {{ link.name }}
        </v-btn>
        <v-divider></v-divider>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Esiea- Web Technology</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>
