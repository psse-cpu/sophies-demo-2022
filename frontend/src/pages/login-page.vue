<template>
  <q-page class="col q-pa-none">
    <div class="row q-pa-md">
      <div class="col-xs-12 col-md">
        <login-jumbotron />
      </div>
      <div class="bg-blue-grey-1 col-xs-12 col-md q-pa-md row">
        <login-form />
      </div>
    </div>
    <ship-that-features />
  </q-page>
</template>

<script setup lang="ts">
import LoginJumbotron from 'src/components/guest/login-jumbotron.vue'
import LoginForm from 'src/components/guest/login-form.vue'
import ShipThatFeatures from 'src/components/shipthat-features.vue'
</script>

<style scoped lang="scss">
form {
  margin-left: auto;
  margin-right: auto;
}

#googleSignIn iframe {
  display: none !important;
}
</style>
