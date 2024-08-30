<template>
    <div class="item_top">
        <div class="item_head">
            <img class="auto-img" :src="playListData.coverImgUrl" alt="">
            <div class="mark">
                <div class="item_nav">
                    <div class="item_left">
                        <p>
                            <van-icon name="arrow-left" class="icon_left" @click="$router.go(-1)" />
                        </p>
                        <p class="text">歌单</p>
                    </div>
                    <div class="item_right">
                        <p>
                            <van-icon name="search" class="icon_right" @click="$router.push({ name: 'Search' })" />
                        </p>
                        <p>
                            <i class="iconfont icon-gengduo"></i>
                        </p>
                    </div>
                </div>
                <div class="item_detail">
                    <div class="img_box">
                        <div class="img">
                            <img class="user_img" :src="playListData.coverImgUrl" alt="">
                        </div>
                        <div class="detail">
                            <ul>
                                <li class="w_text">{{ playListData.name }}</li>
                                <li>
                                    <div class="user_head">
                                        <img :src="haveCreator.avatarUrl" alt="">
                                    </div>
                                    <div class="user_name g_text">
                                        {{ haveCreator.nickname }}
                                        &nbsp;
                                        <van-tag type="warning">+关注</van-tag>
                                    </div>
                                </li>
                                <li class="tag g_text">
                                    <van-tag color="rgba(128,128,128,0.3)" text-color="white"
                                        v-for="(item, index) in playListData.tags">
                                        {{ item }}
                                    </van-tag>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="desc">
                        <p>{{ playListData.description }}</p>
                    </div>
                    <div class="detail_nav">
                        <ul>
                            <li>
                                <van-button color="rgba(128,128,128,0.3)" round>
                                    <van-icon name="share" />
                                    <div class="count">{{ changeCount(playListData.shareCount) }}</div>

                                </van-button>
                            </li>
                            <li>
                                <van-button color="rgba(128,128,128,0.3)" round @click="FoundComments(playListData.id)">
                                    <van-icon name="chat" />
                                    <div class="count">{{ changeCount(playListData.commentCount) }}</div>
                                </van-button>
                            </li>
                            <li>
                                <van-button color="rgb(128,128,128,0.3)" round v-if="!playListData.copied"
                                    @click="myLike(playListData)">
                                    <van-icon name="star" />
                                    <div class="count">{{ changeCount(playListData.subscribedCount) }}</div>
                                </van-button>
                                <van-button color="rgb(233,73,73)" round v-else @click="myLike(playListData)">
                                    <van-icon name="star" />
                                    <div class="count">{{ changeCount(playListData.subscribedCount) }}</div>
                                </van-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'ItemTop',
    props: {
        playListData: {

        }
    },
    data() {
        return {
            hcreator: {}
        }
    },
    computed: {
        haveCreator() {
            if (!this.playListData.creator) {
                this.hcreator = JSON.parse(sessionStorage.getItem("itemDetail")).creator
            }
            else {
                this.hcreator = this.playListData.creator
            }
            // console.log(this.hcreator)
            // console.log('qweqwe=>', this.playListData)
            return this.hcreator
        },
        ...mapState(['myLikeList','isLogin'])
    },
    created() {
        // let likeList = JSON.parse(localStorage.getItem('mychooselikemusic'))
        // console.log(likeList)
        // let res = likeList.some(item => {
        //     return this.playListData == item
        // })

        // console.log(res);

    },
    methods: {
        changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            } else {
                return num
            }
        },
        FoundComments(id) {
            this.$router.push({
                name: 'GeDanComments',
                query: {
                    id
                }
            })
        },
        myLike(item) {

            if(this.isLogin) {
                let locMyLike = JSON.parse(localStorage.mychooselikemusicID)
            // console.log(item)
            item.copied = !item.copied

            if (item.copied == true) {
                // localStorage.setItem('MyLikeGeDan',JSON.stringify(item))
                this.updatemyLikeList(item)

                locMyLike = [
                    item.id,
                    ...locMyLike
                ]
                localStorage.mychooselikemusicID = JSON.stringify(locMyLike)
            }

            if (item.copied == false) {
                locMyLike = locMyLike.filter((val, index) => {
                    return val != item.id
                })

                // console.log(locMyLike);

                localStorage.mychooselikemusicID = JSON.stringify(locMyLike)
            }
            }
            else {
                this.$toast({
                    message: '请先登录'
                })
                item.copied = false
            }
            

        }
        ,
        ...mapMutations(['updatemyLikeList'])
    }
}
</script>
<style lang="less" scoped>
.item_top {
    width: 100%;
    height: auto;

    .item_head {
        position: relative;
        width: 100%;
        height: 270px;

        .auto-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 260px;
            z-index: 0;
            filter: blur(25px);
        }

        .mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background-color: pink;
            z-index: 1;

            .item_nav {
                padding: 10px;
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                // background-color: pink;

                .item_left {
                    width: 100px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    // background-color: skyblue;

                    .icon_left {
                        font-size: 25px;
                        color: white;
                        line-height: 30px;
                    }

                    .text {
                        width: 50%;
                        height: 100%;
                        font-size: 25px;
                        color: white;
                        line-height: 30px;
                        font-weight: 700;
                    }
                }

                .item_right {
                    width: 100px;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    // background-color: orange;



                    .icon_right {
                        color: white;
                        font-size: 25px;
                        line-height: 30px;
                    }


                    i {
                        color: white;
                        font-size: 25px;
                        line-height: 30px;
                    }

                }
            }

            .item_detail {
                padding: 10px;
                width: 100%;
                height: calc(100% - 50px);
                // background-color: pink;

                .img_box {
                    width: 100%;
                    height: 70%;
                    // background-color: orange;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .img {
                        width: 40%;
                        height: 100%;

                        .user_img {
                            width: 100%;
                            display: block;
                            border-radius: 15px;
                        }
                    }

                    .detail {
                        width: 58%;
                        height: 100%;

                        ul {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;

                            li {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                // background-color: skyblue;

                                .user_head {
                                    width: 30px;
                                    height: 30px;
                                    margin-right: 10px;

                                    img {
                                        width: 30px;
                                        height: 30px;
                                        display: block;
                                        border-radius: 50%;
                                    }
                                }
                            }

                            .tag {
                                .van-tag {
                                    margin-right: 10px;
                                }
                            }

                            .w_text {
                                font-size: 0.26rem;
                                color: white;
                            }

                            .g_text {
                                color: white;
                            }
                        }
                    }
                }

                .desc {
                    margin-top: 10px;
                    width: 100%;
                    height: 5%;
                    display: flex;
                    align-items: center;
                    color: white;

                    p {
                        width: 365px;
                        height: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .detail_nav {
                    margin-top: 10px;
                    width: 100%;
                    height: 25%;
                    // background-color: pink;

                    ul {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        li {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .van-button {
                                width: 100px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>