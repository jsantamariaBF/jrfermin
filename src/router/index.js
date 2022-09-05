import { createRouter, createWebHistory } from 'vue-router'
import ViewNotes from '../views/ViewNotes.vue'
import EditNote from '../views/EditNote.vue'
import Stats from '../views/Stats.vue'
import ViewAuth from '../views/ViewAuth.vue'
import { useStoreAuth } from '../stores/useStoreAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ViewNotes
    },
    {
      path: '/editNote/:id',
      name: 'EditNote',
      component: EditNote
    },
    {
      path: '/auth',
      name: 'Auth',
      component: ViewAuth
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();

  if(!storeAuth.user.id && to.name !== 'Auth') return { name: 'Auth' };

  if (storeAuth.user.id && to.name === 'Auth') return { name: 'Home' }
})

export default router
