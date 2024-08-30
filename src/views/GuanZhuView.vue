<template>
    <div class="guanzhu">
        <div class="huatibox">
            <ul>
                <li v-for="(item, index) in hotTopicList" @click="gotoHotTopList(item.actId)">
                    <div class="content">
                        <div class="left">
                            <img class="auto-img" :src="item.sharePicUrl" alt="">
                        </div>
                        <div class="right">
                            <div class="top">
                                {{ item.title }}
                            </div>
                            <div class="bottom">
                                {{ item.text[0] }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="dianzi" style="height: 15vh"></div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'GuanZhu',
    data() {
        return {
            hotTopicList: []
        }
    },
    created() {
        this.getHotTopic()
    },
    methods: {
        getHotTopic() {
            this.axios({
                method: 'get',
                url: '/hot/topic'
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.hotTopicList = res.data.hot
                    console.log(this.hotTopicList)
                }
            })
        },
        gotoHotTopList(id) {
            this.$router.push({
                name: 'HotTopList',
                query: {
                    actid: id
                }
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
    }
}
</script>
<style lang="less" scoped>
.guanzhu {
    width: 100vw;
    height: auto;

    .huatibox {
        margin-top: 60px;
        width: 100%;
        height: auto;
        // background-color: pink;

        ul {
            padding: 10px;
            width: 100%;
            height: auto;



            li {
                margin-bottom: 10px;
                width: 100%;
                height: 100px;
                background-color: white;
                border-radius: 15px;
                .content {
                    border-radius: 15px;
                    width: 100%;
                    height: 100%;
               
                    display: flex;

                    .left {
                        width: 30%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        // background-color: skyblue;

                        .auto-img {
                            width: 80px;
                            height: 80px;
                            border-radius: 15px;
                            display: block;
                        }
                    }

                    .right {
                        width: 70%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
              
                        justify-content: center;
                        // background-color: pink;

                        .top {
                            font-size: 18px;
                            font-weight: 600;
                            width: 240px;
                            height: 40px;
                            line-height: 40px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }


                        .bottom {
                            width: 240px;
                            height: 40px;
                            line-height: 40px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: #999;
                        }
                    }
                }
            }
        }

        // .van-swipe {
        //     width: 100%;
        //     height: 100%;

        //     .van-swipe-item  {
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //         .content {
        //             padding: 5px;
        //         border-radius: 15px;
        //         width: 95%;
        //         height: 80%;
        //         background-color: white;
        //             display: flex;
        //         .left {
        //             width: 40%;
        //             height: 100%;
        //             display: flex;
        //             justify-content: center;
        //             align-items: center;

        //             .auto-img {
        //                 width: 60px;
        //                 height: 60px;
        //                 border-radius: 15px;
        //                 display: block;
        //             }
        //         }

        //         .right {
        //             width: 60%;
        //             height: 100%;
        //             display: flex;
        //             flex-direction: column;
        //             align-items: center;
        //             justify-content: center;

        //             .top {
        //                 width: 108px;
        //                 height: 20px;
        //                 white-space: nowrap;
        //                 overflow: hidden;
        //                 text-overflow: ellipsis;
        //             }


        //             .bottom {
        //                 width: 108px;
        //                 height: 40px;
        //                 line-height: 40px;
        //                 white-space: nowrap;
        //                 overflow: hidden;
        //                 text-overflow: ellipsis;
        //             }
        //         }
        //     }
        //     }


        // }
    }
}
</style>