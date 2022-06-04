<template>
  <q-page>
    <project-view-container :projectId="Number(props.projectId)" />
  </q-page>
</template>

<script lang="ts" setup>
import ProjectViewContainer from 'src/components/projects/project-view-container.vue'

interface ProjectViewPageProps {
  projectId: string
}

const props = defineProps<ProjectViewPageProps>()
</script>
