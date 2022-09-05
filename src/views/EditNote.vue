<template>
  <div class="edit-note">
    <router-link 
        :to="'/'"
        class="button is-link has-background-grey is-rounded mb-4"
    >
        Back home
    </router-link>  
    <AddEditNote 
        v-model="noteContent"
        :bgColor='"white"'
        :placeholder="'Change note content here'"
        :title="'Edit Note'"
    >
        <template #buttons>
            <button 
                @click="noteContent = ''"
                class="button is-rounded has-background-grey mr-2"
            >
               <p class="has-text-weight-semibold has-text-light">Reset</p>  
            </button>  
            <button 
                :disabled="!noteContent"
                @click="saveEdit"
                class="button has-background-dark is-rounded"
            >
               <p class="has-text-weight-semibold has-text-light">Save Note</p> 
            </button>  
        </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter} from 'vue-router';

import { useStoreNotes } from '@/stores/useStoreNotes';

import AddEditNote from '@/components/Notes/AddEditNote.vue';

const store = useStoreNotes();
const route = useRoute();
const router = useRouter();

const noteContent = ref('');

noteContent.value = store.getNoteContent(route.params.id);

function saveEdit() {
    store.updatePost(route.params.id, noteContent.value);
    router.push('/')
};


</script>

<style>

</style>