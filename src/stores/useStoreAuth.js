import { defineStore } from 'pinia';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase';
import { useStoreNotes } from '@/stores/useStoreNotes';


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
            if (user) {
                this.user.id = user.uid;
                this.user.email = user.email;
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
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            // user registration successful
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    loginUser(credentials) {
        console.log(credentials);
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
