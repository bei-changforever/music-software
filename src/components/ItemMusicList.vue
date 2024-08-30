<template>
    <div class="music">
        <div class="item_list">
            <div class="item_list_head">
                <div class="item_list_head_left">
                    <div class="icon">
                        <img src="../assets/images/bofan.png" alt="">
                    </div>
                    <div class="left_desc">
                        播放全部
                        <span class="count">({{ changeCount(playListData.playCount) }})</span>
                    </div>
                </div>
                <div class="item_list_head_right">
                    <div class="onload">
                        <van-icon name="down" size='18' />
                    </div>
                    <div class="choose_many">
                        <van-icon name="bookmark-o" size='18' />
                    </div>
                </div>
            </div>
            <div class="songs_list">
                <ul>
                    <li v-for="(item, i) in itemList" :key="i">
                        <div class="left" @click="playMusic(i, item.fee, item)">
                            <div class="paihang">{{ i + 1 }}</div>
                            <div class="songs_detail">
                                <div class="song_name">{{ item.name }}</div>
                                <div class="song_desc">
                                    <van-tag type="danger" v-if="item.fee == 1">VIP</van-tag> <span
                                        v-for="(val, index) in item.ar" :key="index">--{{ val.name }}</span>
                                </div>
                            </div>
                        </div>


                        <div class="have_mv" v-if="item.mv != 0">
                            <van-icon name="video" />
                        </div>
                        <div class="xuanze">
                            <van-icon name="bars" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MusicList',
    props: {
        itemList: {

        },
        playListData: {

        }
    },
    mounted() {
        console.log(this.itemList)
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
        playMusic(index, vip, item) {



            // console.log('传递的歌曲数据=>', item)
            let myLoveMusicID = JSON.parse(localStorage.getItem('myLoveMusicID'))
            console.log(myLoveMusicID)
            let res = myLoveMusicID.some(val => {
                return val == item.id
            })
            console.log(res)
            if(res) {
                item.st = 1
            }
            else {
                item.st = 0
            }






            if (JSON.stringify(item) == '{}') {
                return
            }
            else if (item) {
                if (vip == 1) {
                    this.$toast({
                        message: 'vip歌曲,暂无资源'
                    })
                } else {
                    this.$store.commit("updatePlayList", this.itemList)
                    this.$store.commit("updateIndex", index)
                }
            }


        }
    }
}
</script>
<style lang="less" scoped>
.music {
    width: 100%;
    height: auto;

    .item_list {
        margin-top: 15px;
        width: 100%;
        height: auto;
        border-radius: 25px;
        background-color: white;

        .item_list_head {
            padding: 10px;
            width: 100%;
            height: 50px;

            display: flex;
            justify-content: space-between;

            .item_list_head_left {
                width: 50%;
                height: 100%;
                // background-color: skyblue;
                display: flex;
                align-items: center;
                justify-content: space-between;



                .left_desc {
                    font-size: 18px;
                    font-weight: 600;

                    .count {
                        font-size: 12px;
                        color: #999;
                        font-weight: 400;
                    }
                }



            }

            .item_list_head_right {
                width: 20%;
                height: 100%;
                // background-color: orange;
                display: flex;
                align-items: center;


                justify-content: space-between;


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
}
</style>