<script setup>

</script>

<template>
    <div class="v-expansion-panel v-expansion-panel--active">
        <div class="v-expansion-panel__shadow"></div>
        <!-- Some empty elements -->
        <!---->
        <!---->
        <!-- Button representing the panel title -->
        <v-expansion-panel-header class="v-expansion-panel-title v-expansion-panel-title--active">
            <span class="v-expansion-panel-title__overlay"></span>
            <v-row class="v-row--no-gutters align-center spacer">
                <v-col cols="5" md="3" class="hidden-xs-only text-left ms-2">
                    <strong>Web Programming</strong>
                    <!-- Conditional rendering content -->
                </v-col>
                <v-col class="text-medium-emphasis text-truncate hidden-sm-and-down">
                    — Web Technology Community
                </v-col>
            </v-row>
            <span class="v-expansion-panel-title__icon">
                <v-icon class="mdi-chevron-up mdi notranslate v-theme--light v-icon--size-default"></v-icon>
            </span>
        </v-expansion-panel-header>
        <!-- Content within the expansion panel -->
        <v-expansion-panel-content>
            <div class="v-expansion-panel-text" style="">
                <div class="v-expansion-panel-text__wrapper">
                    <v-card-text>
                        <v-item-group class="v-theme--light">
                            <!-- Content and Chapters section -->
                            <div class="text-caption mb-2">
                                <strong>Content and Chapters</strong>
                            </div>
                            <div>1) HTML / CSS (the basics)</div>
                            <div>2) JavaScript learning</div>
                            <div>3) Setting up a server with NodeJS, EJS, and Express</div>
                            <div>4) Introduction to VueJS</div>
                            <div>5) Use of the Vuetify library to create modern user interfaces</div>
                        </v-item-group>
                        <!-- Horizontal divider -->
                        <v-divider class="v-divider v-theme--light my-2" aria-orientation="horizontal"
                            role="separator"></v-divider>
                        <!-- Tools section -->
                        <v-item-group class="v-theme--light">
                            <div class="text-caption mb-2">Tools</div>
                            <v-chip
                                class="v-chip--density-default v-chip--size-default v-chip--variant-tonal text-indigo-darken-4"
                                draggable="false">
                                <div class="v-chip__content">Visual Studio Code</div>
                            </v-chip>
                            <!-- Additional tool chips -->
                        </v-item-group>
                    </v-card-text>
                </div>
            </div>
        </v-expansion-panel-content>
    </div>
</template>