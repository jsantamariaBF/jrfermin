<template>
    <!-- <nav 
        class="navbar has-text-black" 
        role="navigation" 
        aria-label="main navigation"
    >
        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <router-link :to="'/'" class="navbar-item is-size-3 is-family-monospace">
                    J.R Fermín
                </router-link>
                <a  
                    @click.prevent="showMobileNav = !showMobileNav"
                    role="button" 
                    class="navbar-burger" 
                    :class="{ 'is-active' : showMobileNav }"
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample"
                    ref="navbarBurgerRef"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div 
                id="navbarBasicExample" 
                class="navbar-menu"
                :class="{ 'is-active' : showMobileNav }"
                ref="navbarMenuRef"
            >
                <div class="navbar-start">
                    <router-link 
                        @click="showMobileNav = false"
                        to="/"
                        class="navbar-item"
                        active-class="is-active"
                    >
                        Notes
                    </router-link>

                    <router-link 
                        @click="showMobileNav = false"
                        to="/stats"
                        class="navbar-item"
                        active-class="is-active"
                    >
                        Stats
                    </router-link>
                    <router-link
                        @click="showMobileNav = false" 
                        :to="{name: 'Auth'}"
                        class="navbar-item"
                        active-class="is-active"
                    >
                        Login
                    </router-link>
                </div>
            </div>
        </div>
    </nav> -->
    
    <div class="container is-max-desktop has-text-centered is-family-monospace">
        <div class="notification">
            <img style="border-radius:5%; display:inline-block;" width="200" height="200" src="../../assets/header-img.png" alt="header-img">
            <h3 class="is-size-1">Yo Solo Digo</h3>
            <h3 class="is-size-4 has-text-grey">J.R Fermín</h3>
            <h3 class="is-size-5 has-text-grey">#Cine / #Teatro / #Arte</h3>
            
            
        </div>
        <hr class="has-background-grey-lighter">
        <p class="panel-tabs is-justify-content-space-around">
            
            <router-link 
                @click="showMobileNav = false"
                to="/"
                class="has-text-black has-background-light is-size-6"
                active-class="is-active"
            >
                Home
            </router-link>

            <router-link 
                @click="showMobileNav = false"
                to="/stats"
                class="has-text-black is-size-6"
                active-class="is-active"
            >
                Stats
            </router-link>

            <router-link
                v-if="!storeAuth.user.id"
                @click="showMobileNav = false" 
                :to="{name: 'Auth'}"
                class="has-text-black is-size-6"
                active-class="is-active"
            >
                Login
            </router-link>

            <div class="navbar-start">
                <button
                    v-if="storeAuth.user.id"
                    @click="logout" 
                    class="button is-rounded has-text-black is-size-6"
                    active-class="is-active"
                >
                    Logout
                </button>
            </div>

            
        </p>
    </div>


</template>

<script setup>
import { ref } from 'vue';

import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/useStoreAuth';

// mobile nav
const showMobileNav = ref(false);
const navbarMenuRef = ref(false);
const navbarBurgerRef = ref(false);

// store
const storeAuth = useStoreAuth();

onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
}, {
    ignore: [navbarBurgerRef]
});

function logout() {
    showMobileNav.value = false;
    storeAuth.logoutUser();
}

</script>

<style scoped>
    @media (max-width: 1023px) {
        .navbar-menu {
            position: absolute;
            left: 0;
            width: 100%;
        }
    }
</style>
