<template>
    <div class="card is-clickable">
        <div @click.prevent="navigateToNote()" class="card-content">
            <div class="has-text-centered">
                <img class="image" width="100" src="../../assets/header-img.png" alt="test">
            </div>
            <div class="media mt-3">
                <div class="media-content">
                    <h3 class=""><strong>{{ note.title || '' }}</strong></h3>
                    <p class="subtitle is-6">{{ note.subtitle || '' }}</p>
                </div>
            </div>
            <div class="content">
                {{ noteContentFormatted }}
            </div>
        </div>
        <div class="mt-4 has-text-right">
            <button
                v-if="storeAuth.user.isAdmin"
                @click.prevent="navigateToEdit(note.id)"
                class="button is-rounded is-size-6 has-background-grey-dark has-text-white has-text-weight-semibold mr-1"
            >
                Edit
            </button>
            <button 
                v-if="storeAuth.user.isAdmin"
                @click="deleteNote" 
                class="button is-rounded is-size-6 has-background-grey-light has-text-weight-semibold"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDateFormat } from '@vueuse/core'

import { useStoreAuth } from '@/stores/useStoreAuth';

const storeAuth = useStoreAuth();
const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});
// console.log(props.note);
const router = useRouter()

/* Date formatted */
const dateFormatted = computed(() => {
    let date = new Date(Number(props.note.date));
    const dateFormat = useDateFormat(date, 'YYYY-MM-dddd');
    return dateFormat.value;
});

const characterLength = computed(() => { 
    return props.note.content.length < 2 ? 
    `${props.note.content.length} Character` : 
    `${props.note.content.length} Characters`
});

const noteContentFormatted = computed(() => {
    return props.note.content.length > 100 ? props.note.content.slice(0,100) + '[...]' : props.note.content;
})

const emit = defineEmits([
    'delete',
]);

function deleteNote() {
    emit('delete', props.note.id); 
};

function navigateToNote() {
    router.push({ name: 'NoteView', params: { id: props.note.id, note: JSON.stringify(props.note) } });
};

function navigateToEdit(noteId) {
    return router.push(`/editNote/${noteId}`);
};

</script>
