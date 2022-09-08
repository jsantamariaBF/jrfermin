import { computed } from 'vue';
import { defineStore } from 'pinia';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase';
import { useStoreNotes } from '@/stores/useStoreNotes';
import { white_list } from './admin/whitelist';

export const useStoreAuth = defineStore('useStoreAuth', {
  state: () => {
    return { 
        user: {},
    };
  },
  actions: {
    init() {
        const storeNotes = useStoreNotes();
      
        onAuthStateChanged(auth, (user) => {
            const isAdmin = computed(() => {
                return white_list.includes(user.uid) ? 
                this.user.isAdmin = true :
                this.user.isAdmin = false;
            }); 
            if (user) {
                this.user.id = user.uid;
                this.user.email = user.email;
                isAdmin.value;
                this.router.push('/');
                storeNotes.init();
            } else {
                this.user = {};
                this.router.push('/auth');
                storeNotes.clearNotes();
            }
        });
    },
    registerUser(credentials) {
        createUserWithEmailAndPassword(
            auth, 
            credentials.email, 
            credentials.password, 
        )
        .then((userCredential) => {
            // user registration successful
            const user = userCredential.user;
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    },
    loginUser(credentials) {
        signInWithEmailAndPassword(auth, credentials.login_email, credentials.login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    logoutUser() {
      signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
            console.log(error);
        });  
    },
  }
})
