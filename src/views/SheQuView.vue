
<template>
    <div class="shequ">
        <van-swipe class="my-swipe" :show-indicators="false" :loop="false" @change="onChange" style="height: 565px"
            vertical indicator-color="white">
            <van-swipe-item v-for="(item, index) in swiperList" :key="index">
                <div class="right_menus">
                    <div class="menuClick">
                        <img class="avatar" :src="item.avatar" alt="" />
                        <div class="follow"></div>
                    </div>
                    <div class="click-info">
                        <img class="icon" src="../assets/icon/icon_01.png" alt="" />
                        <div class="text">{{ item.fabulousNum }}</div>
                    </div>
                    <div class="click-info">
                        <img class="icon" src="../assets/icon/icon_02.png" alt="" />
                        <div class="text">{{ item.commentNum }}</div>
                    </div>
                    <div class="click-info">
                        <img class="icon" src="../assets/icon/icon_03.png" alt="" />
                        <div class="text">{{ item.shareNum }}</div>
                    </div>
                </div>
                <div class="text-container">
                    <div class="nickname">@{{ item.nickname }}</div>
                    <div class="msg">{{ item.msgInfo }}</div>
                </div>
                <div class="controls-btn">
                    <img src="../assets/images/播放.png" alt="" v-if="!playImg" >
                    <img src="../assets/images/24gl-pauseCircle.png" alt="" :class="'active'"  v-else >
                </div>
                <video loop class="video-content" :id="`player${index}`" :src="item.url"  @click="togglePlay(item,index)"></video>

            </van-swipe-item>
        </van-swipe>

    </div>
</template>
<script>
import avatar1 from "../assets/avatar/avatar_01.png";
import avatar2 from "../assets/avatar/avatar_02.jpg";
import avatar3 from "../assets/avatar/avatar_03.jpg";
import avatar4 from "../assets/avatar/avatar_04.jpg";
import { videoSrc } from "@/utils/vidoeSrc";
export default {
    name: 'SheQu',
    data() {
        return {
            playing: false,
            playImg: false,
            swiperList: [
                {
                    avatar: avatar3,
                    fabulousNum: "1234W",
                    commentNum: "10.2W",
                    shareNum: "9.2W",
                    nickname: "樱花漫剪",
                    play: false,
                    url: videoSrc[4],
                    msgInfo:
                        "【 以 我 残 躯 化 烈 火 】𝙁𝙡𝙮 𝙈𝙚 𝙩𝙤 𝙩𝙝𝙚 𝙈𝙤𝙤𝙣",
                },
                {
                    avatar: avatar1,
                    fabulousNum: "1234W",
                    commentNum: "3.2W",
                    shareNum: "1.2W",
                    nickname: "我是大色批",
                    play: false,
                    url: videoSrc[0],
                    msgInfo:
                        "【4K竖屏】上上下下_腿精来咯！UP&DOWN舞蹈混剪：黑丝特辑，8倍快乐",
                },
                {
                    avatar: avatar2,
                    fabulousNum: "558W",
                    commentNum: "16.2W",
                    shareNum: "12.2W",
                    nickname: "liqin是个Der",
                    play: false,
                    url: videoSrc[1],
                    msgInfo:
                        "肉肉摇起来！竖屏可好看了_ 纯欲风 Shake it ❤",
                },
                {
                    avatar: avatar3,
                    fabulousNum: "3345W",
                    commentNum: "122W",
                    shareNum: "62W",
                    nickname: "Hello Nick",
                    play: false,
                    url: videoSrc[2],
                    msgInfo:
                        "竖屏-性感黑丝秘书办公室蹦迪_thumbs up【清晨】_P1_竖频thumbs up 1080",
                },
                {
                    avatar: avatar4,
                    fabulousNum: "6889W",
                    commentNum: "163W",
                    shareNum: "107W",
                    nickname: "憨憨来啦",
                    play: false,
                    url: videoSrc[3],
                    msgInfo:
                        "正面 or 背面 你选哪个？竖屏",
                },
            ],
        };
    },
    created() {
        // document.title = "测试swiper";
        console.log(this.$route)
    },
    mounted() {
        setTimeout(() => {
        }, 1000);
    },
    methods: {
        onChange(index) {
            //   console.log(index);
            var player = document.getElementById(`player${index}`);
            if (player.paused) {
                this.swiperList.forEach((item, s_index) => {
                    if (s_index == index) {
                        document.getElementById(`player${s_index}`).play();
                        item.play = true;
                    } else {
                        document.getElementById(`player${s_index}`).pause();
                        item.play = false;
                    }
                });
            } else {
                this.swiperList.forEach((item, s_index) => {
                    document.getElementById(`player${s_index}`).pause();
                    item.play = false;
                });
            }
        },
        togglePlay(item,index) {
            console.log('点击了',index)
            let player = document.getElementById(`player${index}`)
            if(player.paused) {
                this.swiperList.forEach((item,t_index) => {
                    if(t_index === index) {
                        document.getElementById(`player${t_index}`).play()
                        this.playImg = false
                        item.play = true;
                    }
                    else {
                        document.getElementById(`player${t_index}`).pause();
                        this.playImg = true
                        item.play = false;
                    }
                })
            }else {
                this.swiperList.forEach((item,t_index) => {
                    if(index === t_index) {
                        document.getElementById(`player${t_index}`).pause();
                        this.playImg = false
                        item.play = false;
                    }
                })
            }
        }
    },
};
</script>
<style lang="less" scoped>
.shequ {
    margin-top: 50px;
    width: 100%;
    height: 100%;
    background: #fff;

    .my-swipe {
        width: 100%;

        .van-swipe-item {
            color: #fff;
            font-size: 0.2rem;
            text-align: center;
            background-color: black;
            position: relative;
            object-fit: fill;
            display: flex;
            align-items: center;
            justify-content: center;

            .video-content {
                width: 100%;
                height: 565px;
                object-fit: cover;
            }

            .right_menus {
                position: absolute;
                width: 1.2rem;
                padding: 0.02rem;
                box-sizing: border-box;
                bottom: 1.2rem;
                right: 0;

                .menuClick {
                    position: relative;
                    width: 100%;
                    margin-bottom: 0.2rem;

                    .avatar {
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;
                        border: #fff 0.02rem solid;
                    }
                }

                .click-info {
                    position: relative;
                    width: 1.2rem;

                    img {
                        width: 0.72rem;
                        height: 0.72rem;
                    }

                    .text {
                        width: 100%;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        color: #fff;
                        font-size: 0.16rem;
                    }
                }
            }

            .text-container {
                position: absolute;
                width: 6rem;
                left: 0;
                bottom: 0;
                padding: 0.2rem 0.1rem;
                box-sizing: border-box;

                .nickname {
                    width: 100%;
                    font-size: 0.32rem;
                    color: #fff;
                    height: 0.42rem;
                    line-height: 0.42rem;
                    text-align: left;
                }

                .msg {
                    position: relative;
                    width: 100%;
                    padding: 0.1rem 0;
                    box-sizing: border-box;
                    line-height: 0.3rem;
                    font-size: 0.28rem;
                    text-align: left;
                }
            }

            .controls-btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 50px;
                height: 50px;

                img {
                    width: 50px;
                    height: 50px;
                    display: block;
                }


                .active {
                    animation: dis 1s ease-in-out forwards;
                }


                @keyframes dis {
                    0% {
                        opacity: 1;
                        
                    }

                    25% {
                        opacity: 0.8;
                    }

                    50% {
                         opacity: 0.6;
                    }

                    75% {
                        opacity: 0.4;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            }



        }
    }


}
</style>
