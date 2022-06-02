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

    <div class="row q-ma-md q-gutter-md">
      <label for="sprintLengthSlider" class="text-grey-7">
        <span>Sprint Length in Weeks:</span>
      </label>
      <q-slider
        name="sprint-length"
        data-testid="sprint-length-input"
        v-model="project.sprintLength"
        :min="1"
        :max="4"
        :step="1"
        label
        label-always
        color="light-green-5"
      />
    </div>

    <div class="q-ma-md flex buttons">
      <q-btn
        data-testid="create-project-button"
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ProjectInput } from '../../generated/graphql'
import { CreateProjectDocument } from './create-project.generated'

const project = reactive<ProjectInput>({
  name: '',
  description: '',
  sprintLength: 2,
})

const router = useRouter()

const { executeMutation } = useMutation(CreateProjectDocument)

const save = async () => {
  await executeMutation({ project })
  router.push('/my-projects')
}
</script>
