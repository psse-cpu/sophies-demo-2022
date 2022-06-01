<template>
  <div class="root flex-center">
    <div v-if="projects.length === 0" class="empty-state">
      <q-avatar
        class="q-pa-xs"
        size="300px"
        font-size="256px"
        color="green-3"
        icon="mdi-gauge-empty"
        text-color="white"
      />

      <h3>Wow, such empty!</h3>
      <p class="empty-message">You have no projects right now.</p>

      <q-btn color="primary" icon="mdi-briefcase-plus">
        <span class="q-px-sm">Create one</span>
      </q-btn>
    </div>
    <div v-else class="row projects">
      <div
        v-for="project of projects"
        :key="project.id"
        class="card-container col-md-6 col-xs-12 q-pa-md"
      >
        <project-card :project="project" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Project } from 'src/generated/graphql'
import ProjectCard from './project-card.vue'

interface MyProjectsProps {
  projects: Project[]
}

defineProps<MyProjectsProps>()
</script>

<style lang="scss" scoped>
.root {
  padding: 16px;
  display: flex;
}

.projects {
  width: 100%;
  align-self: flex-start;
}

.empty-state {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
}

h3 {
  text-align: center;
}

p.empty-message {
  font-size: 1.25em;
}
</style>
