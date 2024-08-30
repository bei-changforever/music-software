<template>
    <div class="everydays">
        <div class="mark">
            <van-nav-bar :border="false">
                <template #left>
                    <p class="bigger"><van-icon name="arrow-left" color="white" @click="$router.go(-1)" />每日推荐</p>
                </template>
            </van-nav-bar>
            <div class="time">
                <div class="time_box">
                    <div class="month">{{ Today.month }}</div>
                    <div class="day">/{{ Today.day }}</div>
                </div>
            </div>
        </div>
        <div class="songs_list">
                <ul>
                    <li  v-for="(item,index) in everydaysSonsList">
                        <div class="left" @click="updateSIndex(item)">
                            <div class="paihang">{{(index  + 1)}}</div>
                            <div class="songs_detail">
                                <div class="song_name">
                                    {{item.name}}
                                </div>
                                <div class="song_desc">
                                    <van-tag type="danger" v-if="(item.song.fee == 1)">VIP</van-tag> <span v-for="(val,i) in item.song.artists"
                                       >--{{val.name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="have_mv">
                            <van-icon name="video" v-if="item.song.mvid !== 0"/>
                        </div>
                        <div class="xuanze">
                            <van-icon name="bars" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'EveryDays',
    data() {
        return {
            Today: {
                month: 0,
                day: 0
            },
            everydaysSonsList: []
        }
    },
    created() {
        this.getNewSongsList()
        this.startTime()
    },
    methods: {
        getNewSongsList() {
            this.axios({
                method: 'get',
                url: '/personalized/newsong'
            }).then(res => {
                // console.log(res)
                if(res.data.code === 200) {
                    this.everydaysSonsList = res.data.result
                    console.log( this.everydaysSonsList )
                }
            })
        },
        startTime() {
            let date = new Date()
            let mm = date.getMonth() + 1
            let dd = date.getDate()
            mm = mm < 10 ? '0' + mm : mm
            dd = dd < 10 ? '0' + dd : dd
            this.Today.month = mm
            this.Today.day = dd
        },
        updateSIndex(item) {
            // console.log(item.song.album.artists[0].name)
            item.al = item.song.album
            item.al.picUrl = item.picUrl
            item.ar = [
                {
                    name : item.song.album.artists[0].name
                }
            ]
            
            
            this.$store.commit('pushPlayList', item)
            this.$store.commit('updateIndex', this.$store.state.playList.length - 1)
        }
    }
}
</script>
<style lang="less" scoped>
.everydays {
    width: 100vw;
    height: auto;
    // background-color: pink;

    .mark {
        width: 100%;
        height: 150px;
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

        .van-nav-bar {
            background-color: transparent;

            .bigger {
                font-size: 20px;
                color: white;
            }
        }

        .time {
            padding: 10px;
            width: 100%;
            height: 100px;
            // background-color: orangered;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            .time_box {
                display: flex;
                width: 100%;
                height: auto;

                .month {
                    width: 70px;
                    height: auto;
                    font-size: 60px;
                    color: white;
                    // background-color: skyblue;
                    line-height: 61px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .day {
                    width: 70px;
                    height: auto;
                    font-size: 40px;
                    color: white;
                    // background-color: orange;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }
            }
        }
    }

    .songs_list {
            width: 100%;
            height: auto;

            ul {
                padding: 10px;
                width: 100%;
                height: auto;
                display: flex;
                background-color: white;
                flex-direction: column;

                li {
                   
                    margin-bottom: 10px;
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .left {
                        width: 80%;
                        height: 100%;
                        display: flex;

                        .paihang {
                            text-align: center;
                            line-height: 60px;
                            width: 10%;
                            height: 100%;
                            font-size: 16px;
                            color: #999;
                        }

                        .songs_detail {
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            width: 90%;
                            height: 100%;

                            .song_name {
                                width: 255px;
                                height: 30px;
                                white-space: nowrap;
                                line-height: 30px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                font-size: 18px;
                                font-weight: 700;
                                letter-spacing: 2px;
                            }

                            .song_desc {
                                color: #999;
                            }
                        }
                    }


                    .have_mv {
                        text-align: center;
                        line-height: 60px;
                        width: 10%;
                        height: 100%;
                        font-size: 20px;
                        color: #999;
                    }

                    .xuanze {
                        text-align: center;
                        line-height: 60px;
                        width: 10%;
                        height: 100%;
                        font-size: 20px;
                        color: #999;
                    }



                }
            }
        }
}
</style>