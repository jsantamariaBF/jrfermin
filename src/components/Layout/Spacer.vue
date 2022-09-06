<template>
    <div :style="{height: size}">
        
    </div>
</template>

<script setup>

const props = defineProps({
    size: {
        type: String,
        default: '100px'
    }
})

</script>