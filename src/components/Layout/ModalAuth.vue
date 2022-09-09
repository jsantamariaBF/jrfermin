<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div ref="modalBackground" class="modal-content has-background-light">
            
            <div class="is-flex is-justify-content-center py-3">
                <ul class="is-flex is-justify-content-space-between">
                    <li 
                        class="is-clickable"
                        :class="{'has-text-weight-semibold' : !register}"
                        @click="register = false"  
                    >
                        <p>Login</p>
                    </li>
                    <li 
                        class="ml-5 is-clickable"
                        :class="{'has-text-weight-semibold' : register}"
                        @click="register = true"  
                    >
                        <p>Register</p>
                    </li>
                    <li 
                        class="has-text-weight-semibold is-clickable"
                        @click="$emit('close')"  
                        style="position:absolute; right:1.5rem;"
                    > 
                        <p><strong>X</strong></p>
                    </li>
                </ul>
            </div>
            <!-- Login -->
            <div class="notification is-flex is-justify-content-center">
                <form 
                    class="has-background-white box"
                    @submit.prevent="onSubmit"
                    style="width: 20rem;"
                >
                
                    <div 
                        v-if="!register"
                        class=" p-3"
                    >
                        <div class="field">
                            <p class="control">
                                <label class="label">Email</label>
                                <input 
                                    v-model="login_credentials.login_email"
                                    class="input" 
                                    type="email" 
                                    placeholder="Email"
                                    required
                                >
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <label class="label">Password</label>
                                <input 
                                    v-model="login_credentials.login_password"
                                    class="input" 
                                    type="password" 
                                    placeholder="Password"
                                    required
                                >
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div v-else class="p-3">
                        <div class="field">
                            <p class="control">
                                <label class="label">Email</label>
                                <input 
                                    v-model="register_credentials.email"
                                    class="input" 
                                    type="email" 
                                    placeholder="Email"
                                    required
                                >
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <label class="label">Password</label>
                                <input 
                                    v-model="register_credentials.password"
                                    class="input" 
                                    type="password" 
                                    placeholder="Password"
                                    required
                                >
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="field is-grouped is-flex is-justify-content-center mt-4 pb-4">
                        <div class="control">
                            <button type="submit" class="button is-dark is-rounded">
                            {{ formattedName }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStoreAuth } from '@/stores/useStoreAuth';
import Spacer from '@/components/Layout/Spacer.vue';

const register = ref(false);

const storeAuth = useStoreAuth();

const register_credentials = reactive({
    email: '',
    password: '',
});

const login_credentials = reactive({
    email: '',
    password: ''
});

const formattedName = computed(() => {
    return !register.value ? 'Login' : 'Register';
});

const emits = defineEmits(['close']);

function onSubmit() {
    if (!register.value) {
        storeAuth.loginUser(login_credentials);
    } else {
        storeAuth.registerUser(register_credentials);
    };
    emits('close');
};

</script>

<style scoped>

</style>