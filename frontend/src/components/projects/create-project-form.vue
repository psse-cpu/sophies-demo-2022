<template>
  <form
    class="q-pa-md bg-grey-1"
    data-testid="login-form"
    @submit.prevent="save"
  >
    <h6 class="q-mt-none q-mb-none">Create Scrum Project</h6>

    <div class="q-ma-md">
      <q-input
        data-testid="project-name-input"
        type="text"
        dense
        rounded
        outlined
        v-model="project.name"
        label="Project Name"
      />
    </div>

    <div class="q-ma-md">
      <q-input
        data-testid="project-description-input"
        type="textarea"
        dense
        rounded
        outlined
        v-model="project.description"
        label="Project Description"
      />
    </div>

    <q-select
      v-model="sprintLength"
      :options="sprintLengths"
      rounded
      outlined
      label="Not yet implemented"
      style="width: 96%; margin-left: auto; margin-right: auto"
    />

    <div class="q-ma-md flex buttons">
      <q-btn
        data-testid="sign-up-button"
        type="submit"
        icon="mdi-account-plus"
        color="primary"
        size="md"
        unelevated
        rounded
        style="width: 100%"
      >
        Create Project
      </q-btn>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useMutation } from '@urql/vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ProjectInput } from '../../generated/graphql'
import { CreateProjectDocument } from './create-project.generated'

const sprintLengths = [
  { value: 1, label: '1 week' },
  { value: 2, label: '2 weeks' },
  { value: 3, label: '3 weeks' },
  { value: 4, label: '4 weeks' },
]

const sprintLength = ref(sprintLengths[1])

const project = reactive<ProjectInput>({
  name: '',
  description: '',
})

const router = useRouter()

const { executeMutation } = useMutation(CreateProjectDocument)

const save = async () => {
  await executeMutation({ project })
  router.push('/my-projects')
}
</script>
