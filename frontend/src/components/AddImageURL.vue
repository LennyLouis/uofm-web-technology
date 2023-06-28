<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageService from '@/services/ImageService'

const nameRules = [(v) => !/^\s*$/.test(v) || 'Image Name is required']

const urlRules = [(v) => !/^\s*$/.test(v) || 'Image URL is required']

const router = useRouter()

const loading = ref(false)
const name = ref('')
const url = ref('')
const description = ref('')

const form = ref(null)

const addImage = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true
    const { success, error } = await ImageService.addImage({
      name: name.value,
      url: url.value,
      description: description.value
    })
    if (!success) {
      alert(error)
      loading.value = false
    } else {
      router.push('/myImages')
    }
  }
}
const navigateToMyImages = () => {
  router.push(`/myImages`)
}
</script>

<template>
  <v-banner lines="two" icon="mdi-image-plus-outline" color="indigo-darken-4" class="my-4">
    <v-banner-text>
      " Our user-friendly interface allows you to effortlessly upload image url . It's quick,
      convenient, and hassle-free."
    </v-banner-text>

    <template v-slot:actions>
      <v-btn @click="navigateToMyImages">Go to My Images</v-btn>
    </template>
  </v-banner>
  <div class="flex-card">
    <v-card class="mx-auto" title="Add Image" max-width="700">
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="name"
            label="Enter image name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field v-model="description" label="Enter image description"></v-text-field>
          <v-text-field
            v-model="url"
            label="Enter image url"
            :rules="urlRules"
            required
          ></v-text-field>
          <v-btn
            color="indigo"
            :loading="loading"
            @click="addImage"
            block
            class="mt-4"
            text="Add"
          ></v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
