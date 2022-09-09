<template>
  <Navbar />
  <div class="container py-4 has-background-light">
    <RouterView />  
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';

import Navbar from '@/components/Layout/Navbar.vue';
import Footer from '@/components/Layout/Footer.vue';

import { useStoreAuth } from '@/stores/useStoreAuth';
import { useStoreNotes } from '@/stores/useStoreNotes';
import { onMounted } from '@vue/runtime-core';

const storeAuth = useStoreAuth();
const storeNote = useStoreNotes();

onMounted(() => {
  storeAuth.init();
  storeNote.init();
});

</script> 

<style>
  @import 'bulma/css/bulma.min.css';

  #app {
    font-family: monospace;
  }

  .has-box-shadow {
    box-shadow: 0 2px 1px 2px rgb(240, 240, 240);
  }

  .has-text-shadow{
    text-shadow: 
    1px 0px 1px #ccc, 0px 1px 1px #eee, 
    2px 1px 1px #ccc, 1px 2px 1px #eee,
    3px 2px 1px #ccc, 2px 3px 1px #eee,
    4px 3px 1px #ccc, 3px 4px 1px #eee,
    5px 4px 1px #ccc, 4px 5px 1px #eee,
    3px 3px 1px #ccc, 3px 4px 1px #eee,
    5px 3px 1px #ccc;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-left {
    text-align: left;
  }
  
  .ql-align-justify {
    text-align: justify;
  }

  /* TRANSITIONS */

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
