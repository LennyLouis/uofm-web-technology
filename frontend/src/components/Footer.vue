<script setup>
import { ref } from 'vue';

const links = ref([
        'Home',
        'Image gallery',
        'My Images',
        'Add Image'
      ]);

</script>

<template>
    <v-footer :app="true">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
        <v-divider></v-divider>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Esiea</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>