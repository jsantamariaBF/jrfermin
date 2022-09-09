<template>
   <div>
        <button 
            class="button is-rounded has-background-grey has-text-light" 
            @click="router.go(-1)"
        >
            Go back
        </button>
        <Spacer size="5rem" />

        <div v-html="content">
        </div>
    </div>
    
</template>

<script setup>
import Spacer from '@/components/Layout/Spacer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    note: {
        type: String,
        required: true,
    }
});

const { id, content, date } = JSON.parse(props.note);

</script>

<style>

</style>