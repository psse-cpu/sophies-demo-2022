<template>
  <q-card bordered>
    <q-card-section data-testid="project-card-name">
      <div class="text-h6">
        {{ project.name }}
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section data-testid="project-card-description"
      >{{ project.description }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Project } from 'src/generated/graphql'

interface CardProps {
  project: Pick<Project, 'name' | 'description' | 'createdAt'>
}

defineProps<CardProps>()
</script>
