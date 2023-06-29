<script>
import CourseService from '@/services/CourseService'

export default {
  data() {
    return {
      courses: [],
    }
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await CourseService.getCourses()
        this.courses = response
      } catch (error) {
        console.error('Failed to fetch courses:', error)
        // Handle the error accordingly
      }
    },
  },
  mounted() {
    this.fetchCourses()
  },
}
</script>


<template>
  <div class="text-h4 my-4" align="center">Courses</div>
  <v-divider class="my-2"></v-divider>
  <v-expansion-panels variant="popout" class="pa-4">
    <v-expansion-panel v-for="(course, i) in courses" :key="i" hide-actions>
      <v-expansion-panel-title>
        <v-row align="center" class="spacer" no-gutters>
          <v-col class="hidden-xs-only text-left ms-2" sm="5" md="3">
            <strong v-html="course.name"></strong>
            <span v-if="course.total" class="text-grey"> &nbsp;({{ course.total }}) </span>
          </v-col>

          <v-col v-if="course.description" class="text-medium-emphasis text-truncate hidden-sm-and-down">
            &mdash;
            {{ course.description }}
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-card-text>
          <v-item-group v-if="course.content.length">
            <div class="text-caption mb-2"><strong>Content and Chapters</strong></div>
            <v-item v-for="(chapter, i) in course.content" :key="tool">
              <div>{{ `${i + 1}) ` }} {{ chapter }}</div>
            </v-item>
          </v-item-group>
          <v-divider class="my-2"></v-divider>

          <v-item-group v-if="course.tools.length">
            <div class="text-caption mb-2">Tools</div>
            <v-item v-for="tool in course.tools" :key="tool">
              <v-chip color="indigo-darken-4"> {{ tool }} </v-chip>
            </v-item>
          </v-item-group>
        </v-card-text>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
