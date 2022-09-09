<template>
   <div>
        <button @click="router.go(-1)">Go back</button>
        <div v-html="content">
        </div>
    </div>
    
</template>

<script setup>
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