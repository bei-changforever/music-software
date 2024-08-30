<template>
    <div class="lyric">
        <!-- 背景图片 -->
        <div class="container">
            <div class="fk_ashole">
                <img :src="musicList.al.picUrl" alt="" />
            </div>
            <!-- 毛玻璃 -->
            <div class="main">
                <!-- 标题部分 -->
                <div class="top">
                    <!-- 下拉 -->
                    <div class="xiala"></div>
                    <!-- 歌词标题 -->
                    <!-- <audio ref="audio" src="./audio/赛博朋克边缘行者.mp3" controls style="display: none;"
                        @canplay="renderTotalTime" @timeupdate="renderCurrentTime"></audio> -->
                    <div class="topic">
                        {{ musicList.al.name }}
                    </div>
                    <!-- 分享 -->
                    <div class="share"><i class="iconfont icon-fenxiang"></i></div>
                </div>
                <!-- 歌词部分 -->
                <div class="center">
                    <!-- 唱片 -->
                    <div class="changpian" :class="showLyric ? 'content_hide' : 'content_show'">
                        <!-- 顶针 -->
                        <div class="dinzhen" :class="!$store.state.isbtnShow ? 'transition' : ''"></div>
                        <!-- 黑胶 -->
                        <div class="heijiao" @click="showLyricBtn">
                            <div class="heijiaomark" :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }">
                            </div>
                            <img :src="musicList.al.picUrl" alt="" />
                        </div>
                    </div>
                    <!-- 歌词 -->
                    <div class="lyricbox" :class="showLyric ? 'content_show' : 'content_hide'">
                        <div class="lyric">
                            <!-- 音频 -->
                            <div class="lyric-left" @click="showLyricBtn">
                                <i class="iconfont icon-yinpinaudio47"></i>
                            </div>
                            <!-- 歌词 -->
                            <div class="lyric-center">
                                <ul ref="lyricUl">
                                    <li ref="lyricLi" v-for="(item, index) in renderLyric"
                                        :class="{ active: $store.state.currentTime * 1000 >= item.time && $store.state.currentTime * 1000 < item.pre }">
                                        {{ item.lyc }}
                                    </li>
                                </ul>
                            </div>
                            <!-- 投屏 -->
                            <div class="lyric-right" @click="showLyricBtn">
                                <i class="iconfont icon-touping"></i>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 控制器 -->
                <div class="bottom">
                    <!-- 社区功能 -->
                    <div class="inter">
                        <ul>
                            <li>

                                <i @click="chooseMyLove(musicList)" v-if="(musicList.st == 1)"
                                    class="iconfont icon-xihuan-xianxing" style="color: red;"></i>

                                <i @click="chooseMyLove(musicList)" v-else class="iconfont icon-xihuan-xianxing"></i>

                            </li>
                            <li><i class="iconfont icon-yunxiazai_o"></i></li>
                            <li><i class="iconfont icon-changge"></i></li>
                            <li @click="toggleComment(musicList.id)"><i class="iconfont icon-jianyi"></i></li>
                            <li><i class="iconfont icon-gengduo-shuxiang"></i></li>
                        </ul>
                    </div>
                    <!-- 进度条 -->
                    <div class="progress">
                        <!-- 播放中时间 -->
                        <div class="currentTime">
                            {{ formatime($store.state.currentTime) }}
                        </div>
                        <!-- 进度控制器 -->
                        <div class="line" ref="runfatbar">
                            <!-- <div ref="runbar" class="line-mark">
                            </div>
                            <div class="circle" ref="move"></div> -->
                            <van-slider v-model="$store.state.currentTime" :min="0" :max="$store.state.totalTime"
                                :step="0.05" bar-height="4px" active-color="#ee0a24" @drag-start="Draging(true)"
                                @drag-end="Draging(false)" @change="sliderChange" />

                        </div>
                        <!-- 总时长 -->
                        <div class="total">
                            {{ formatime(totalTime) }}
                        </div>
                    </div>
                    <!-- 控件 -->
                    <div class="control">
                        <ul>
                            <li @click="prePlay"><i class="iconfont icon-shangyishoushangyige"></i></li>
                            <li @click="play" v-if="$store.state.isbtnShow"><i
                                    class="iconfont icon-shipinbofangshibofang"></i></li>
                            <li @click="play" v-else><i class="iconfont icon-zanting"></i></li>
                            <li @click="nextPlay"><i class="iconfont icon-xiayigexiayishou"></i></li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
        <div class="fuck">
            <van-popup v-model="show" closeable close-icon="arrow-left" close-icon-position="top-left" position="bottom"
                :style="{ height: '90%' }">
                <van-nav-bar>
                    <template #title>
                        <p style="font-size: 18px">回复</p>
                    </template>
                </van-nav-bar>
                <div class="comment_container">
                    <div class="hotcomments">
                        <ul>
                            <li v-for="(item, index) in hotComments">
                                <div class="left">
                                    <img class="auto-img" :src="item.user.avatarUrl" alt="">
                                </div>
                                <div class="right">
                                    <div class="nickname">
                                        <div class="nickname-left">{{ item.user.nickname }}
                                            <br>
                                            <p style="color: #999;font-size: 12px;">{{ item.timeStr }}</p>
                                        </div>
                                        <div class="nickname-right"><van-icon name="like" color="red" v-if="item.liked"
                                                @click="like(item)" /><van-icon name="like" v-else
                                                @click="like(item)" /></div>
                                    </div>
                                    <div class="desc">{{ item.content }}</div>
                                    <div class="huifu" @click="changeShow(item)">
                                        <p style="color: rgb(6,128,215)">回复({{ item.likedCount }})<van-icon
                                                name="arrow" /></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'Lyric',
    props: {
        musicList: {

        },
        play: {

        },
    },
    data() {
        return {
            show: false,
            showLyric: false,
            //处理后的歌词数据
            lyricres: [],
            //歌词liDom
            lyricLi: null,
            nowTime: 0,
            hotComments: []
        }
    },
    computed: {
        ...mapState(['currentTime', 'isbtnShow', 'playListIndex', 'playList', 'totalTime', 'isDraging', '$audio', 'playMode']),
        renderLyric() {
            // this.lyricres
            // let lyric
            // let lyricData = []
            let arr
            if (this.$store.state.lyricList.lyric) {
                // console.log('未处理的歌词=>',this.$store.state.lyricList.lyric)
                // lyric = this.$store.state.lyricList.lyric.split(/\n/)

                // lyric.forEach(lyc => {
                //     let lycData = lyc.split(/\]/);
                //     // console.log('lycData=>',lycData)
                //     if (!lycData[1] || !lycData[0]) {
                //         return;
                //     }

                //     //处理歌词时间点
                //     let lycTime = lycData[0].slice(1).split(/:/);


                //     lyricData.push({
                //         time: Number(lycTime[0]) * 60 + parseFloat(lycTime[1]),
                //         lyc: lycData[1].trim()
                //     })
                // })


                // lyricData.forEach((item, i) => {
                //     if (i === lyricData.length - 1 || isNaN(lyricData[i + 1].time)) {
                //         item.pre === 100000
                //     }
                //     else if (lyricData[i + 1].time == 0 || lyricData[i].time == 0) {
                //         item.pre === 1
                //     }
                //     else {
                //         item.pre = lyricData[i + 1].time
                //     }
                // })

                // console.log("lyricData处理后的歌词=>", lyricData)
                // return lyricData

                arr = this.$store.state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    // console.log(item)
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let lyc = item.slice(11, item.length)
                    let time = parseInt(min) * 60 * 1000 + parseFloat(sec) * 1000 + parseInt(mill)
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9)
                        lyc = item.slice(10, item.length)
                        time = parseInt(min) * 60 * 1000 + parseFloat(sec) * 1000 + parseInt(mill)
                    }
                    //  console.log(min,sec,Number(mill),lyc)
                    return { min, sec, mill, lyc, time }
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000
                    } else {
                        item.pre = arr[i + 1].time
                    }
                })


                console.log("arr处理后的歌词=>", arr)
                return arr
            }

        },
    },
    created() {
        console.log('歌曲=>', this.musicList)
    },
    methods: {
        showLyricBtn() {
            this.showLyric = !this.showLyric
            console.log(this.showLyric)
        },
        // goPlay(num) {
        //     console.log(num)
        //     let index = this.playListIndex + num
        //     if (index < 0) {
        //         index = this.playList.length - 1
        //     } else if (index == this.playList.length) {
        //         index = 0
        //     }
        //     this.updateIndex(index)
        // },
        prePlay() {
            let index = this.playListIndex
            if (this.playMode === 0) {
                index--
                if (index < 0) {
                    index = this.playList.length - 1
                }
            } else if (this.playMode === 1) {
                //单曲循环
                this.$audio.currentTime = 0
                this.$audio.play()
            } else {
                //随机播放
                 index = Math.floor(Math.random() * this.playList.length)

            }
            this.updateIndex(index)
        },
        nextPlay() {
            let index = this.playListIndex
            if (this.playMode === 0) {
                index++
                if (index === this.playList.length) {
                    index = 0
                }
            } else if (this.playMode === 1) {
                this.$audio.currentTime = 0
                this.$audio.play()

            } else {
                //随机播放
                 index = Math.floor(Math.random() * this.playList.length)

            }
            this.updateIndex(index)
        },
        addZero(num) {
            return num < 10 ? "0" + num : num
        },
        formatime(totalSeconds) {
            let h = this.addZero(Math.floor(totalSeconds) / 60 / 60 % 24)
            let m = this.addZero(parseInt(Math.floor(totalSeconds) / 60 % 60))
            let s = this.addZero(Math.floor(totalSeconds) % 60)
            // this.$store.commit('updateTotalTime',`${m}:${s}`)
            return `${m}:${s}`
        },
        Draging(bol) {
            this.updateisDraging(bol)
        },
        sliderChange(val) {
            console.log(val)
            // this.updateCurrentTime(val)
            console.log(this.$audio)
            this.$audio.currentTime = val
        },
        chooseMyLove(item) {
            // console.log(item)

            let locMyLove = JSON.parse(localStorage.myLoveMusicID)
            //不喜欢
            if (item.st == 0) {
                item.st = 1

                locMyLove = [
                    item.id,
                    ...locMyLove
                ]

                localStorage.myLoveMusicID = JSON.stringify(locMyLove)

                //喜欢
            } else {
                item.st = 0
                console.log('执行')

                locMyLove = locMyLove.filter(val => {
                    return val != item.id
                })

                localStorage.myLoveMusicID = JSON.stringify(locMyLove)

            }
        },
        getComment(id) {
            this.axios({
                method: 'get',
                url: '/comment/music',
                params: {
                    id,
                    limit: 20
                }
            }).then(res => {
                if (res.data.code === 200) {
                    console.log(res)
                    this.hotComments = res.data.hotComments
                }
            })
        },
        toggleComment(id) {
            this.getComment(id)
            this.show = !this.show
        },
        ...mapMutations(['updateIndex', 'updateCurrentTime', 'updateIsbtnShow', 'updateisDraging', 'setAudio', 'updaterate']),
    },
    watch: {
        currentTime(newval) {
            let li = document.querySelector("li.active")
            if (li) {
                if (li.offsetTop > 200) {
                    this.$refs.lyricUl.scrollTop = li.offsetTop - 200
                }
            }

            if (newval == this.totalTime) {
                console.log("相等了")
                this.$refs.lyricUl.scrollTop = 0
            }
        },

    }
}
</script>
<style lang="less" scoped>
.lyric {
    width: 100vw;
    height: 100vh;
    touch-action: none;

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        color: white;


        .fk_ashole {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            object-fit: fill;
            position: absolute;

            img {
                width: 100%;
                height: 100%;

            }

        }

        .main {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            background: rgba(29, 29, 31, 0.72);
            backdrop-filter: saturate(180%) blur(15px);

            .top {
                width: 100vw;
                height: 50px;
                /* background-color: pink; */
                display: flex;
            }

            .xiala {
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;

            }

            .topic {
                width: 275px;
                height: 50px;
                margin-top: 5px;
                text-align: center;
                line-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 18px;
            }

            .share {
                width: 50px;
                height: 50px;
                margin-top: 5px;
                text-align: center;
                line-height: 50px;

                i {
                    font-size: 18px;
                }
            }

            .center {
                position: relative;
                display: flex;
                justify-content: center;
                width: 100vw;
                height: 517px;
                /* background-color: pink; */
            }


            .changpian {
                position: relative;
                width: 250px;
                height: 300px;
                /* background-color: orange; */
                transform-style: preserve-3d;
            }

            .lyric {
                position: absolute;
                display: flex;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                /* background-color: pink; */
            }


            .content_show {
                display: block;
            }


            .content_hide {
                display: none;
            }

            .lyric-left {
                width: 62.5px;
                height: 100%;
                text-align: center;
            }

            .lyric-right {
                width: 62.5px;
                height: 100%;
                text-align: center;
            }

            .lyric-center {
                width: 250px;
                height: 500px;
                // overflow: hidden;
                // background-color: skyblue;
            }

            .lyric-center ul {
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
                padding: 0;
                transition: all .5s linear;
                color: rgb(107, 107, 107);

                &::-webkit-scrollbar {
                    display: none;
                }


            }

            .lyric-center ul li {
                text-align: center;
                width: 100%;
                height: 40px;
                //  background-color: pink; 
                transition: .3s all linear;
                font-size: 12px;
            }

            .active {
                font-size: 15px;
                color: #fff;
                font-weight: bold;
            }

            .lyric-center ul li.active {
                font-size: 15px;
                color: #fff;
                font-weight: bold;
            }

            .dinzhen {
                position: absolute;
                top: 10px;
                right: calc(50% - 100px);
                width: 120px;
                height: 200px;
                /* border: 1px solid red; */
                background-image: url(../assets/images/dinzhen.png);
                background-repeat: no-repeat;
                background-size: 110px 200px;
                transform-origin: 12px 20px;
                z-index: 1;
                transform: rotate(-30deg);
                transition: all .3s linear;
            }

            .transition {
                transform: rotate(0);
                transition: all .3s linear;
            }

            .heijiao {
                position: absolute;
                border-radius: 50%;
                bottom: 0;
                left: calc(50% - 75px);
                width: 150px;
                height: 150px;
                transform-origin: center center;
            }



            .heijiao img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }

            .heijiaomark {
                position: absolute;
                top: -25px;
                left: -25px;
                width: 200px;
                height: 200px;
                background: url(../assets/images/sp2.png) no-repeat -140px -580px;
                width: 206px;
                height: 205px;
                transform-origin: center center;
                /* animation: move 5.5s linear infinite  ; */
                animation: rotate_ar 5.5s linear infinite;
            }



            .bottom {
                display: flex;
                flex-direction: column;
                width: 100vw;
                height: 100px;
            }

            .inter {
                width: 100vw;
                height: 30px;
                /* background-color: orange; */
            }

            .inter ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
            }

            .inter ul li {
                width: 30px;
                height: 30px;
                margin-left: 20px;
            }

            .inter ul li i {
                font-size: 30px;
            }

            .progress {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100vw;
                height: 40px;
                /* background-color: tomato; */
            }


            .currentTime,
            .total {
                font-size: 12px;
            }

            .progress .line {
                position: relative;
                width: 250px;
                height: 3px;
                background-color: rgba(255, 255, 255, .65);
                ;
            }

            .line-mark {
                width: 0;
                height: 100%;
                background-color: red;
            }

            .circle {
                position: absolute;
                left: -5px;
                top: -1px;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: white;
            }

            .control {
                width: 100vw;
                height: 30px;
                /* background-color: aquamarine; */
            }

            .control ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .control ul li {
                width: 26px;
                height: 30px;
                margin-left: 20px;
            }

            .control ul li img {
                width: 26px;
                height: 26px;
            }

            // .isStop {
            //     animation-play-state: paused;
            // }

            // .isAction {
            //     animation-play-state: running;
            // }

            // .heijiaomark_move {
            //     animation: move 5.5s linear infinite
            // }

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


    }

    .fuck {
        width: 100%;
        height: auto;

        .van-popup {
            border-radius: 15px 15px 0 0;

            .van-nav-bar {
                margin-top: 2px;
            }

            .comment_container {
                width: 100%;
                height: 495px;
                overflow: scroll;

                .hotcomments {
                    padding: 10px;
                    width: 100%;
                    height: auto;

                    ul {
                        width: 100%;
                        height: auto;
                        background-color: white;
                        border-radius: 15px;

                        li {
                            padding: 10px;
                            margin-top: 15px;
                            width: 100%;
                            height: auto;
                            display: flex;


                            .left {
                                width: 20%;
                                height: auto;
                                display: flex;
                                justify-content: center;

                                .auto-img {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    display: block;
                                }
                            }

                            .right {
                                display: flex;
                                flex-direction: column;
                                width: 80%;
                                height: auto;
                                // background-color: pink;

                                .nickname {
                                    font-size: 18px;
                                    width: 100%;
                                    height: auto;
                                    // background-color: orange;
                                    display: flex;
                                    justify-content: space-between;
                                }

                                .desc {
                                    width: 100%;
                                    height: auto;
                                    font-size: 14px;
                                }


                                .huifu {
                                    width: 100%;
                                    height: 20px;
                                    height: auto;
                                    display: flex;
                                    align-items: center;
                                }

                            }
                        }
                    }

                }

            }
        }
    }
}
</style>