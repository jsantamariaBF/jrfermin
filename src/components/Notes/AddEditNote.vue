<template>
  <div :class="`card has-background-${bgColor} p-4 mb-4`">
    <label v-if="title" class="has-text-white is-weight-bol">{{ title }}</label>
    <div class="field">
        <div class="control">
            <textarea 
                :value="modelValue"
                class="textarea" 
                :placeholder="placeholder" 
                @input="$emit('update:modelValue', $event.target.value)"
                v-autofocus
            />
        </div>
    </div>

    <div class="field is-grouped is-grouped-right">
        <div class="control">
            <slot name="buttons" />
        </div>
    </div>
</div>
</template>

<script setup>
import { vAutofocus } from '@/directives/vAutofocus.js'

const props = defineProps({
    modelValue: {
        type: String,
        require: true,
    },
    bgColor: {
        type: String,
        default: 'dark',
    },
    placeholder: {
        type: String,
        default: 'Insert text here'
    },
    title: {
        type: String,
        default: ""    
    }
})

const emit = defineEmits(['update:modelValue']);


</script>
