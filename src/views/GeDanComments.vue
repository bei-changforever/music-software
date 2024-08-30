<template>
    <div class="gedanComments">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" color="black" @click="$router.go(-1)" />歌单评论
            </template>
        </van-nav-bar>
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
                                    @click="like(item)" /><van-icon name="like" v-else @click="like(item)" /></div>
                        </div>
                        <div class="desc">{{ item.content }}</div>
                        <div class="huifu" @click="changeShow(item)">
                            <p style="color: rgb(6,128,215)">回复({{ item.likedCount }})<van-icon name="arrow" /></p>
                        </div>
                    </div>
                </li>
            </ul>
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
                    <CommentTop :key-list="keyList" :now-comments="nowComments" @upkeyList="updataFun"></CommentTop>
                </div>
                <van-field v-model="keyword" center clearable placeholder="发送评论">
                    <template #button>
                        <van-button size="small" round type="info" @click="send">发送</van-button>
                    </template>
                </van-field>
            </van-popup>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import CommentTop from '../components/CommentTop.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'GeDanComments',
    data() {
        return {
            //热门评论数据
            hotComments: [],
            //当前查看的评论
            nowComments: {},
            show: false,
            keyword: '',
            keyList: []
        }
    },
    computed: {
        ...mapState(['isLogin', 'commentId'])
    },
    components: {
        CommentTop
    },
    mounted() {
        this.keyList = JSON.parse(localStorage.getItem("keycomlist")) ? JSON.parse(localStorage.getItem("keycomlist"))
            : [];
    },
    created() {
        let id = this.$route.query.id
        this.getgedanComment(id)
    },
    methods: {
        changeShow(item) {
            this.nowComments = item
            // 点击回复 获取当前评论的id值
            this.updatecommentId(item.commentId)
            // 弹出评论组件
            this.show = !this.show

            if (localStorage[`keycomlist_${this.commentId}`]) {
                console.log('存在');
                this.keyList = JSON.parse(localStorage[`keycomlist_${this.commentId}`])
            } else {
                let steArr = []
                localStorage[`keycomlist_${this.commentId}`] = JSON.stringify(steArr)
            }


        },
        getgedanComment(id) {
            this.axios({
                method: 'get',
                url: '/comment/playlist',
                params: {
                    id
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.hotComments = res.data.hotComments
                    console.log(this.hotComments)
                }
            })
        },
        like(item) {
            if (!this.isLogin) {
                this.$toast({
                    message: '请先登录'
                })
            }
            else {
                item.liked = !item.liked
            }

        },
        send() {
            //每次点开需要根据不同的userid渲染不同的评论数据,就需要点击的时候获得到当前点击的评论id

            if (!this.isLogin) {
                this.$toast({
                    message: '请先登录'
                })
            }
            else {
                if (this.keyword.length === 0) {
                    this.$toast({
                        message: '无内容'
                    })
                }
                else {
                    if (this.keyword !== '' && this.keyList.length <= 50) {
                        // this.keyList.unshift(replyObj)

                        // localStorage.setItem(`keycomlist_${this.commentId}`, JSON.stringify(this.keyList))
                        // this.keyword = ''

                        let time = new Date().toLocaleString()

                        let replyObj = {
                            //当前评论的Id
                            NowcommentId: this.commentId,
                            reply: [
                                {
                                    mes: this.keyword,
                                    Thattime: time
                                }
                            ]
                        }
                        // 定义一个变量 等于原 localStorage[`keycomlist_${this.commentId}`]中的数据
                        let getlocal = JSON.parse(localStorage[`keycomlist_${this.commentId}`])

                        getlocal = [
                            replyObj,
                            ...getlocal
                        ]

                        this.keyList = getlocal

                        localStorage[`keycomlist_${this.commentId}`] = JSON.stringify(getlocal)
                    }
                }
            }


            this.keyword = ''
        },

        updataFun() {
            console.log('刷新');
            this.keyList = JSON.parse(localStorage[`keycomlist_${this.commentId}`])
        },

        ...mapMutations(['updatecommentId'])

    },
    watch: {
        "$store.state.commentId"(newval) {

        }
    }
}
</script>
<style lang="less" scoped>
.gedanComments {
    width: 100vw;
    height: 100vh;

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
            }
        }
    }

}
</style>