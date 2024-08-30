<template >
    <div class="item_music">
        <ItemTop :play-list-data="playListData"></ItemTop>

        <MusicList :item-list="itemList" :play-list-data="playListData"></MusicList>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import LyricMCain from '../components/LyricMain.vue';
import FooterMusic from '../components/FooterMusic.vue';
import ItemTop from "../components/ItemTop.vue";
import MusicList from '../components/ItemMusicList.vue';
import { mapState } from 'vuex';
export default {

    name: 'ItemMusic',
    data() {
        return {
            show: null,

            gid: 0,
            //详情
            playListData: {},
            //歌单
            itemList: [],
            //歌曲数据
            songList: {},
            //歌词数据
            lyricList: {},

        }
    },
    components: {
        FooterMusic,
        LyricMCain,
        ItemTop,
        MusicList
    },
    computed: {
        ...mapState(['isLogin'])
    },
    created() {

        this.gid = this.$route.query.id
        this.getGedanList(this.gid)
        this.getGedanSongs(this.gid)
    },

    methods: {
        getGedanList(id) {
            this.axios({
                method: 'get',
                url: '/playlist/detail',
                params: {
                    id
                }
            }).then(res => {
                if (res.status === 200) {
                    let playList = res.data.playlist
                    sessionStorage.setItem("itemDetail", JSON.stringify(playList))
                    this.playListData = playList
                    console.log("console.log(this.playListData)=>", this.playListData)
                }
            }).then(() => {

                if (this.isLogin) {
                    let likeList = JSON.parse(localStorage.getItem('mychooselikemusicID'))
                    // console.log(likeList)
                    let res = likeList.some(item => {
                        return this.playListData.id == item
                    })
                    // console.log(res);

                    if (res) {
                        this.playListData.copied = true
                    }
                }
                else {
                    this.playListData.copied = false
                }

            }).catch(err => {
                console.log(err)
            })
        },
        getLyric(id) {
            this.axios({
                method: 'get',
                url: '/lyric',
                params: {
                    id
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.lyricList = {
                        lrc: res.data.lrc,
                        tlyric: res.data.tlyric
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
            else {
                return num
            }
        },
        getGedanSongs(id) {
            this.axios({
                method: 'get',
                url: '/playlist/track/all',
                params: {
                    id,
                    limit: 20
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.itemList = res.data.songs
                    // console.log("this.itemList==>", this.itemList)
                }
            }).then(() => {
                let myLoveMusicID = JSON.parse(localStorage.getItem('myLoveMusicID'))
                // console.log(myLoveMusicID)
                let res 
                // for(let i = 0;i<myLoveMusicID.length;i++) {
                //     for(let j=0;j<this.itemList.length;j++) {
                //         if(this.itemList[j].id == myLoveMusicID[i].id) {
                //             console.log('喜欢的歌曲id有相等的了')
                //             res = true
                //             break
                //         }
                //     }
                // }
                // let res = myLoveMusicID.some((item,i)=> {
                //     return this.itemList.id == item
                // })

                // if(res) {
                //     this.itemList.st = 1
                // }
                // else {
                //     this.itemList.st = 0
                // }
            }).catch(err => {
                console.log(err)
            })
        },
        //歌单评论

    }
}

</script>
<style lang="less" scoped>
.item_music {
    width: 100vw;
    height: 100vh;





    .giegie {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }

}
</style>