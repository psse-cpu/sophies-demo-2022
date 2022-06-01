<template>
  <q-page class="row">
    <my-projects :projects="projects" />
  </q-page>
</template>

<script lang="ts" setup>
import { Project } from 'src/generated/graphql'
import { ref } from 'vue'
import MyProjects from 'src/components/projects/my-projects.vue'

const projects = ref<Project[]>([])
</script>
