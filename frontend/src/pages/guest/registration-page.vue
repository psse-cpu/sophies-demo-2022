<template>
  <q-page class="col q-pa-none bg-grey-4">
    <div class="registration-form row flex-center content-center">
      <registration-form class="col-md-4 col-xs-12 shadow-4" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RegistrationForm from 'src/components/guest/registration-form.vue'
</script>

<style scoped lang="scss">
.registration-form {
  height: calc(100vh - 101px);
}
</style>
