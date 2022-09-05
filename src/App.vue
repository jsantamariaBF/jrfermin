<template>
  <Navbar />
  
  <div class="container py-4 has-background-light">
    <RouterView />  
  </div>
</template>

<script setup>
import Navbar from '@/components/Layout/Navbar.vue';
import { useStoreAuth } from '@/stores/useStoreAuth';
import { onMounted } from '@vue/runtime-core';

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});


</script> 

<style>
  @import 'bulma/css/bulma.min.css';
</style>
