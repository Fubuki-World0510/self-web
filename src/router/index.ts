import { createRouter, createWebHistory } from 'vue-router'

// Import components
const MainPage = () => import('@/components/pages/mainPage/MainPage.vue')
const RickRoll = () => import('@/components/pages/RickRollPage/RickRoll.vue')
const Foob = () => import('@/components/pages/FoobPage/Foob.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainPage
    },
    {
      path: '/dontclick',
      name: 'RickRoll',
      component: RickRoll
    },
    {
      path: '/foob',
      name: 'Foob',
      component: Foob
    },
    {
      path: '/kon',
      redirect: () => {
        window.location.assign("https://discord.com/oauth2/authorize?client_id=961251733974188162&permissions=8&integration_type=0&scope=bot+applications.commands");
        return '/';
      }
    }
  ],
})

export default router
