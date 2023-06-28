<template>
    <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="imageName" label="Enter image name" :rules="imageNameRules"></v-text-field>

            <v-text-field v-model="imageDesc" label="Enter image description" :rules="imageDescRules"></v-text-field>
            
            <v-text-field v-model="imageUrl" label="Enter image URL" :rules="imageUrlRules"></v-text-field>

            <v-btn type="submit" block class="mt-2">ADD</v-btn>
        </v-form>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        imageName: '',
        imageNameRules: [
            value => {
                if (/^[a-zA-Z0-9]+$/.test(value)) return true

                return 'Image name must contain only letters and numbers and not be empty.'
            },
        ],
        imageDesc: '',
        imageDescRules: [
            value => {
                if (/^[a-zA-Z0-9]+$/.test(value)) return true

                return 'Image description must contain only letters and numbers and not be empty.'
            },
        ],
        imageUrl: '',
        imageUrlRules: [
            value => {
                // rule for a valid url 
                if (/^(ftp|http|https):\/\/[^ "]+$/.test(value)) return true

                return 'Image URL must be a valid URL and not be empty.'
            },
        ],
    }),
}
</script>