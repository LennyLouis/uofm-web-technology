<script>
export default {
  data: () => ({
    courses: [
      {
        name: 'Web Programmning',
        programs: ['Engineering Degree', 'English Taught Program'],
        excerpt: 'Web Technology Community',
        learningOutcomes: [
          'Develop the frontend and backend part of a website using modern frameworks'
        ],
        contentAndChapters: [
          'HTML / CSS (the basics)',
          'JavaScript learning',
          'Setting up a server with NodeJS, EJS and Express',
          'Introduction to VueJS',
          'Use of the Vuetify library to create a modern user interfaces'
        ],
        tools: ['Visual Studio Code', 'VueJS', 'NodeJS', 'MongoDB'],
        prerequisities: []
      },
      {
        name: 'Python as an engineering tool',
        programs: ['Engineering Degree', 'English Taught Program'],
        excerpt: 'Python Community',
        learningOutcomes: [
          'Reach an intermediate level of mastery of the Python language (conditional structures, loops, lists, functions, poo, use of libraries)',
          'Develop production engineering or scientific applications in Python'
        ],
        contentAndChapters: [
          'Integrated course on the Python language: syntax and particularities',
          'Introduction to Numpy, Pandas, Matplotlib and Tkinter modules.',
          'Activity on plagiarism detection: reading files, stylistic comparison of texts and display of results.',
          'Activity on inventory management and sales forecasts: reading data, forecasting via the seasonality method and displaying curves.',
          'Activity on the scheduling of tasks in a workshop: implementation of Johnson and heuristics.'
        ],
        tools: [],
        prerequisities: ['Mastery of algorithms']
      },
      {
        name: 'Tools for Software development',
        programs: ['Engineering Degree', 'English Taught Program'],
        title: 'Welcome to Web Programming!',
        excerpt: 'Software development Community',
        learningOutcomes: [
          'Design and model a mono-component software program, using the object oriented programming',
          'Use collaborative tools for software development and build',
          'Prevent and detect errors: debugging techniques, unit tests, acceptance tests'
        ],
        contentAndChapters: [
          'SOLID principles',
          'Design patterns: Strategy, Adapter, Facade, Chain of Responsibility, Visitor, Observer and MVC, Singleton, Proxy...',
          'Build and version control',
          'Types of testing, unit tests, acceptance testing, debugging'
        ],
        tools: ['Java', 'JUnit', 'InteliJ', 'Maven', 'Git/GitHub'],
        prerequisities: ['Object Oriented Programming', 'Java', 'UML basics (class diagrams)']
      },
      {
        name: 'Algorithmics, computability and complexity theory',
        programs: ['Engineering Degree', 'English Taught Program'],

        excerpt: 'Algorithmics Community',
        learningOutcomes:
          'Develop the frontend and backend part of a website using modern frameworks',
        contentAndChapters: [
          'HTML / CSS (the basics)',
          'JavaScript learning',
          'Setting up a server with NodeJS, EJS and Express',
          'Introduction to VueJS',
          'Use of the Vuetify library to create a modern user interfaces'
        ],
        tools: [],
        prerequisities: []
      }
    ],
   })
}
</script>

<template>

  <div class="text-h4 my-4"  align="center">Courses</div>
  <v-divider class="my-2"></v-divider>
  <v-expansion-panels variant="popout" class="pa-4">
    <v-expansion-panel v-for="(course, i) in courses" :key="i" hide-actions>
      <v-expansion-panel-title>
        <v-row align="center" class="spacer" no-gutters>
          <v-col class="hidden-xs-only text-left ms-2" sm="5" md="3">
            <strong v-html="course.name"></strong>
            <span v-if="course.total" class="text-grey"> &nbsp;({{ course.total }}) </span>
          </v-col>

          <v-col
            v-if="course.excerpt"
            class="text-medium-emphasis text-truncate hidden-sm-and-down"
          >
            &mdash;
            {{ course.excerpt }}
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-card-text>
          <v-item-group v-if="course.contentAndChapters.length">
            <div class="text-caption mb-2"><strong>Content and Chapters</strong></div>
            <v-item v-for="(chapter, i) in course.contentAndChapters" :key="tool">
              <div>{{ `${i+1}) ` }}  {{ chapter }}</div>
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
