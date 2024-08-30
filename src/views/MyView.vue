<template>
    <div class="my">
        <div class="my_box">

            
            <div class="tou" v-if="!isLogin">
                <div class="img">
                    <img class="auto-img" src="../assets/images/插图1.jpg" alt="">
                </div>
                <div class="my_name">点击登录<van-icon name="arrow" @click="gotoLogin"/></div>
                <div class="user_lel">
                    <ul>
                        <li>关注</li>
                        <li>粉丝</li>
                        <li>LV.?</li>
                    </ul>
                </div>
            </div>


            <div class="tou" v-else>
                <div class="img">
                    <img class="auto-img" :src="selfITEMS[0].picUrl" alt="">
                </div>
                <div class="my_name">{{selfITEMS[0].name}}<van-icon name="arrow" @click="gotoLogin"/></div>
                <div class="user_lel">
                    <ul>
                        <li>关注</li>
                        <li>粉丝</li>
                        <li>LV.{{selfITEMS[0].lv}}</li>
                    </ul>
                </div>
            </div>


            <div class="nav">
                <ul>
                    <li v-for="(item, index) in navDate" >
                        <div class="icon_top">
                            <i :class="item.iconName"></i>
                        </div>
                        <br />
                        <div class="desc">{{ item.title }}</div>
                    </li>
                </ul>
            </div>
            <div class="my_like">
                <div class="img">
                    <img src="../assets/images/插图1.jpg" alt="">
                </div>
                <div class="content">
                    <div class="top">我喜欢的音乐</div>
                    <div class="bottom">0首</div>
                </div>
                <div class="btn">
                    <button>
                        <van-icon name="like-o" color="rgb(234,77,68)" />心动模式
                    </button>
                </div>
            </div>
            <div class="mygedan">
                <van-tabs v-model="active">
                    <van-tab title="创建歌单">
                        <div class="my_like">
                            <div class="img">
                                <img src="../assets/images/插图1.jpg" alt="">
                            </div>
                            <div class="content">
                                <div class="top">我创建的歌单</div>
                                <div class="bottom"></div>
                            </div>
                            <div class="btn">
                                <button>
                                    <van-icon name="like-o" color="rgb(234,77,68)" />心动模式
                                </button>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="收藏歌单">
                        <div class="my_like" v-for="(item,index) in myLikeList" @click="gotoMyLoveGeDan(item.id)">
                            <div class="img">
                                <img :src="item.coverImgUrl" alt="">
                            </div>
                            <div class="content">
                                <div class="top">{{item.name}}</div>
                                <div class="bottom"></div>
                            </div>
                            <div class="btn">
                                <button @click.stop="removeNowid(item.id,index)">
                                    删除
                                </button>
                            </div>
                        </div>
                        
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'My',
    data() {
        return {
            navDate: [
                {
                    title: '最近播放',
                    iconName: 'iconfont icon-24gf-playCircle'
                },
                {
                    title: '本地/下载',
                    iconName: 'iconfont icon-xiazaibendi'
                },
                {
                    title: '云盘',
                    iconName: 'iconfont icon-shangchuanyunpan'
                },
                {
                    title: '已购',
                    iconName: 'iconfont icon-qunfenggoumaitaocan'
                },
                {
                    title: '我的好友',
                    iconName: 'iconfont icon-haoyou'
                },
                {
                    title: '收藏和赞'
                    , iconName: 'iconfont icon-shoucang'
                },
                {
                    title: "我的播客",
                    iconName: 'iconfont icon-leida'
                },
                {
                    title: '乐迷团',
                    iconName: 'iconfont icon-aixin'
                }
            ],
            active: 2,
            myLikeList: []
        }
    },
    computed: {
        ...mapState(['selfITEMS','isLogin']),
        
    },
    created() {
        let id = JSON.parse(localStorage.getItem('mychooselikemusicID')) 
        console.log('id=>',id)

        if(id.length === 0) {
            this.getGeDanList(id)
        }else {
            id.forEach(item => {
                this.getGeDanList(item)
            })
        }
    },
    methods: {
        gotoLogin() {
            this.$router.push({name: 'Login'})
        },
        getGeDanList(id) {
            this.axios({
                method: 'get',
                url: '/playlist/detail',
                params: {
                    id
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code === 200) {
                    this.myLikeList.push(res.data.playlist)
                    console.log(this.myLikeList)
                }
            })
        },
        removeNowid(id,index) {
            let date = JSON.parse(localStorage.mychooselikemusicID)
            date= date.filter(item=> {
                return item != id
            })

            localStorage.mychooselikemusicID = JSON.stringify(date)

            this.myLikeList.splice(index,1)
        },
        gotoMyLoveGeDan(id) {
            this.$router.push({
                name: 'ItemMusic',
                query: {
                    id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.my {
    width: 100vw;
    height: auto;

    .my_box {
        margin-top: 90px;
        padding: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .tou {
            position: relative;
            width: 100%;
            height: 100px;
            background-color: white;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .img {
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                width: 60px;
                height: 60px;

                .auto-img {
                    width: 100%;
                    display: block;
                    border-radius: 50%;
                }
            }

            .my_name {
                width: 100%;
                height: 20px;
                margin-top: 50px;
                text-align: center;
                line-height: 20px;
            }

            .user_lel {
                width: 100%;
                height: 20px;

                ul {
                    width: 100%;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    li {
                        width: 15%;
                        height: 100%;
                        color: #999;

                        &:last-child {
                            line-height: 21px;
                        }
                    }
                }
            }
        }

        .nav {
            margin-top: 10px;
            width: 100%;
            height: 175px;
            border-radius: 15px;
            background-color: white;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;

                li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 25%;
                    // background-color: orange;
                    height: 50%;

                    i {
                        color: rgb(234, 77, 68);
                        font-size: 20px;
                    }
                }
            }
        }

        .my_like {
            width: 100%;
            height: 100px;
            background-color: white;
            margin-top: 10px;
            border-radius: 15px 15px 0 0;
            padding: 10px;
            display: flex;

            .img {
                width: 80px;
                height: 80px;

                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: 15px;
                }
            }

            .content {
                width: 165px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                // background-color: pink;
                margin-left: 10px;

                .top {
                    font-size: 18px;
                }

                .bottom {
                    color: #999;
                }
            }

            .btn {
                width: 70px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                button {

                    width: 70px;
                    height: 30px;
                    border-radius: 25px;
                    border: 1px solid #999;
                    background-color: transparent;
                }
            }


        }

        .mygedan {
            width: 100%;
            height: auto;
            background-color: white;
            border-radius: 15px;
            margin-top: 10px;

            
        }
    }
}
</style>