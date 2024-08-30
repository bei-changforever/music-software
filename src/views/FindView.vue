<template>
    <div class="find">
        <!-- 轮播图 -->
        <div class="banner">
            <lazy-component>
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item, index) in BannerDate">
                        <img class="auto-img" :src="item.pic" />
                    </van-swipe-item>
                </van-swipe>
            </lazy-component>
        </div>
        <!-- nav -->
        <div class="nav_find">
            <div class="nav_find_box">
                <ul class="find_ul" @touchstart="touchstart" @touchmove="touchmove"
                    :style="{ marginLeft: `${left}px` }">
                    <li v-for="(item, index) in FindNav" @click="everday(index)">
                        <div class="findnav_icon">
                            <i :class="item.iconName"></i>
                        </div>
                        <div class="findnav_title">{{ item.title }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 推荐歌单 -->
        <div class="tuijianSong">
            <div class="tuijianSong_box">
                <div class="tuijian_topic">
                    <div class="left_topic">推荐歌单</div>
                    <div class="left_btn">
                        <button>更多
                            <van-icon name="arrow" color="#d5d5d5" />
                        </button>
                    </div>
                </div>
                <div class="tuijian_content" @touchstart.stop="findnavStart" @touchmove.stop="findnavMove"
                    :style="{ marginLeft: `${tuijianleft}px` }">
                    <div class="tuijianSwiper">
                        <div class="tuijian_swiper_box">
                            <lazy-component>
                                <van-swipe class="tuijian_swiper_loop" style="width: 100px; height: 100px"
                                    :autoplay="3000" :show-indicators="false" vertical>
                                    <van-swipe-item v-for="(item, index) in jinpinList" :key="index"
                                        @click="getjinPingId(item)">
                                        <img class="auto-img" :src="item.coverImgUrl">
                                    </van-swipe-item>
                                </van-swipe>
                            </lazy-component>
                            <div class="xunhuanicon">
                                <i class="iconfont icon-xunhuan"></i>
                            </div>
                        </div>
                        <div class="tuijian_swiper_topic">
                            <van-swipe class="my-swipe" :autoplay="3100" indicator-color="white">
                                <van-swipe-item :show-indicators="false" v-for="(item, index) in jinpinList">{{
                                        item.name
                                }}</van-swipe-item>
                            </van-swipe>
                        </div>
                    </div>
                    <div class="tuijian_list">
                        <ul>
                            <li v-for="(item, index) in gedanList" :key="index" @click="gotoItemMusic(item.id)">
                                <!-- <router-link :to="{name: 'ItemMusic',query: {id: item.id}}"> -->
                                <div class="songsBox">
                                    <div class="img">
                                        <img class="auto-img" :src="item.picUrl">
                                    </div>
                                    <div class="playcount">
                                        <i class="iconfont icon-24gl-play"></i>
                                        {{ item.playCount.value }}{{ item.playCount.unit }}
                                    </div>
                                </div>
                                <div class="gedanName">{{ item.name }}</div>
                                <!-- </router-link> -->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门播客 -->
        <div class="hot_boke">
            <div class="hot_boke_box">
                <div class="hot_boke_topic">
                    <div class="left_topic">热门播客</div>
                    <div class="left_btn">
                        <button>更多
                            <van-icon name="arrow" color="#d5d5d5" />
                        </button>
                    </div>
                </div>
                <div class="hot_content">
                    <ul @touchstart="bokestart" @touchmove="bokemove" :style="{ marginLeft: `${bokeleft}px` }">
                        <li v-for="(item, index) in hotBoke">
                            <div class="songsbox" v-for="(val, i1) in item" :key="val.id"
                                @click="updatehotcontentINDEX(val)">
                                <div class="img">
                                    <img class="auto-img" :src="val.Newitem.picUrl" alt="">
                                    <div class="bofan">
                                        <i class="iconfont icon-shipinbofangshibofang"></i>
                                    </div>

                                </div>
                                <div class="songscontent">
                                    <div class="songstopic">
                                        <div class="bigtopic">{{ val.Newitem.name }}</div> &nbsp;
                                        <div class="smalltopic">
                                            <van-tag color="#ffe1e1" text-color="#ad0000"> 专辑
                                            </van-tag>
                                        </div>
                                    </div>
                                    <div class="songsname">
                                        <ul>
                                            <li v-for="(v, i) in val.artists"> {{ v.name }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- 排行榜 -->
        <div class="paihangbang">
            <div class="paihangbang_box">


                <div class="paihangbang_topic">
                    <div class="paihangbang_topic">
                        <div class="left_topic">排行榜</div>
                        <div class="left_btn">
                            <button>更多
                                <van-icon name="arrow" color="#d5d5d5" />
                            </button>
                        </div>
                    </div>
                </div>


                <div class="paihangbang_content" @touchstart="paihangstart" @touchmove="paihangmove"
                    :style="{ marginLeft: `${paileft}px` }">

                    <div class="paihangbang_conten_box">

                        <div class="paihangbang_conten_box_topic">
                            <div class="left" @click="$router.push({ name: 'SongList' })">{{ artistToplist.name }}
                                <van-icon name="arrow" color="gray" />
                            </div>
                            <div class="right">

                                <van-tag round type="primary" size="large">{{ artistToplist.upateFrequency }}</van-tag>
                            </div>
                        </div>
                        <div class="paihangbang_conten_box_song">
                            <ul>
                                <li v-for="(val, index) in artistToplist.artists">
                                    <div class="img">
                                        <img class="auto-img" :src="artistToplist.coverUrl" alt="">
                                    </div>
                                    <div class="song-name">
                                        <div class="paihang">
                                            <van-tag :type="dengjiArr[index]"> {{ index + 1 }}</van-tag>
                                        </div>
                                        <div class="left">
                                            <p class="first">{{ val.first }}</p>
                                            <!-- <p>bangler/onism rcrds</p> -->
                                        </div>
                                        <div class="right">
                                            <van-tag type="danger">热门</van-tag>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="paihangbang_conten_box">

                        <div class="paihangbang_conten_box_topic">
                            <div class="left">{{ rewardToplist.name }}
                                <van-icon name="arrow" color="gray" />
                            </div>
                            <div class="right">
                                <van-tag round type="primary" size="large">{{ artistToplist.upateFrequency }}</van-tag>
                            </div>
                        </div>
                        <div class="paihangbang_conten_box_song">
                            <ul>
                                <li v-for="(val, index) in rewardToplist.arr">
                                    <div class="img">
                                        <img class="auto-img" :src="rewardToplist.coverUrl" alt="">
                                    </div>
                                    <div class="song-name">
                                        <div class="paihang">
                                            <van-tag type="danger" :type="dengjiArr[index]"> {{ index + 1 }}</van-tag>
                                        </div>
                                        <div class="left">
                                            <p class="first">{{ val.name }}</p>
                                            <!-- <p>bangler/onism rcrds</p> -->
                                        </div>
                                        <div class="right">
                                            <van-tag type="danger">热门</van-tag>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div style="height: 10vh"></div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Find',
    data() {
        return {
            //获取banner数据
            BannerDate: [],
            //findnav数据
            FindNav: [
                {
                    iconName: 'iconfont icon-rili',
                    title: '每日推荐'

                },
                {
                    iconName: 'iconfont icon-shouyinji',
                    title: '私人FM'
                },
                {
                    iconName: 'iconfont icon-gedan',
                    title: '歌单'
                },
                {
                    iconName: 'iconfont icon-paixingbang',
                    title: '排行榜'
                },
                {
                    iconName: 'iconfont icon-qiapai',
                    title: '一歌一遇'
                },
                {
                    iconName: 'iconfont icon-yinle',
                    title: '数字专辑'
                },
                {
                    iconName: 'iconfont icon-shuji',
                    title: '有声书'
                },
                {
                    iconName: 'iconfont icon-guanzhu',
                    title: '关注新歌'
                },
                {
                    iconName: 'iconfont icon-youxitianchong',
                    title: '游戏专区'
                }
            ],
            //歌单数据
            gedanList: [],
            //获取精品歌单
            jinpinList: [],
            // 热门播客
            hotBoke: [],
            //排行榜
            artistToplist: [],
            rewardToplist: [],
            //等级
            dengjiArr: ['danger', 'warning', 'success'],
            //获取推荐歌单需要轮播的标题
            swiper_li: null,
            //大nav栏事件
            startX: 0,
            left: 0,
            //tuijianNav栏事件
            x1: 0,
            tuijianleft: 0,
            //boke栏事件
            x2: 0,
            bokeleft: 0,
            //排行榜
            x3: 0,
            paileft: 0
        }
    },
    created() {
        //获取banner数据
        this.getBanner()
        //获取推荐歌单
        this.getTuijianSong()
        //获取精品歌单
        this.getJinPingList()
        //热门播客
        this.getHotBoke()
        //排行榜
        this.getPaiHan()
        //获取推荐歌单需要轮播的标题
        this.$nextTick(() => {
            // setTimeout(() => {
            //     this.swiper_li = this.$refs.swipertopic.children
            //     // console.log(this.swiper_li);

            //     this.swipertopicRun(this.swiper_li)

            // }, 500);
        })
    },
    computed: {
        ...mapState(['NightColor', 'isNight', 'LightColor', 'isLogin'])
    },
    methods: {
        touchstart(e) {
            // console.log(e.target.parentNode.parentNode)
            this.startX = e.changedTouches[0].pageX

        },
        touchmove(e) {
            let endx = e.changedTouches[0].pageX
            // console.log(endx)
            //拖动的差值
            let x0 = endx - this.startX
            let left = x0 + this.left

            if (left <= -345) {
                left = -345
            }
            else if (left >= 0) {
                left = 0
            }

            this.left = left
            this.startX = endx
        },
        findnavStart(e) {
            this.x1 = e.changedTouches[0].pageX
        },
        findnavMove(e) {
            let endx = e.changedTouches[0].pageX
            let x0 = endx - this.x1
            let left = x0 + this.tuijianleft

            if (left >= 0) {
                left = 0
            } else if (left <= -295) {
                left = -295
            }

            this.tuijianleft = left
            this.x1 = endx
        },
        bokestart(e) {
            this.x2 = e.changedTouches[0].pageX
        },
        bokemove(e) {
            let endx = e.changedTouches[0].pageX
            let x0 = endx - this.x2
            let left = x0 + this.bokeleft

            if (left >= 0) {
                left = 0
            } else if (left <= -1060) {
                left = -1060
            }

            this.bokeleft = left
            this.x2 = endx
        },
        paihangstart(e) {
            this.x3 = e.changedTouches[0].pageX
        },
        paihangmove(e) {
            let endx = e.changedTouches[0].pageX
            let x0 = endx - this.x3
            let left = x0 + this.paileft

            if (left >= 0) {
                left = 0
            }
            else if (left <= -330) {
                left = -330
            }

            this.paileft = left
            this.x3 = endx
        },
        //获取banner数据
        getBanner() {
            this.axios({
                method: 'get',
                url: '/banner',
                params: {
                    type: 2
                }
            }).then(res => {
                if (res.data.code === 200) {
                    // console.log(res)
                    this.BannerDate = res.data.banners
                }

            }).catch(err => {
                console.log(err)
            })
        },
        //获取推荐歌单
        getTuijianSong() {
            this.axios({
                method: 'get',
                url: '/personalized',
                params: {
                    limit: 5
                }
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.gedanList = res.data.result
                    this.gedanList.forEach(item => {
                        // js将数字转换成万、亿、万亿
                        let realPlayCount = {}
                        let w = 10000
                        let i
                        let size = ['', '万', '亿', '万亿']
                        if (item.playCount < w) {
                            realPlayCount.value = item.playCount
                            realPlayCount.unit = ''
                        }
                        else {
                            i = Math.floor(Math.log(item.playCount) / Math.log(w))
                            realPlayCount.value = ((item.playCount) / Math.pow(w, i)).toFixed(2)
                            realPlayCount.unit = size[i]
                        }

                        // console.log(realPlayCount)

                        item.playCount = realPlayCount
                    })

                }

                console.log("this.gedanList=>", this.gedanList)
            }).catch(err => {
                console.log(err)
            })
        },
        //获取精品歌单
        getJinPingList() {
            this.axios({
                method: 'get',
                url: '/top/playlist/highquality',
                params: {
                    limit: 5
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.jinpinList = res.data.playlists
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getjinPingId(item) {
            console.log(item)
            this.$router.push({
                name: 'ItemMusic',
                query: {
                    id: item.id
                }
            })
        },
        //热门播客
        getHotBoke() {
            this.axios({
                method: 'get',
                url: '/personalized/newsong',
                params: {
                    limit: 12,
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    // console.log(res.data.result)

                    let arr = res.data.result


                    arr = arr.map(item => {
                        // console.log(item);


                        return {
                            Newitem: item,
                            ...item.song
                        }
                    })

                    // console.log(arr)


                    let newArr = []
                    for (let i = 0; i < arr.length; i += 3) {
                        newArr.push(arr.slice(i, i + 3))
                    }
                    this.hotBoke = newArr
                    console.log(this.hotBoke)

                }
            }).catch(err => {
                console.log(err)
            })
        },
        //排行榜
        getPaiHan() {
            this.axios({
                method: 'get',
                url: '/toplist/detail'
            }).then(res => {


                if (res.data.code === 200) {
                    this.artistToplist = res.data.artistToplist
                    this.rewardToplist = res.data.rewardToplist



                    let arr = []
                    this.rewardToplist.songs.forEach(item => {
                        arr.push(...item.artists)
                    })

                    this.rewardToplist.arr = arr

                    // console.log("歌手=>",this.artistToplist)
                    // console.log('赞善=>',this.rewardToplist)

                }
            }).catch(err => {
                console.log(err)
            })
        },
        gotoItemMusic(id) {
            this.$router.push({
                name: 'ItemMusic',
                query: {
                    id
                }
            })
        },
        updatehotcontentINDEX(item) {
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url

            this.$store.commit('updateIndex', this.$store.state.playList.length - 1)
            this.$store.commit('pushPlayList', item)
        },
        everday(index) {
            console.log(index)
            if (index === 0) {
                if (!this.isLogin) {
                    this.$toast({
                        message: '请先登录'
                    })
                }
                else {
                    this.$router.push({
                        name: 'EveryDays'
                    })
                }

            }
        }
    },


}
</script>
<style lang="less" scoped>
.find {
    width: 100vw;
    height: auto;


    .banner {
        margin-top: 60px;
        padding: 10px;
        width: 100%;
        height: auto;
        background-color: rgb(255, 255, 255);

        .my-swipe .van-swipe-item {
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;

        }

        .auto-img {
            width: 100%;
            object-fit: fill;
            display: block;
            border-radius: 10px;
        }
    }

    .nav_find {
        width: 100%;
        height: auto;
        padding: 10px;
        border-bottom: 1px solid #d5d5d5;
        background-color: rgb(255, 255, 255);

        .nav_find_box {
            width: 100%;
            height: 100%;
            overflow: hidden;

            ul {
                width: 200%;
                height: 100%;
                display: flex;
                flex-wrap: nowrap;

                li {
                    width: 25%;
                    height: 100%;
                    margin-right: 10px;
                    // background-color: skyblue;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .findnav_icon {
                        width: 35px;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        background-color: rgb(252, 241, 239);
                        border-radius: 50%;

                        i {

                            font-size: 25px;
                            color: rgb(251, 84, 87);
                        }
                    }

                    .findnav_title {
                        margin-top: 5px;
                        font-size: 14px;
                        color: rgb(135, 135, 135);
                    }
                }
            }
        }
    }

    .tuijianSong {
        width: 100vw;
        overflow: hidden;
        height: auto;
        padding: 10px;
        background-color: rgb(255, 255, 255);
        border-radius: 0 0 15px 15px;

        .tuijianSong_box {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            .tuijian_topic {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: space-between;

                .left_topic {
                    font-size: 18px;
                    font-weight: 900;
                }

                .left_btn button {
                    width: 60px;
                    height: 30px;
                    border: none;
                    background-color: white;
                    border: 1px solid rgb(237, 237, 237);
                    color: gray;
                    letter-spacing: 1.5px;
                    border-radius: 15px;
                }
            }

            .tuijian_content {
                margin-top: 10px;
                width: 500%;
                display: flex;
                border-radius: 0 0 15px 15px;
                height: auto;

                .tuijianSwiper {
                    margin-right: 10px;
                    width: 100px;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;

                    .tuijian_swiper_box {
                        position: relative;
                        width: 100px;
                        height: 100px;
                        overflow: hidden;

                        .xunhuanicon {
                            position: absolute;
                            top: 2px;
                            right: 2px;

                            i {
                                color: white;
                                font-size: 30px;
                            }
                        }

                        .auto-img {
                            border-radius: 15px;
                            width: 100%;
                            display: block;
                        }
                    }

                    .tuijian_swiper_topic {
                        margin-top: 5px;
                        width: 100px;
                        height: 20px;

                        .van-swipe {
                            height: 20px;
                            width: 100px;
                            // background-color: pink;


                            .van-swipe-item {
                                width: 100px;
                                height: 20px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                // background-color: orange;
                            }
                        }
                    }


                }

                .tuijian_list {
                    width: 600px;
                    height: auto;


                    ul {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-wrap: nowrap;

                        li {
                            width: 100px;
                            height: auto;
                            margin-right: 10px;

                            // background-color: pink;
                            display: flex;
                            flex-direction: column;


                            .songsBox {
                                position: relative;
                                width: 100px;
                                height: 100px;
                                border-radius: 15px;
                                box-shadow: 5px -5px 5px #d5d5d5;


                                .img {
                                    width: 100%;
                                    height: 100%;

                                    .auto-img {
                                        display: block;
                                        border-radius: 15px;
                                        width: 100%;
                                    }
                                }


                                .playcount {
                                    padding: 2px;
                                    color: white;
                                    background-color: rgba(169, 169, 169, .5);
                                    border-radius: 25px;
                                    position: absolute;
                                    top: 2px;
                                    right: 2px;
                                }
                            }

                            .gedanName {
                                margin-top: 5px;
                                width: 100px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                        }
                    }

                }




            }


        }
    }

    .hot_boke {
        width: 100vw;
        height: auto;
        margin-top: 10px;
        padding: 10px;
        border-radius: 15px;
        background-color: white;
        overflow: hidden;

        .hot_boke_box {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            .hot_boke_topic {
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: auto;


                .left_topic {
                    font-size: 18px;
                    font-weight: 900;
                }

                .left_btn button {
                    width: 60px;
                    height: 30px;
                    border: none;
                    background-color: white;
                    border: 1px solid rgb(237, 237, 237);
                    color: gray;
                    letter-spacing: 1.5px;
                    border-radius: 15px;
                }

            }

            /deep/ .hot_content {
                width: 500%;
                height: auto;
                // background-color: skyblue;

                ul {
                    width: 500%;
                    height: auto;
                    display: flex;

                    li {
                        width: 350px;
                        height: auto;
                        display: flex;
                        flex-direction: column;
                        // background-color: orange;

                        .songsbox {

                            width: 100%;
                            height: 60px;
                            display: flex;



                            .img {
                                position: relative;
                                width: 60px;
                                height: 60px;
                                padding: 5px;

                                .auto-img {
                                    width: 100%;
                                    display: block;
                                    border-radius: 15px;
                                }


                                .bofan {
                                    position: absolute;
                                    bottom: 5px;
                                    right: 10px;

                                    i {
                                        color: rgba(255, 255, 255, 0.8);
                                    }
                                }
                            }

                            .songscontent {
                                width: calc(350px - 60px);
                                height: 100%;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                border-bottom: 1px solid #d5d5d5;
                                // background-color: pink;



                                .songstopic {
                                    width: 100%;
                                    height: 75px;
                                    overflow: hidden;
                                    display: flex;
                                    justify-content: space-between;
                                    overflow: hidden;

                                    .bigtopic {
                                        max-width: 100px;
                                        height: 75px;
                                        line-height: 50px;
                                        font-size: 18px;
                                        font-weight: 600;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }

                                    .smalltopic {
                                        width: 50px;
                                        height: 75px;
                                        line-height: 50px;
                                        // background-color: skyblue;
                                        color: gray;
                                    }


                                }

                                .songsname {
                                    width: 150px;
                                    height: 55px;
                                    align-items: center;
                                    display: flex;
                                    color: gray;


                                    ul {
                                        width: 100%;
                                        height: 100%;
                                        display: flex;

                                        li {
                                            white-space: nowrap;
                                            margin-right: 10px;
                                        }

                                    }

                                }
                            }
                        }
                    }
                }
            }
        }



    }

    .paihangbang {
        margin-top: 10px;
        width: 100vw;
        height: auto;
        overflow: hidden;
        padding: 10px;
        background-color: white;
        border-radius: 15px;

        .paihangbang_box {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;

            .paihangbang_topic {
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: auto;


                .left_topic {
                    font-size: 18px;
                    font-weight: 900;
                }

                .left_btn button {
                    width: 60px;
                    height: 30px;
                    border: none;
                    background-color: white;
                    border: 1px solid rgb(237, 237, 237);
                    color: gray;
                    letter-spacing: 1.5px;
                    border-radius: 15px;
                }

            }

            .paihangbang_content {
                width: 200%;
                height: auto;
                padding: 10px;
                display: flex;



                .paihangbang_conten_box {
                    padding: 5px;
                    width: 330px;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    margin-right: 10px;
                    border-radius: 15px;
                    box-shadow: 5px -5px 15px gray;

                    &:nth-child(1) {
                        background-image: url("https://p2.music.126.net/MJdmNzZwTCz0b4IpHJV6Wg==/109951162865487429.jpg");
                        background-size: cover;


                    }

                    &:nth-child(2) {
                        background-image: url("https://p1.music.126.net/oQAa0mlQw5LKA-Z54IOp3g==/19008357021060580.jpg");
                        background-size: cover;

                    }



                    .paihangbang_conten_box_topic {
                        width: 100%;
                        height: 30px;
                        background-color: rgba(255, 255, 255, .7);
                        padding: 5px;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }


                    .paihangbang_conten_box_song {
                        margin-top: 10px;
                        width: 100%;
                        height: auto;
                        background-color: rgba(255, 255, 255, .8);
                        border-radius: 15px;

                        ul {
                            width: 100%;
                            height: auto;

                            li {
                                width: 100%;
                                height: 70px;
                                // background-color: orange;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .img {
                                    width: 60px;
                                    height: 60px;
                                    // background-color: pink;

                                    .auto-img {
                                        width: 100%;
                                        display: block;
                                        border-radius: 15px;
                                    }
                                }


                                .song-name {
                                    width: calc(100% - 70px);
                                    height: auto;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;

                                    .paihang {
                                        width: 25px;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: red;
                                        font-size: 16px;
                                    }

                                    .left {
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                        width: 170px;
                                        height: 100%;
                                        // background-color: pink;

                                        .first {
                                            font-size: 16px;
                                            font-weight: 700;
                                        }
                                    }


                                    .right {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: 70px;
                                        height: 100%;
                                        // background-color: antiquewhite;
                                    }
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