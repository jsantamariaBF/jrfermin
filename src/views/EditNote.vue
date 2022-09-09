<template>
    <div class="edit-note">
        <router-link 
            :to="'/'"
            class="button is-link has-background-grey is-rounded mb-4"
        >
            Back home
        </router-link>  
        <QuillEditor 
            v-model:content="noteContent"
            theme="snow"
            :options="options"
            :content="noteContent"
            contentType="html"
            toolbar="full"
            output="html"
        />
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import "quill-emoji/dist/quill-emoji.css";

import { useStoreNotes } from '@/stores/useStoreNotes';

import AddEditNote from '@/components/Notes/AddEditNote.vue';
import Spacer from '@/components/Layout/Spacer.vue';


const store = useStoreNotes();
const route = useRoute();
const router = useRouter();

const noteContent = ref('');

noteContent.value = store.getNoteContent(route.params.id);

function saveEdit() {
    store.updatePost(route.params.id, noteContent.value);
    router.push('/')
};


const modules = {
    name: 'blotFormatter',  
    module: BlotFormatter, 
    options: {},
};

const options = {
    debug: 'info',
    modules: {
        toolbar: ['bold', 'italic', 'underline'],
    },
    placeholder: 'Insert your content here.',
    readOnly: false,
};


</script>

<style>

</style>