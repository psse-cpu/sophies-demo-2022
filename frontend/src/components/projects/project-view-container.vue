<template>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">Something wrong...</div>
  <project-view v-else-if="data?.project" :project="data?.project" />
  <div v-else>Nothing here...</div>
</template>

<script lang="ts" setup>
import { useQuery } from '@urql/vue'
import { ProjectViewDocument } from './project-view.generated'
import ProjectView from './project-view.vue'

interface ProjectViewContainerProps {
  projectId: number
}

const props = defineProps<ProjectViewContainerProps>()

const { data, fetching, error } = useQuery({
  query: ProjectViewDocument,
  variables: { id: props.projectId },
})
</script>
