<template>
  <q-card bordered>
    <q-card-section data-testid="project-card-name">
      <div class="text-h6">
        <router-link
          class="project-link"
          :to="{ name: 'project', params: { projectId: project.id } }"
        >
          {{ project.name }}
        </router-link>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section data-testid="project-card-description"
      >{{ project.description }}
    </q-card-section>

    <q-card-section class="text-grey-5" data-testid="project-card-date">
      Created {{ project.createdAt.toLocaleDateString() }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Project } from 'src/generated/graphql'

interface CardProps {
  project: Pick<Project, 'id' | 'name' | 'description' | 'createdAt'>
}

defineProps<CardProps>()
</script>

<style lang="scss" scoped>
.project-link {
  color: $primary;
}

.timeago {
  color: $grey-2;
}
</style>
