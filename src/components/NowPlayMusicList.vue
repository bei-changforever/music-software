<template >
    <div class="nowplaymusicliat">
        <div class="top">
            <div class="currentPlay">
                <span class="big">当前播放</span>
                <span class="small">({{ nowPlayMusicList.length }})</span>
            </div>
            <div class="controlPlay">
                <div class="control_btn" @click="changePlayMode">
                    <div class="img">
                        <img src="../assets/images/列表循环.png" alt="" v-if="($store.state.playMode == 0)">
                        <img src="../assets/images/单曲循环_32.png" alt="" v-else-if="($store.state.playMode == 1)">
                        <img src="../assets/images/随机播放.png" alt="" v-else>
                    </div>
                    <div class="desc" v-if="($store.state.playMode == 0)">列表循环</div>
                    <div class="desc" v-else-if="($store.state.playMode == 1)">单曲循环</div>
                    <div class="desc" v-else>随机播放</div>

                </div>
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item, index) in nowPlayMusicList" @click="chooseSong(index)">
                    <div class="play_gif" v-if="($store.state.playListIndex === index)"><img
                            src="../assets/images/NowMusic.gif" alt=""></div>
                    <div class="name" :class="[$store.state.playListIndex === index ? 'active' : '']">{{ item.name }}
                    </div>
                    <div class="desc" :class="[$store.state.playListIndex === index ? 'active' : '']">
                        {{ item.ar[0].name }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'NowMusicPlayList',
    props: {
        nowPlayMusicList: {

        }
    },
    computed: {
        ...mapState(['playListIndex', 'playMode'])
    },
    methods: {
        chooseSong(index) {
            this.updateIndex(index)
        },
        changePlayMode() {
            console.log('触发')
            let mode = this.playMode
            if(mode === 2) {
                mode = 0
            }else {
                mode++
            }

            this.updatePlayMode(mode)
            
        },
        ...mapMutations(['updateIndex', 'updatePlayMode'])
    }
}
</script>
<style lang="less" scoped>
.nowplaymusicliat {
    width: 100%;
    height: 367px;
    // background-color: orange;

    .top {
        position: fixed;
        top: 0;
        padding: 10px;
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        background-color: white;

        .currentPlay {

            width: 100%;
            height: 30px;
            line-height: 30px;
            // background-color: skyblue;

            .big {
                font-size: 18px;
                font-weight: 700;
            }

            .small {
                color: #999;
            }
        }

        .controlPlay {
            width: 100%;
            height: 70px;
            // background-color: pink;
            border-bottom: 1px solid rgb(230, 230, 230);

            .control_btn {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;

                .img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;

                    img {
                        width: 20px;
                        display: block;
                    }
                }

                .desc {
                    font-size: 15px;
                }
            }
        }
    }

    .list {
        margin-top: 80px;
        width: 100%;
        height: 365px;
        // background-color: pink;
        overflow: scroll;

        ul {
            width: 100%;
            height: auto;
            padding: 10px;

            li {
                width: 100%;
                height: 70px;
                display: flex;
                // background-color: orangered;

                .play_gif {
                    width: 70px;
                    height: 70px;
                    margin-right: 10px;

                    img {

                        width: 70px;
                        display: block;
                    }
                }

                .name {
                    max-width: 100px;
                    height: 70px;
                    text-align: center;
                    line-height: 70px;
                    font-size: 18px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-right: 10px;
                }

                .active {
                    color: rgb(223, 81, 73);
                }

                .desc {
                    max-width: 100px;
                    height: 70px;
                    text-align: center;
                    line-height: 70px;
                    color: #999;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>