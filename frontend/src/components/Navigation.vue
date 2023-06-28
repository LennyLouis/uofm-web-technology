<template>
    <v-navigation-drawer
        expand-on-hover
        rail
    >
        <v-list>
        <v-list-item
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-folder-multiple-image" title="My Images" value="myImages"></v-list-item>
        <v-list-item prepend-icon="mdi-image-plus-outline" title="Add Image" value="addImage"></v-list-item>
        <v-list-item prepend-icon="mdi-image" title="Image Gallery" value="imageGallery"></v-list-item>
        </v-list>
    </v-navigation-drawer>
  </template>