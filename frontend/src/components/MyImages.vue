<script>
import ImageService from '@/services/ImageService'

export default {
  data: () => ({
    itemsPerPage: 5,
    headers: [
      {
        title: 'Name',
        sortable: false,
        key: 'name'
      },
      { title: 'Description', key: 'description' },
      { title: 'Image', key: 'url' },
      { title: 'CreatedAt', key: 'createdAt' }
    ],
    imageList: [],
    search: '',
    loading: true,
    totalImages: 0
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true

      ImageService.getImages({ search: this.search, page, limit: itemsPerPage }).then(
        ({ items, totalItems }) => {
          this.imageList = items
          this.totalImages = totalItems
          this.loading = false
        }
      )
    },
    addImage() {
      this.$router.push(`/addImage`)
    },
    async copyUrl(imageUrl) {
      await navigator.clipboard.writeText(imageUrl)
    },
    modifyItem(item) {
      console.log('modifyItem', item)
      this.$router.push(`/modifyImage/${item.id}`)
    }
  }
}
</script>

<template>
  <v-banner lines="two" icon="mdi-folder-multiple-image" color="indigo-darken-4" class="my-4">
    <v-banner-text>
      "Welcome to your personal image gallery! This is your creative corner, where you can view
      all the images you've uploaded. Take a stroll down memory lane, revisit your previous
      works, and see how your style has evolved over time."
    </v-banner-text>

    <template v-slot:actions>
      <v-btn prepend-icon="mdi-plus" @click="addImage">Add Image</v-btn>
    </template>
  </v-banner>
  <v-card>
    <v-card-title>
      <br />
      <v-row no-gutters justify="end">
        <v-col cols="6">
          <v-text-field v-model="search" clearable hide-details prepend-inner-icon="mdi-magnify"
            placeholder="Search images" variant="solo" density="comfortable"></v-text-field></v-col>
      </v-row>
    </v-card-title>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
      :items-length="totalImages" :items="imageList" loading-text="Loading... Please wait" :loading="loading"
      class="elevation-1" item-value="name" height="600" @update:options="loadItems">
      <template v-slot:item.url="{ item }">
        <v-row no-gutters justify="start">
          <v-col cols="2">
            <v-avatar color="grey" size="100" rounded="0">
              <v-img cover :src="item.columns.url"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10">
            <p class="text-left pa-3">
              Copy Url .<v-icon icon="mdi-content-copy" @click="copyUrl(item.columns.url)"></v-icon>
            </p>
          </v-col>
        </v-row>
      </template>
    </v-data-table-server>
  </v-card>
</template>
