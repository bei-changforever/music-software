<template>
    <div class="boke">
        <div class="mav_box">
            <div class="area van-hairline--bottom">
                <!-- 可选值为全部,内地,港台,欧美,日本,韩国, 不填则为全部-->
                <ul>
                    <li @click="chooseArea(index, item.area)" v-for="(item,index) in areaList" :key="index">
                        <van-tag round type="primary" :color="index === areaIndex ? Activecolor : ''"> {{ item.title }}
                        </van-tag>
                    </li>
                </ul>
            </div>
            <div class="type">
                <!-- 全部,官方版,原生,现场版,网易出品,不填则为全部 -->
                <ul>
                    <li @click="chooseType(index, item.type)" v-for="(item, index) in typeList" :key="index">
                        <van-tag round type="primary" :color="index === typeIndex ? Activecolor : ''">{{ item.type }}
                        </van-tag>
                    </li>
                </ul>
            </div>
            <div class="order">
                <!-- 排序,可选值为上升最快,最热,最新,不填则为上升最快 -->
                <ul>
                    <li @click="chooseOrder(index, item.order)" v-for="(item, index) in orderList" :key="index">
                        <van-tag type="primary" round :color="index === orderIndex ? Activecolor : ''">{{ item.order }}
                        </van-tag>
                    </li>
                </ul>
            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 5px' }">
                选择你的喜好
            </van-divider>
        </div>
        <div class="mv_container">
            <ul>
                <li v-for="(item, index) in theBokeData" :key="item.id" @click="choseeMV(item.id)">
                    <div class="content">
                        <div class="img">
                            <img class="auto-img" :src="item.cover" alt="">
                            <div class="mark">
                                <i class="iconfont icon-shipinbofangshibofang"></i>
                            </div>
                        </div>
                        <div class="name">
                            {{ item.artistName }}
                        </div>
                        <div class="topic">
                            {{ item.name }}
                        </div>
                        <div class="paihang" v-if="index === 0 || index === 1 || index === 2">
                            <van-tag type="warning">{{ index + 1 }}</van-tag>
                        </div>

                    </div>
                </li>
            </ul>
        </div>
        <div class="bofanmv">
            <van-popup v-model="show" closeable close-icon-position="top-left" @click-close-icon="showPoP">
                <video ref="video" :src="src" controls></video>
                <div class="mv_box">
                    <div class="topic">{{MVDAtE.artistName}}</div>
                    <div class="desc">{{MVDAtE.publishTime}}</div>
                    <div class="person">
                        <van-button round  color="rgba(128,128,128,0.3)"> <van-icon name="chat" />{{persons.commentCount}}</van-button>
                        <van-button round  color="rgba(128,128,128,0.3)"><van-icon name="star" />{{persons.likedCount}}</van-button>
                        <van-button round  color="rgba(128,128,128,0.3)"><van-icon name="share" />{{persons.shareCount}}</van-button>
                    </div>
                    <div class="hotcom" v-for="(item,i) in hotComments">
                        <div class="userHead">
                            <img class="auto-img" :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="userdesc">
                            <div class="nickname">{{item.user.nickname}}</div>
                            <div class="userCOM">
                           {{item.content}}
                        </div>
                        <div class="time">{{item.timeStr}}</div>
                        </div>
                        
                    </div>
                </div>
            </van-popup>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>

import { mapActions, mapMutations,mapState } from 'vuex'
export default {
    name: 'Boke',
    data() {
        return {
            areaList: [
                {
                    title: '全部',
                    area: '全部'
                },
                {
                    title: '内地',
                    area: '内地'
                },
                {
                    title: '港台',
                    area: '港台'
                },
                {
                    title: '欧美',
                    area: '欧美'
                },
                {
                    title: '欧美',
                    area: '欧美'
                },
                {
                    title: '日本',
                    area: '日本'
                },
                {
                    title: '韩国',
                    area: '韩国'
                }
            ],
            areaIndex: 0,
            areaName: '',
            typeList: [
                {
                    type: '全部',

                },
                {
                    type: '官方版',

                },
                {
                    type: '原生',

                },
                {
                    type: '现场版',

                },
                {
                    type: '网易出品',

                }
            ],
            typeIndex: 0,
            typeName: '',
            orderList: [
                {
                    order: '上升最快'
                },
                {
                    order: '最热'
                },
                {
                    order: '最新'
                }
            ],
            orderIndex: 0,
            orderName: '',
            Activecolor: 'rgb(251,114,153)',
            theBokeData: [],
            show: false,
            src: '',
            MVDAtE: {},
            persons: {},
            hotComments: []
        }
    },
    computed: {
        ...mapState(['$video'])
        
    },
    created() {
    
        this.$nextTick(() => {
           this.$store.commit('setVideo',this.$refs.video)
        })
        // console.log(this.$video)
        this.getMv()
        
    },
    mounted() {
        // console.log(this.$refs.video)
    },
    methods: {
        chooseArea(index, area) {

            if (index === this.areaIndex) {
                return
            }
            this.areaIndex = index
            this.areaName = area
            this.getMv(this.areaName)
        },
        chooseType(index, type) {
            if (index === this.typeIndex) {
                return
            }
            this.typeIndex = index
            this.typeName = type
            this.getMv(this.typeName)
        },
        chooseOrder(index, order) {
            if (index === this.orderIndex) {
                return
            }
            this.orderIndex = index
            this.orderName = order
            this.getMv(this.orderName)
        },
        getMv() {
            this.axios({
                method: 'get',
                url: '/mv/all',
                params: {
                    area: this.areaName,
                    type: this.typeName,
                    order: this.orderName,
                    limit: 30

                }
            }).then(res => {
                this.theBokeData = []
                console.log(res)
                if (res.data.code === 200) {
                    this.theBokeData = res.data.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getMVDesc(mvid) {
            this.axios({
                method: 'get',
                url: '/mv/detail',
                params: {
                    mvid
                }
            }).then(res=> {
                if(res.data.code === 200) {
                        this.MVDAtE = res.data.data
                        console.log('作者=>',this.MVDAtE)
                }
            })
        },
        getMVinfo(mvid) {
            this.axios({
                method: 'get',
                url: '/mv/detail/info',
                params: {
                    mvid
                }
            }).then(res=> {
               if(res.data.code === 200) {
                this.persons = res.data
                console.log('人数=>',this.persons)
               }
            })
        },
        getMVcomment(id) {
            this.axios({
                method: 'get',
                url: '/comment/mv',
                params: {
                    id,
                    limit: 20
                }
            }).then(res=> {
                if(res.status === 200) {
                    this.hotComments = res.data.hotComments
                    console.log('热评=>',this.hotComments)
                }
      
            })
        },
        choseeMV(id) {
            this.getMVDesc(id)
            this.getMVinfo(id)
            this.getMVcomment(id)
            this.axios({
                method: 'GET',
                url: '/mv/url',
                params: {
                    id
                }
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.src = res.data.data.url
                }
            })
            
            this.show = true
            // if(this.show) {
            //     this.$video.play()
            // }
        },
        showPoP() {
            this.show = false
            // this.$video.pause()
            this.$refs.video.pause()
        },
        ...mapMutations(['setVideo'])

    },
}
</script>
<style lang="less" scoped>
.boke {
    width: 100vw;
    height: auto;
    padding: 10px;



    .mav_box {
        margin-top: 50px;
        width: 100%;
        padding: 5px;
        height: auto;
        display: flex;
        flex-direction: column;
        border-radius: 15px;

        .van-tag {
            min-width: 50px;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .area {
            margin-bottom: 5px;
            width: 100%;
            height: auto;

            ul {
                width: 100%;
                height: 30px;
                display: flex;

                li {
                    width: 100px;
                    // background-color: pink;
                    margin-right: 10px;
                    line-height: 30px;
                }
            }
        }

        .type {
            width: 100%;
            margin-bottom: 5px;
            height: auto;

            ul {
                width: 100%;
                height: 30px;
                display: flex;

                li {
                    width: 100px;
                    // background-color: pink;
                    margin-right: 10px;
                    line-height: 30px;
                }
            }
        }

        .order {
            width: 100%;
            height: auto;
            margin-bottom: 5px;

            ul {
                width: 100%;
                height: 30px;
                display: flex;

                li {
                    width: 60px;
                    margin-right: 10px;
                    // background-color: pink;
                    line-height: 30px;
                }
            }
        }
    }

    .mv_container {
        width: 100%;
        height: auto;

        ul {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;


            li {
                padding: 5px;
                margin-top: 10px;
                width: 100%;
                height: auto;
                background-color: white;
                border-radius: 15px;

                .content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;

                    .img {
                        position: relative;
                        width: 100%;
                        height: 155px;
                        box-shadow: 10px 10px 10px gray;
                        border-radius: 15px;

                        .auto-img {
                            width: 100%;
                            height: 100%;
                            display: block;
                            border-radius: 15px;



                        }



                        &::after {
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;

                            background-color: rgba(0, 0, 0, 0.3);
                            border-radius: 15px;
                            // background-color: pink;
                        }

                    }

                    .name {
                        margin-top: 15px;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .topic {

                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        color: gray;
                    }

                    .paihang {
                        position: absolute;
                        right: 0;
                    }

                    .mark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);


                        i {
                            font-size: 50px;
                            color: rgba(255, 255, 255, 0.7);
                        }
                    }
                }
            }
        }
    }

    .bofanmv {
        width: 100%;
        height: 100%;
        z-index: 2;

        .van-popup {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            object-fit: fill;

            video {
                width: 100%;
                height: 30%;
                object-fit: fill;
            }

            .mv_box {
                padding: 10px;
                width: 100%;
                height: auto;
                color: white;

                .topic {
                    width: 100%;
                    height: 25px;
                    font-size: 18px;
                    font-weight: 700;
                }

                .desc {
                    width: 100%;
                    height: 25px;
                    color: #999;
                }


                .person {
                    margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;


                    .van-button {
                        width: 30%;
                        height: 40px;
                        padding: 5px;
                    }
                }

                .hotcom {
                    margin-top: 10px;
                    margin-bottom: 20px;
                    width: 100%;
                    height: auto;
                    display: flex;

                    .userHead {
                        width: 20%;
                        
                        .auto-img {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                        }

                    }

                    .userdesc {
                        width: 80%;
                        height: auto;
                        display: flex;
                        flex-direction: column;

                        .nickname {
                            color: #999;
                            width: 100%;
                            height: 20px;
                        }

                        .userCOM {
                            margin-top: 5px;
                        }

                        .time {
                            display: flex;
                            justify-content: flex-end;
                            color: #999;
                            margin-top: 5px;
                        }


                    }

                }

            }
        }
    }
}
</style>