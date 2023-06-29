<script>
export default {
    data: () => ({
        nbOfImages: '10',
        grayScaleBool: '',
    }),
}
</script>

<template>
    <v-row>
        <v-responsive class="mx-auto" max-width="344">
            <v-text-field v-model="nbOfImages" clearable hide-details="auto" label="Number of images"></v-text-field>
        </v-responsive>
        <v-switch v-model="grayScaleBool" class="ml-6" label="Gray Scale"></v-switch>
    </v-row>

    <v-card class="mx-5 my-2 pa-3">
        <v-row>
            <v-col v-for="n in parseInt(nbOfImages)" :key="n" class="d-flex child-flex" cols="3">
                <v-card>
                    <v-img :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`" aspect-ratio="1" cover
                        :class="{ grayscale: grayScaleBool }" class="bg-grey-lighten-2">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <v-card-title>
                        Image URL :
                    </v-card-title>

                    <v-card-subtitle>
                        https://picsum.photos/500/300?image={{ n * 5 + 10 }}
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.grayscale {
    filter: grayscale(100%);
}
</style>