<template>
    <nav 
        class="navbar is-fixed-top has-text-black has-background-light has-box-shadow" 
        role="navigation" 
        aria-label="main navigation"
    >
        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <router-link :to="'/'" class="navbar-item has-text-dark is-size-3 is-family-monospace is-unselectable has-text-weight-bold">
                    J.R.F
                </router-link>
                <a  
                    @click.prevent="showMobileNav = !showMobileNav"
                    role="button" 
                    class="navbar-burger has-text-dark" 
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
                <div class="navbar-end is-flex is-align-items-center is-justify-content-space-around">
                    <router-link 
                        @click="showMobileNav = false"
                        to="/"
                        class="has-text-dark is-unselectable"
                        :class="[showMobileNav ? 'has-text-dark' : 'navbar-item ml-6']"
                        active-class="is-active navbar-item"
                    >
                        #Notes
                    </router-link>

                    <router-link 
                        @click="showMobileNav = false"
                        to="/yosolodigo"
                        class="has-text-dark is-unselectable"
                        :class="[showMobileNav ? 'has-text-dark' : 'navbar-item ml-6 ']"
                        active-class="is-active navbar-item"
                    >
                        #YoSoloDigo
                    </router-link>
                    <div
                        v-if="!storeAuth.user.id"
                        @click="showAuthModal" 
                        class="has-text-dark is-clickable  is-unselectable"
                        :class="[showMobileNav ? 'has-text-dark' : 'navbar-item ml-6']"
                        active-class="is-active navbar-item"
                    >
                        #Login
                    </div>
                    <div
                        v-if="storeAuth.user.id"
                        @click="logout" 
                        class="has-text-black is-clickable is-unselectable"
                        :class="[showMobileNav ? 'has-text-dark' : 'navbar-item ml-6']"
                        active-class="is-active navbar-item"
                    >
                        #Logout
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <Spacer size="4.5rem"/>

    <div class="notification has-text-centered" style="">
        <img class="blurred is-unselectable" style="border-radius:5%; display:inline-block;" width="700" height="200" src="../../assets/picture-jesus2.jpeg" alt="header-img">
        <h3 class="is-size-2 is-family-monospace has-text-shadow is-unselectable" style="letter-spacing: 0rem;">J.R.Fermín</h3>
        <h3 class="is-size-4 has-text-grey is-unselectable">Artista Esencial</h3>
        <h3 class="is-size-6 has-text-grey is-unselectable">#Cine #Teatro #Arte</h3>
    </div>
    <hr class="has-background-grey-lighter">

    <!-- Modals -->
    <Transition>
        <AuthModal v-if="modal.auth" @close="modal.auth = null" />
    </Transition>
</template>

<script setup>
import { ref, reactive } from 'vue';

import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/useStoreAuth';
import Spacer from '@/components/Layout/Spacer.vue';
import AuthModal from '@/components/Layout/AuthModal.vue';

// mobile nav
const showMobileNav = ref(false);
const navbarMenuRef = ref(false);
const navbarBurgerRef = ref(false);

// store
const storeAuth = useStoreAuth();
const modal = reactive({
    auth: false,
});

onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
}, {
    ignore: [navbarBurgerRef]
});

function showAuthModal() {
    showMobileNav.value = false;
    modal.auth = true;
};

function logout() {
    showMobileNav.value = false;
    storeAuth.logoutUser();
};

</script>

<style scoped>
    @media (max-width: 1023px) {
        .navbar-menu {
            position: absolute;
            left: 0;
            width: 100%;
        }
    }

    .navbar-item:hover {
        background-color: #ebe7e7
    }

    a.navbar-item.is-active {
        color: black;
    }

    .blurred {
        box-shadow: 17px 17px 10px rgb(233, 232, 232);
    }
</style>
