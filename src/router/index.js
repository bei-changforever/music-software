import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'


Vue.use(VueRouter)

const routes = [
   {
    path: '/',
    name: 'Main',
    component:()=> import('../views/MainView.vue'),
    children:[
      {
        path: 'find',
        alias: '',
        name: 'Find',
        component:()=>import('../views/FindView.vue')
      },
      {
        path: 'boke',

        name: 'BoKe',
        component:()=>import('../views/BoKeView.vue')
      },
      {
        path: 'my',
        name: 'My',
     
        component:()=>import('../views/MyView.vue')
      },
      {
        path: 'guanzhu',

        name: 'GuanZhu',
        component:()=>import('../views/GuanZhuView.vue')
      },
      {
        path: '/shequ',
     
        name: 'SheQu',
        component:()=>import('../views/SheQuView.vue')
      },
    ]
   },
   {
    path: '/login',
    name: 'Login',
    component:()=> import('../views/LoginView.vue'),
   },
   {
    path: '/captcha',
    name: 'Captcha',
    component:()=>import('../views/CaptchaView.vue')
   },
   {
    path: '/itemmusic',
    name: 'ItemMusic',
    component:()=>import('../views/ItemMusic.vue')
   },
   {
    path: '/search',
    name: 'Search',
    component:()=> import('../views/Search.vue')
   },
   {
    path: '/singerSong/:id',
    name: 'SingerSong',
    component: () => import('../views/SingerSong.vue')
  },
  {
    path: '/mymessage',
    name: 'MyMessage',
    component:() => import('../views/MyMessage.vue')
  },
  {
    path: '/songlist',
    name: 'SongList',
    component:()=> import('../views/SingerList.vue')

  },
  {
    path: '/hotmusic',
    name: 'HotMusic',
    component:()=> import('../views/HotMusic.vue')
  },
  {
    path: '/gedancomments',
    name: 'GeDanComments',
    component:()=>import('../views/GeDanComments.vue')
  },
  {
    path: '/everydays',
    name: 'EveryDays',
    component:()=>import('../views/EveryDaySongs.vue')
  },
  {
    path: '/hottoplist',
    name: 'HotTopList',
    component:()=>import('../views/HotTopicList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
