import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
// 引入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Toast } from 'vant'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    //播放列表
    playList: [{
      al: {
        id: 403181,
        name: "Yesterday Once More: Greatest Hits 1969-1983",
        pic: 19000660439857160,
        picUrl: "https://p2.music.126.net/oohnKqUgkNEsYJHJDcGmZw==/19000660439857160.jpg",
        pic_str: "19000660439857160",
      },
      id: 3986241,
      name: "Yesterday Once More",
      ar: [{
        name: "Carpenters"
      }],
      isLove: false
    }],
    //默认的下标为0,
    playListIndex: 0, 
    //暂停按钮
    isbtnShow: true, 
    //歌曲详情页
    detailShow: false,
    //歌词
    lyricList: {},
    //当前时间
    currentTime: 0,
    //歌曲总时间
     totalTime: 0,
    //是否拖动移动块
    isDraging: false,
    //是否登录
    isLogin: false,
    //音频标签
    $audio: null,
    //视频标签
    $video: null,
    //夜间模式
    isNight: false,
    NightColor: 'background-color: black;color: white;',
    LightColor: 'background-color: white;',
    //歌手肖像照
    SingerPicUrl: null,
    //个人信息
    selfITEMS: [
      {
        name: '蔡徐坤',
        lv: 8,
        picUrl: "https://p2.music.126.net/oohnKqUgkNEsYJHJDcGmZw==/19000660439857160.jpg"
      }
    ],
    //搜索关键字
    searchKEY: '',
    // 热门列表开关
    HotListshow: false,
    tag: '华语',
    //当前评论的id
    commentId: '',
    //我收藏的歌单
    myLikeList: [],
    //环形进度条
    rate: 0,
    //播放列表
    showMusicPlayList: false,
    //播放模式
    playMode:0,
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state,val) {
      state.isbtnShow = val
    },
    updatePlayList(state,val) {
      state.playList = val
      console.log("state.playList=>",val)
    },
    updateIndex(state,val) {
      state.playListIndex = val
      // console.log(state.playListIndex)
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state,val) {
      state.lyricList = val
      console.log('vuex 歌词=>',val)
    },
    updateTotalTime(state,val) {
      state.totalTime  = val
    },
    updateCurrentTime(state,val) {
      state.currentTime = val
    },
    updateisDraging(state,val) {
      state.isDraging = val
      console.log(val)
    },
    pushPlayList(state,val) {
      state.playList.push(val)
      console.log('pushlist=>',val)
    },
    setAudio(state,val) {
      state.$audio = val
    },
    setVideo(state,val) {
      state.$video = val
    },
    updateisNight(state,val) {
      state.isNight = val
      // console.log(val)
    },
    updateSingerPicUrl(state,val) {
      state.SingerPicUrl = val
      console.log(val)
    },
    updateLogin(state,val) {
      state.isLogin = val
      console.log(val)
    },
    updatesearchKEY(state,val) {
      state.searchKEY = val
    },
    updateHotListshow(state,val) {
      state.HotListshow = val
    },
    updateTag(state,val) {
      state.tag = val
      // console.log(val)
    },
    updatecommentId(state,val) {
      state.commentId = val
      // console.log(val)
    },
    updatemyLikeList(state,val) {
      state.myLikeList.unshift(val)
    },
    updaterate(state,val) {
      state.rate = val
    },
    updateshowMusicPlayList(state,val) {
      // console.log(val)
      state.showMusicPlayList = val
    },
    //修改播放模式
    updatePlayMode(state,val) {
      state.playMode = val
      console.log(val)
    }
  },
  actions: {
    async  getLyric(context,val) {
        let res = await axios({method: 'GET',url: `/lyric?id=${val}`})
        context.commit('updateLyricList',res.data.lrc)
    } ,
    async getPhoneLogin(context,val) {
      console.log(val)
      let res = await axios({method: 'GET',url: `/login/cellphone?phone=${val.phone}&password=${val.password}`})
      console.log(res)
      if(res.data.code === 400) {
        router.push({name:'Captcha'})
      }
    } 
  },
  modules: {}
})