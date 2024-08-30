<template>
    <div class="footermusic" ref="aaa">
        <audio ref="audio" style="display: none"
            :src="`https://music.163.com/song/media/outer/url?id=${renderMusicList.playList[renderMusicList.playListIndex].id}.mp3`"
            controls @canplay="renderTotalTime" @timeupdate="renderCurrentTime"></audio>
        <div class="footer_box">
            <div class="box_left" @click="showPoPu">
                <div class="xuanzhuan">
                    <img class="xuanzhuan_img" :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
                        :src="renderMusicList.playList[renderMusicList.playListIndex].al.picUrl" alt="">
                </div>
                <div class="song_name">
                    <p class="fv_name">{{ renderMusicList.playList[renderMusicList.playListIndex].name }}</p>
                    <p class="art">-<span
                            v-for="(item, index) in renderMusicList.playList[renderMusicList.playListIndex].ar">{{
                                    item.name
                            }}</span>
                    </p>
                    <!-- {{renderMusicList.playList[renderMusicList.playListIndex].picUrl}} -->
                </div>
            </div>
            <div class="box_right">
                <div class="play" @click="play">
                    <!-- 当前音乐总时间占100里的几份 -->
                    <van-circle v-model="currentRate" :rate="$store.state.rate" :color="gradientColor" size="30px">
                        <div class="bofan">
                            <i v-if="$store.state.isbtnShow" class="iconfont icon-shipinbofangshibofang"></i>
                            <i v-else class="iconfont icon-zanting"></i>
                        </div>
                    </van-circle>
                </div>
                <div class="bars" @click="bofanList">
                    <van-icon name="bars" size="30px" />
                </div>

            </div>
        </div>

        <div class="giegie">
            <van-popup v-model="$store.state.detailShow" closeable close-icon="arrow-down"
                close-icon-position="top-left" position="top" :style="{ height: '100%', width: '100%' }">

                <LyricMCain :play="play" :music-list="renderMusicList.playList[renderMusicList.playListIndex]">
                </LyricMCain>

            </van-popup>
        </div>

        <div class="musicplayList">
            <van-popup v-model="$store.state.showMusicPlayList" position="bottom"
                :style="{ height: '70%', width: '90%' }">
                <NowMusicPlayList :now-play-music-list="nowPlayMusicList"></NowMusicPlayList>

            </van-popup>
        </div>



    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import LyricMCain from '../components/LyricMain.vue'
import NowMusicPlayList from '../components/NowPlayMusicList.vue'
export default {
    name: 'FooterMusic',
    props: {
        songList: {

        },
        lyricList: {

        }
    },
    components: {
        LyricMCain,
        NowMusicPlayList
    },
    data() {
        return {
            show: false,
            currentRate: 0,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6',
            },
            lyricres: [],
            timer: null,
            scrollTop: 0,
            nowPlayMusicList: []

        }
    },
    computed: {
        renderMusicList() {

            let musicList = { ...this.$store.state }
            return musicList
        },
        ...mapState(['currentTime', 'totalTime', 'isDraging', 'isbtnShow', 'playList', 'playListIndex', 'rate', 'showMusicPlayList', 'playMode'])
    },
    mounted() {
        this.$store.dispatch('getLyric', this.renderMusicList.playList[this.renderMusicList.playListIndex].id)
    },
    created() {
        this.$nextTick(() => {
            this.$store.commit('setAudio', this.$refs.audio)
        })
    },
    updated() {
        this.addDuration()
    },
    methods: {
        showPoPu() {
            //是否展示歌词面板
            this.$store.commit("updateDetailShow")
        },
        play() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.$store.commit("updateIsbtnShow", false)
            }
            else {
                this.$refs.audio.pause()
                this.$store.commit("updateIsbtnShow", true)
            }
        },
        renderTotalTime() {
            this.$store.commit('updateTotalTime', this.$refs.audio.duration)
            // console.log(this.$refs.audio.duration)

        },
        addDuration() {
            this.$store.commit('updateTotalTime', this.$refs.audio.duration)
            // console.log(this.$refs.audio.paused)
        },
        renderCurrentTime() {
            if (!this.isDraging) {
                this.$store.commit('updateCurrentTime', this.$refs.audio.currentTime)
                // console.log('当前播放时间=>',this.$refs.audio.currentTime)
                // rate
                let rate = this.$refs.audio.currentTime / this.$refs.audio.duration * 100
                this.updaterate(rate)
                // console.log( this.rate )
            }
        },
        bofanList() {
            console.log(this.playList)
            if (!this.showMusicPlayList) {
                this.updateshowMusicPlayList(true)
                this.nowPlayMusicList = this.playList
            } else {
                this.updateshowMusicPlayList(false)
            }


        },
        ...mapMutations(['setAudio', 'updateIndex', 'updaterate', 'updateshowMusicPlayList'])
    },
    watch: {
        "$store.state.playListIndex"(newval, oldval) {
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                this.$store.commit("updateIsbtnShow", false)
            }
            // console.log('newval=>',newval)
            // console.log('oldval=>',oldval)
            this.$store.state.playListIndex = newval
            this.$store.dispatch('getLyric', this.renderMusicList.playList[this.$store.state.playListIndex].id)
            this.scrollTop = 0
            this.updaterate(0)


        },
        "$store.state.playList"() {
            if (this.$store.state.isbtnShow) {
                this.$refs.audio.autoplay = true;
                this.$store.commit("updateIsbtnShow", false)
            }
        },
        "$store.state.detailShow"() {
            this.$refs.audio.autoplay = true;
            if (this.$store.state.detailShow) {
                console.log('用户开启了歌词界面')
                this.$store.dispatch('getLyric', this.renderMusicList.playList[this.renderMusicList.playListIndex].id)
            }
            else {
                console.log('用户关闭了歌词界面')
            }
        },
        currentTime(newval) {
            // console.log(newval)
            if (newval === this.totalTime) {
                console.log('时间到切换下一首')
                if (this.playMode === 0) {
                    if (this.playListIndex === this.playList.length - 1) {
                        this.updateIndex(0)
                        this.play()
                        this.updaterate(0)
                    }
                    else {
                        this.updateIndex(this.playListIndex + 1)
                        // this.play()
                        this.updaterate(0)
                    }
                }
                else if( this.playMode === 1) {
                    this.$refs.audio.currentTime = 0;
                    this.$refs.audio.play()
                    this.updaterate(0)
                }else {
                    let index = Math.floor(Math.random() * this.playList.length)
                    this.updateIndex(index)
                    // this.play()
                    this.updaterate(0)
                }


            }
        }
    }
}
</script>
<style lang="less" scoped>
.footermusic {
    // position: sticky;
    // bottom: 0;
    // left: 0;
    width: 100vw;
    height: 60px;
    z-index: 9;

    .footer_box {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: rgb(227, 227, 227);
        justify-content: space-between;

        .box_left {
            width: 70%;
            height: 100%;
            display: flex;

            .xuanzhuan {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;
                height: 100%;

                .xuanzhuan_img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    box-shadow: 0 0 0 3px rgba(0, 0, 0.5);
                    animation: rotate_ar 5.5s linear infinite;
                }


                .img_ar_active {

                    animation-play-state: running;
                }

                .img_ar_pauesd {
                    animation-play-state: paused;
                }

                @keyframes rotate_ar {
                    0% {
                        transform: rotateZ(0deg);
                    }

                    100% {
                        transform: rotateZ(360deg);
                    }
                }
            }

            .song_name {
                display: flex;
                align-items: center;
                width: 70%;
                height: 100%;
                font-size: 16px;
                font-weight: 700;

                .fv_name {
                    min-width: 50px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }


                .art {
                    width: 100px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    font-weight: 400;
                    color: #999;
                }
            }
        }

        .box_right {
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;

            .play {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;

                .van-circle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .bars {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;
            }
        }
    }

    .musicplayList {
        .van-popup {
            border-radius: 15px;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

}
</style>

<style lang="less">

</style>