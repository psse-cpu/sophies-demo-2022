<template>
  <q-page class="col q-pa-md bg-grey-4">
    <div class="registration-form row flex-center content-center">
      <create-project-form class="col-md-8 col-xs-12 shadow-4" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CreateProjectForm from 'src/components/projects/create-project-form.vue'
</script>

<style scoped lang="scss">
.registration-form {
  height: calc(100vh - 101px);
}
</style>
