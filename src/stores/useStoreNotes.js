import { defineStore } from 'pinia';
import { 
  collection, doc, onSnapshot, 
  addDoc, deleteDoc, updateDoc, 
  query, orderBy 
} 
from "firebase/firestore";
import { useStoreAuth } from '@/stores/useStoreAuth';
import { db } from '@/js/firebase';

/* CONSTANTS */
  let notesCollectionRef
  let notesCollectionQuery
  let getNotesSnapshop = null


export const useStoreNotes = defineStore('useStoreNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false,
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes');
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));  
    
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;
      getNotesSnapshop = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          }
          notes.push(note);
        });
        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    async addNotes(newNoteContent) {
      const currenDate = new Date().getTime();
      const date = currenDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updatePost(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshop) getNotesSnapshop();
    },
  },
  
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => { return note.id === id })[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach(note => { count += note.content.length })

      return count;
    },
  },
})
