<template>
  <q-page class="col q-pa-none bg-grey-4">
    <div
      class="row flex-center content-center"
      style="height: calc(100vh - 101px)"
    >
      <registration-form class="col-md-4 col-xs-12 shadow-4" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RegistrationForm from 'src/components/registration-form.vue'
</script>
