<template>
  <q-spinner-hourglass v-if="fetching" size="3em" />
  <my-projects v-if="data" :projects="data?.myProjects ?? []" />
</template>

<script lang="ts" setup>
import { useQuery } from '@urql/vue'
import { onMounted } from 'vue'
import { MyProjectsDocument } from './my-projects.generated'
import MyProjects from './my-projects.vue'

const { data, fetching, executeQuery } = useQuery({ query: MyProjectsDocument })

onMounted(() => {
  executeQuery({ requestPolicy: 'network-only' })
})
</script>
