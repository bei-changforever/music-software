<template>
    <div class="hotmusic">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" color="black" @click="$router.go(-1)" />歌单广场
            </template>
        </van-nav-bar>
        <!-- <div class="navbar">
            <div class="navbar-left">
                <van-swipe :loop="false" :width="100" :show-indicators="false">
                    <van-swipe-item  v-for="(item, index) in showDate" :key="index">
                      <p class="need" :class="(index === activeIndex) ? 'active': ''" @click="chooseBAR(index)">{{item.name}}</p>  
                    </van-swipe-item>
                </van-swipe>

            </div>
            <div class="navbar-right">
                <van-icon name="edit" />
            </div>
        </div> -->
        <van-tabs v-model="activeName">
            <van-tab v-for="(item, index) in hotMusicTag" :key="item.id" :title="item.name" :name="item.name" >
                <div class="tagMusic_content">
                    <ul>
                        <li v-for="(val, i) in hotmusicList">
                            <div class="contentbox" @click="gotoItemMusic(val.id)">
                                <div class="img">
                                    <img class="auto-img" :src="val.coverImgUrl" alt="">
                                </div>
                                <div class="playcount">
                                    <i class="iconfont icon-shipinbofangshibofang"></i>
                                    {{ changeCount(val.playCount) }}
                                </div>
                            </div>
                            <div class="topic">{{ val.name }}</div>
                        </li>
                        <span style="width: 100px;height: 0"></span>
                        <span style="width: 100px;height: 0"></span>
                        <span style="width: 100px;height: 0"></span>
                    </ul>
                </div>
            </van-tab>
        </van-tabs>


        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>

import { mapState, mapMutations } from 'vuex'
export default {
    name: 'HotMusic',
    data() {
        return {
            hotMusicTag: [],
            hotmusicList: [],
            activeName: this.$store.state.tag

        }
    },

    computed: {
        ...mapState(['tag']),
    },
    created() {
        this.getHotMusic()
        this.getTagMusic()
        console.log(this.tag)
    },
    methods: {
        getHotMusic() {
            this.axios({
                method: 'get',
                url: '/playlist/highquality/tags'
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.hotMusicTag = res.data.tags
                }
            })
        },
        getTagMusic() {
            this.axios({
                method: 'get',
                url: '/top/playlist/highquality',
                params: {
                    cat:  this.activeName,
                    limit: 10
                }
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.hotmusicList = res.data.playlists
                }
                console.log("1111",this.hotmusicList)
            })
        },

        changeCount(num) {
            if (num > 1000000000) {
                return (num / 1000000000).toFixed(1) + '亿'
            }
            else if (num > 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
            else {
                return num
            }
        },
        gotoItemMusic(id) {
            this.$router.push({
                name: 'ItemMusic',
                query: {
                    id
                }
            })
        },
        ...mapMutations(['updateTag'])
    },
    watch : {
        activeName(newval) {
            this.getTagMusic()
            this.updateTag(newval)
        }
    }

}
</script>
<style lang="less" scoped>
.hotmusic {
    width: 100vw;
    height: 100vh;

    .navbar {
        width: 100%;
        height: 40px;
        // background-color: pink;
        display: flex;

        .navbar-left {
            width: 90%;
            height: 100%;

            .van-swipe {
                width: 100%;
                height: 100%;

                .van-swipe-item {
                    // background-color: orange;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                    vertical-align: bottom;

                    .need {
                        position: relative;
                        // color: red;
                        font-size: 16px;
                        // background-color: pink;
                        text-align: center;
                        line-height: 40px;
                        width: 40px;
                        height: 40px;
                        vertical-align: bottom !important;

                        // &::after {
                        //     content: '';
                        //     position: absolute;
                        //     left: 0;
                        //     bottom: 0px;
                        //     width: 40px;
                        //     height: 5px;
                        //     border-radius: 25px;
                        //     background-color: rgb(231,77,67);
                        // }


                        .active {
                            border-bottom: 2px solid rgb(231, 77, 67);
                        }


                    }
                }
            }
        }

        .navbar-right {
            width: 10%;
            height: 100%;
            background-color: skyblue;
            font-size: 30px;
            text-align: center;
            line-height: 40px;
        }
    }

    .tagMusic_content {
        padding: 10px;
        width: 100%;
        height: auto;

        ul {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                margin-top: 15px;
                width: 100px;
                height: 140px;
                // background-color: pink;
                display: flex;
                flex-direction: column;


                .contentbox {
                    position: relative;
                    width: 100%;
                    height: 70%;

                    .img {
                        width: 100px;
                        height: 100px;
                        box-shadow: 10px -10px 10px rgb(238, 236, 238);

                        .auto-img {
                            width: 100%;
                            display: block;
                            border-radius: 15px;
                        }

                    }


                    .playcount {
                        position: absolute;
                        top: 5px;
                        min-width: 50px;
                        height: 20px;
                        padding: 2px;
                        right: 5px;
                        background-color: rgb(118, 118, 118);
                        color: white;
                        border-radius: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                    }
                }

                .topic {
                    margin-top: 5px;
                    width: 100%;
                    height: auto;
                }

            }
        }
    }
}
</style>