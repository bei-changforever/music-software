<template>
    <div class="main">
        <HeaderTab :tab-data="HeaderTabData" @poShow="xiugaiShow"></HeaderTab>

        <van-popup v-model="isShow" position="left" :style="{ width: '85%', height: '100vh' }">
            <div class="fixed_box">
                <van-nav-bar>
                    <template #left>
                        <div class="user_info" v-if="isLogin">
                            <div class="user_head">
                                <img class="auto-img" :src="selfITEMS[0].picUrl" alt="">
                            </div>
                            <div class="user_name">{{ selfITEMS[0].name }}&nbsp;
                                <van-icon name="arrow" color="#000000" />
                            </div>
                        </div>

                        <div class="user_info" v-else>
                            <div class="user_head">
                                <img class="auto-img" src="../assets/images/touxian.png" alt="">
                            </div>
                            <div class="user_name">用户昵称&nbsp;
                                <van-icon name="arrow" color="#000000" />
                            </div>
                        </div>
                    </template>
                    <template #right>
                        <van-icon name="scan" size='18' color="#000000" />
                    </template>
                </van-nav-bar>
            </div>

            <div class="box">
                <div class="container">
                    <div class="vip">
                        <div class="xufei">
                            <div class="xufei_topic">
                                <div class="xufei_topic_title">续费黑胶VIP</div>
                                <div class="xufei_swiper">
                                    <van-swipe vertical :autoplay="3000" :show-indicators="false">
                                        <van-swipe-item>黑胶时光机&nbsp;|&nbsp;开启音乐之旅</van-swipe-item>
                                        <van-swipe-item>重启会员成长之路</van-swipe-item>
                                        <van-swipe-item>点击恢复超21项专属特权
                                            <van-icon name="arrow" color="rgb(129,120,121)" />
                                        </van-swipe-item>
                                    </van-swipe>
                                </div>
                            </div>
                            <div class="xufei_btn">
                                <button @click="gotoMymessage">会员中心</button>
                            </div>
                        </div>
                        <div class="heijiao">
                            <div class="heijiao_title">
                                受邀专享，黑胶VIP仅￥0.2/天
                            </div>
                            <div class="img">
                                <img class="auto-img" src="../assets/images/shouyao.png" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="box_tem">
                        <CeNav :cebian-data="item" v-for="(item, index) in f_cebian_data"></CeNav>
                    </div>

                    <div class="box_tem">
                        <div class="yin_serve">音乐服务</div>
                        <CeNav :cebian-data="item" v-for="(item, index) in s_cebian_data"></CeNav>

                    </div>


                    <div class="box_tem">
                        <div class="yin_serve">其他</div>
                        <CeNav v-for="(item, index) in  t_cebian_data" :cebian-data="item"></CeNav>
                    </div>


                    <div class="box_tem">
                        <CeNav v-for="(item, index) in o_cebian_data" :cebian-data="item"></CeNav>
                    </div>

                    <div class="mt" v-if="isLogin">
                        <van-button type="danger" :hairline="false" plain round size="large" @click="changeBshow">
                            退出登录/关闭</van-button>
                    </div>

                </div>
            </div>
        </van-popup>

        <van-popup v-model="boShow" position="bottom" :style="{ height: '20%' }" closeable>
            <div class="tuichu_box">
                <div class="tuichui_topic">退出登录/关闭</div>
                <div class="guanbi">关闭云音乐</div>
                <div class="tuichu" @click="changesShow">退出云音乐登录</div>
            </div>
        </van-popup>

        <div class="container">
            <keep-alive include="Find,Main,My,BoKe,GuanZhu">
                <router-view></router-view>
            </keep-alive>
        </div>

        <MainTab  :tab-data="BottomTabData"></MainTab>
    </div>
</template>
<script>
import MainTab from '../components/MainTab.vue'
import HeaderTab from '../components/HeaderTab.vue'
import CeNav from '../components/CeNavBar.vue'
import FooterMusic from '../components/FooterMusic.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Main',
    components: {
        MainTab,
        HeaderTab,
        CeNav,
        FooterMusic


    },
    data() {
        return {
            //侧边栏切换状态
            boShow: false,
            isShow: false,
            //头部tab栏数据
            HeaderTabData:
            {
                LefticonName: 'iconfont icon-gengduo',



                RighticonName: 'iconfont icon-tinggeshiqu'
            },
            //底部tab栏数据
            BottomTabData: [
                {
                    title: '发现',
                    iconName: 'iconfont icon-faxian',
                    name: 'Find'
                },
                {
                    title: '播客',
                    iconName: 'iconfont icon-leida2_1',
                    name: 'BoKe'
                },
                {
                    title: '我的',
                    iconName: 'iconfont icon-yinle',
                    name: 'My'
                },
                {
                    title: '话题',
                    iconName: 'iconfont icon-guanzhu',
                    name: 'GuanZhu'
                },
                {
                    title: '社区',
                    iconName: 'iconfont icon-shequ',
                    name: 'SheQu'
                }
            ],
            //侧边栏数据
            f_cebian_data: [
                {
                    iconName: 'envelop-o',
                    title: '我的消息'
                },
                {
                    iconName: 'gem-o',
                    title: '云贝中心'
                },
                {
                    iconName: 'flag-o',
                    title: '创作者中心'
                }
            ],
            s_cebian_data: [
                {
                    iconName: 'coupon-o',
                    title: '云村有票'
                },
                {
                    iconName: 'bag-o',
                    title: '多多西口袋'
                },
                {
                    iconName: 'shopping-cart-o',
                    title: '商城'
                },
                {
                    iconName: 'bullhorn-o',
                    title: 'Beat专区'
                },
                {
                    iconName: 'music-o',
                    title: '口袋彩铃'
                },
                {
                    iconName: 'video-o',
                    title: '游戏专区'
                }
            ],
            t_cebian_data: [
                {
                    iconName: 'setting-o',
                    title: '设置'
                },
                {
                    iconName: 'closed-eye',
                    title: '深色模式',
                    id: 0
                },
                {
                    iconName: 'clock-o',
                    title: '定时关闭'
                },
                {
                    iconName: 'fire-o',
                    title: '个性装扮'
                },
                {
                    iconName: 'down',
                    title: '边听边存'
                },
                {
                    iconName: 'newspaper-o',
                    title: '在线听歌免流量'
                },
                {
                    iconName: 'shield-o',
                    title: '音乐黑名单'
                },
                {
                    iconName: 'flower-o',
                    title: '青少年模式'
                },
                {
                    iconName: 'bullhorn-o',
                    title: '音乐闹钟'
                },
            ],
            o_cebian_data: [
                {
                    iconName: 'balance-list-o',
                    title: '我的订单'
                },
                {
                    iconName: 'discount',
                    title: '优惠劵'
                },
                {
                    iconName: 'service-o',
                    title: '我的客服'
                },
                {
                    iconName: 'share-o',
                    title: '分享网易云音乐'
                },
                {
                    iconName: 'description',
                    title: '个人信息收集与使用清单'
                },
                {
                    iconName: 'contact',
                    title: '个人信息第三方共享清单'
                },
                {
                    iconName: 'shield-o',
                    title: '个人信息与隐私保护'
                },
                {
                    iconName: 'info-o',
                    title: '关于'
                },
            ]
        }
    },
    computed: {
        ...mapState(['NightColor', 'isNight', 'LightColor', 'selfITEMS', 'isLogin']),
        
    },
    methods: {
        xiugaiShow(e) {
            this.isShow = e
            // console.log(this.isShow)
        },
        changeBshow() {
            this.boShow = !this.boShow
        },
        changesShow() {

            this.$dialog.confirm({
                title: '确认关闭网易云音乐吗?',
            })
                .then((action) => {
                    // on confirm
                    this.beforeClose(action, this.$dialog.close)
                    this.updateLogin(false)
                    this.$router.push({ name: 'Login' })
                })
                .catch(() => {
                    // on cancel
                });
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                setTimeout(done, 1000);
            } else {
                done();
            }
        },
        gotoLogin() {
            this.$router.push({ name: 'Login' })
        },
        gotoMain() {
            this.$router.push({ name: 'Main' })
        },
        gotoMymessage() {

            if (!this.$store.state.isLogin) {
                this.$dialog.confirm({
                    title: '请先登录',
                })
                    .then((action) => {
                        // on confirm
                        this.beforeClose(action, this.$dialog.close)
                        this.$router.push({
                            name: 'Login'
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
            else {
                this.$router.push({
                    name: 'MyMessage'
                })
            }


        },
        ...mapMutations(['updateLogin'])
    },
}
</script>
<style lang="less" scoped>
.main {

    /deep/ .van-popup {
        background-color: rgb(246, 246, 246);

        .fixed_box {
            position: sticky;
            overflow: hidden;
            top: 0;
            left: 0;
            z-index: 2;
        }

        .van-nav-bar {
            background-color: rgb(246, 246, 246);

            .user_info {
                height: 46px;
                display: flex;
                align-items: center;


                .user_head {
                    height: 30px;

                    .auto-img {
                        height: 100%;
                        display: block;
                        border-radius: 50%;
                    }
                }

                .user_name {
                    margin-left: 10px;
                }
            }
        }

        .box {
            padding: 10px;
            width: 100%;
            height: auto;
            // background-color: pink;


            .container {
                width: 100%;
                height: auto;
                overflow-x: hidden;
                overflow-y: scroll;
                scrollbar-width: none;
                padding: 0;
                color: rgb(107, 107, 107);

                &::-webkit-scrollbar {
                    display: none;
                }

                .vip {
                    width: 100%;
                    height: 100px;
                    padding: 10px;
                    background-image: linear-gradient(rgb(61, 57, 56), rgb(74, 65, 66),
                            rgb(77, 67, 66), rgb(89, 75, 75));
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;

                    .xufei {
                        width: 100%;
                        height: 60px;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid rgb(129, 120, 121);

                        .xufei_topic {
                            width: 60%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;

                            .xufei_topic_title {
                                width: 100%;
                                height: 30px;
                                line-height: 30px;
                                font-weight: 700;
                                font-size: 18px;
                                color: rgb(232, 214, 209);
                            }

                            .xufei_swiper {
                                width: 100%;
                                height: 30px;

                                .van-swipe {
                                    width: 100%;
                                    height: 30px;
                                    color: rgb(129, 120, 121);
                                }
                            }
                        }

                        .xufei_btn {
                            width: 40%;
                            height: 100%;
                            // background-color: tomato;
                            text-align: right;

                            button {
                                width: 70px;
                                height: 30px;
                                border: none;
                                border-radius: 20px;
                                color: rgb(129, 120, 121);
                                border: 1px solid rgb(129, 120, 121);
                                background-color: transparent;
                            }
                        }


                    }

                    .heijiao {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        justify-content: space-between;

                        .heijiao_title {
                            width: 70%;
                            height: 100%;
                            line-height: 30px;
                            color: rgb(129, 120, 121);
                        }

                        .img {
                            width: 30%;
                            height: 100%;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;



                            .auto-img {
                                width: 20px;
                                height: 20px;
                                display: block;

                            }
                        }
                    }
                }

                .box_tem {
                    overflow: hidden;
                    margin-top: 10px;
                    width: 100%;
                    height: auto;
                    padding: 2px;
                    border-radius: 15px;
                    background-color: white;


                    .yin_serve {
                        width: 100%;
                        height: 20px;
                        // background-color: pink;
                        text-indent: 1.5em;
                        border-bottom: 1px solid #d5d5d5;
                        color: rgb(179, 179, 179);
                    }
                }

                .mt {
                    width: 100%;
                    height: auto;
                    margin-top: 10px;

                }


            }
        }

        .tuichu_box {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            // background-color: pink;

            .tuichui_topic {
                flex: 1;
                line-height: 40px;
                text-indent: 3em;
                color: gray;
            }

            .guanbi {
                flex: 1;
                line-height: 40px;
                text-indent: 2em;
                font-size: 17px;
                font-weight: 500;
            }

            .tuichu {
                flex: 1;
                line-height: 40px;
                text-indent: 2em;
                font-size: 17px;
                font-weight: 500;
            }

        }

        .make_sure {
            width: 220px;
            height: 123px;
            display: flex;
            // background-color: pink;
            flex-direction: column;
            justify-content: space-between;

            .make_sure_topic {
                margin-top: 30px;
                width: 100%;
                height: 20%;
                font-size: 15px;
                text-indent: 1.5em;

            }

            .make_sure_btn {
                display: flex;
                justify-content: space-around;
                width: 100%;
                height: 20%;
            }
        }
    }



}
</style>

