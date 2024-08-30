<template>
    <div class="songlist">
        <van-nav-bar >
            <template #left>
                <div class="vanbar_left">
                    <van-icon name="arrow-left" size="18" color="black" @click="$router.go(-1)"/>
                </div>
            </template>
            <template #right>
                <!-- <van-icon name="search" size="18" /> -->
            </template>
        </van-nav-bar>
        <div class="guanzhuBox">
            <div class="top_fenlei">
                <ul>
                    <li v-for="(item, i) in TYPEDate">
                        <van-button round  :class="i === activeIndex ? 'active' : 'inactive'" @click="chooseSinger(i,item)">{{ item.title }}</van-button></li>
                </ul>
            </div>
            <div class="singer_container">
                <div class="topic">
                    热门歌手
                </div>
                <div class="singerList">
                    <ul>
                        <li class="singer-item" v-for="(item, index) in singerListData" :key="index"
                            @click="viewSingerSong(item.id,item.picUrl)">
                            <div class="s-img">
                                <img class="auto-img" :src="item.picUrl" alt="">
                            </div>
                            <div class="s-name">{{ item.name }}</div>
                            <div class="s-n" v-show="index === 0 || index === 1 || index === 2">
                                <van-tag type="danger">Hot&nbsp;{{index+ 1}}</van-tag>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="dianzi" style="height: 15vh"></div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'SongList',
    data() {
        return {
            activeIndex: -1,
            type: -1,
            area: -1,
            TYPEDate: [
                {
                    title: '男歌手',
                    type: 1
                },
                {
                    title: '女歌手',
                    type: 2
                },
                {
                    title: '乐队',
                    type: 3
                },
                {
                    title: '华语',
                    area: 7
                },
                {
                    title: '欧美',
                    area: 96
                }, {
                    title: '日本',
                    area: 8
                },
                {
                    title: '韩国',
                    area: 16,
                },
                {
                    title: '其他',
                    area: 0
                }
            ],
            singerListData: []
        }
    },
    created() {
        this.getSinger(this.type, this.area)
    },
    methods: {
        //  -1:全部
        // 1:男歌手
        // 2:女歌手
        // 3:乐队
        //  - 1: 全部
        // 7华语
        // 96欧美
        // 8: 日本
        // 16韩国
        // 0: 其他
        getSinger(type, area) {
            this.axios({
                method: 'GET',
                url: '/artist/list',
                params: {
                    type,
                    area,
                    //获取数据量
                    limit: 15,
                    //数据偏移数据量
                    offset: 0
                }
            }).then(res => {
                console.log(res)
                this.singerListData = res.data.artists;
            })
        },
        chooseSinger(index,item) {
            let type = item.type
            let area = item.area
            this.activeIndex = index
            // console.log(item)
            

            this.getSinger(type, area)
        },
        viewSingerSong(id,picUrl) {
            this.updateSingerPicUrl(picUrl)
            this.$router.push({ name: 'SingerSong', params: {
                 id 
            } });
        },
        ...mapMutations(['updateSingerPicUrl'])
    }
}
</script>
<style lang="less" scoped>
.songlist {
    width: 100vw;
    height: 100vh;

    .van-nav-bar {
        width: 100%;

    }

    .guanzhuBox {
        width: 100%;
        height: auto;
        padding: 10px;

        .top_fenlei {
            width: 100%;
            height: auto;

            // background-color: white;
            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                li {
                    width: 33%;
                    margin-top: 5px;
                    text-align: center;
                    line-height: 25px;
                    height: 25px;
                    // background-color: pink;

                    .active {
                        background-color: rgb(234,77,68);
                        color: white;
                    }

                    .inactive {
                        background-color: rgb(25,137,250);
                        color: white;
                    }


                    .van-button {
                        width: 60%;
                        height: 25px;
                        padding: 5px;
                        font-size: 14px;
                    }

                }
            }
        }


        .singer_container {
            margin-top: 10px;
            width: 100%;
            height: auto;

            .topic {
                width: 100%;
                height: 25px;
                font-size: 16px;
            }

            .singerList {
                width: 100%;
                height: auto;
                background-color: white;
                border-radius: 15px;

                .singer-item {
                    display: flex;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 15px;
                    margin-bottom: 10px;
                    display: flex;
                    font-size: 16px;
                    align-items: center;

                    .s-img {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        .auto-img {
                            width: 40px;
                            height: 40px;
                            display: block;
                            border-radius: 50%;
                        }
                    }

                    .s-name {
                        width: 70%;
                        // background-color: pink;
                        height: 40px;
                        line-height: 40px;
                    }
                    .s-n {
                        width: 20%;
                        text-align: center;
                        line-height: 40px;
                        height: 40px;
                        // background-color: skyblue;
                    }
                }
            }

        }

    }

}
</style>