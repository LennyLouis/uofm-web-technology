<script setup>
import { ref } from 'vue'
import Courses from './Courses.vue'

const colors = ref(['indigo', 'warning', 'red lighten-1', 'deep-purple accent-4'])
const slides = ref([
  'Web Programmning',
  'Python as an engineering tool',
  'Tools for Software development',
  'Algorithmics, computability and complexity theory'
])
</script>

<template>
  <v-banner lines="two" icon="mdi-home" color="indigo-darken-4" class="my-2">
    <v-banner-text> "Welcome to Esiea Web technology Home Page " </v-banner-text>
  </v-banner>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">{{ slide }}</div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <Courses />
</template>
