import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import waterfall from 'vue-waterfall2'
import 'lib-flexible/flexible'
import '../src/assets/css/iconfont.css'
import '../src/assets/css/iconfont_nav.css'
import '../src/assets/css/iconfont_littleicon.css'
import '../src/assets/css/iconfont_wylogo.css'
import '../src/assets/css/iconfont_play.css'
import '../src/assets/css/iconfont_fuck.css'
import '../src/assets/css/iconfont_my.css'
import '../src/assets/css/iconfont_bofangjiemian.css'
import './assets/font/index.css'
import { Cell, CellGroup,Tag ,Switch , Divider ,Tabbar, TabbarItem ,NavBar,Icon,Swipe, SwipeItem  ,Button ,Lazyload ,Popup,Field,Form,Dialog ,Toast,Circle,Grid, GridItem , Tab, Tabs ,Slider  ,Search  ,Empty ,Popover } from 'vant';

Vue
.use(VueAxios, axios)
.use(Tabbar)
.use(TabbarItem)
.use(NavBar)
.use(Icon)
.use(Swipe)
.use(SwipeItem)
.use(Divider)
.use(Button)
.use(Tag)
.use(Popup)
.use(Switch)
.use(Cell)
.use(CellGroup)
.use(Field)
.use(Form)
.use(Toast)
.use(Dialog)
.use(Circle)
.use(Grid)
.use(GridItem)
.use(Tab)
.use(Tabs)
.use(Slider)
.use(Search)
.use(Empty)
.use(Popover)
.use(waterfall)
.use(Lazyload,{
  lazyComponent: true,
})

axios.defaults.baseURL = 'https://apis.netstart.cn/music'


// let service = axios.create({
//   baseURL: 'http://localhost:3000',
//   timeout: 3000
// })

// export default service

//

axios.interceptors.request.use(function(config) {
  Toast.loading({
    message: '加载中',
    forbidClick: true,
    duration: 0
  })

  return config
}),function(err) {
  Toast.clear();
  return Promise.reject(error);
}

axios.interceptors.response.use(function(response) {
  Toast.clear()
  return response
}),function(error) {
  Toast.clear()
  return Promise.reject(error)
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
