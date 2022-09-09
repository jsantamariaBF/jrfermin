<template>
  <table class="table">
    <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Number of note</td>
        <td>{{ store.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>Number of Character (of all notes)</td>
        <td>{{ store.totalCharactersCount }}</td>
      </tr>
    </tbody>
  </table>
  <input v-autofocus v-model="input" class="input" type="text" placeholder="Do you love noteballs?">
</template>

<script setup>
import { ref } from 'vue';

import { useStoreNotes } from '@/stores/useStoreNotes';
import { vAutofocus } from '@/directives/vAutofocus.js'
import { useWatchCharacters } from '@/use/useWatchCharacters.js';

const store = useStoreNotes();
const input = ref();

useWatchCharacters(input, 8)

</script>

<style>

</style>