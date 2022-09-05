<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div ref="modalBackground" class="modal-content has-background-white">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete note</p>
                <button @click="$emit('no')" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <h3>Are you sure you want to delete this note?</h3>
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button class="button is-rounded is-dark" @click="$emit('yes')">
                    <p class="has-text-light has-text-weight-semibold">
                        Yes
                    </p>
                </button>
                <button class="button is-rounded has-background-grey-light" @click="$emit('no')">
                    <p class="has-text-dark has-text-weight-semibold">
                        No
                    </p>
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const modalBackground = ref(null);

const emit = defineEmits(['no', 'yes'])

onClickOutside(modalBackground, () => {
    emit('no');
});

// keyboard control
onMounted(() => {
    document.addEventListener('keyup', (e) =>  { if (e.key === 'Escape') emit('no') })
});

onUnmounted(() => {
    document.removeEventListener('keyup', (e) =>  { if (e.key === 'Escape') emit('no') })
});

</script>

<style>

</style>