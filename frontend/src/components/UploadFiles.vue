<script setup>
import { ref } from 'vue'
import AddImageURL from './AddImageURL.vue'

const tab = ref('imageUrl')

const items = ref([
  { name: 'Image URL', value: 'imageUrl' },
  { name: 'Image', value: 'image' }
])
const text = ref(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
)
</script>

<template>
  <v-banner lines="two" icon="mdi-cloud-upload" color="indigo-darken-4" class="my-4">
    <v-banner-text>
      " Our user-friendly interface allows you to effortlessly select and upload files from your
      computer. It's quick, convenient, and hassle-free."
    </v-banner-text>
  </v-banner>

  <h1 class="font-weight-bold text-center text-h2 text-upload-files">Upload Files</h1>
  <v-tabs v-model="tab" bg-color="transparent" grow>
    <v-tab v-for="item in items" :key="item.name" :value="item.value">
      {{ item.name }}
    </v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item v-for="item in items" :key="item.name" :value="item.value">
      <template v-if="item.value === 'imageUrl'">
        <AddImageURL />
      </template>
      <template v-else-if="item.value === 'image'">
        {{ text }}
      </template>
    </v-window-item>
  </v-window>
</template>

<style>
.text-upload-files {
  color: #00274c !important;
}
</style>
