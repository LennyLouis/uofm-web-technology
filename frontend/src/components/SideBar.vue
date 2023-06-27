<script setup>
import { useRoute } from 'vue-router'

const router = useRoute()
const navigate = (routePath) => {
    router.push(`/${routePath}`)
} 
</script>

<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" @click="navigate('')" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-folder-multiple-image" title="My Images" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-image-plus-outline" title="Add Image" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-image" title="Image Gallery" @click="navigate('imageGallery')" value="starred"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
