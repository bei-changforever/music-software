<template>
    <div class="todayhot">
        <div class="topic">今日热搜</div>
        <div class="hotList">
            <div class="songs_list">
                <ul>
                    <li v-for="(item,index) in hots">
                        <div class="left" @click="chooseSONG(item.first)">
                            <div class="paihang" style="color: white;margin-right: 10px;">
                                <van-tag type="danger">   {{(index + 1)}}</van-tag>
                            </div>
                            <div class="songs_detail">
                                <div class="song_name">
                                    {{item.first}}
                                </div>
                                <div class="song_desc">
                                    <van-tag type="danger" v-show="false">VIP</van-tag>
                                </div>
                            </div>
                        </div>
                        <div class="have_mv">
                            <van-icon name="video" v-show="false"/>
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
import { mapMutations } from 'vuex';
export default {
    name: 'ToDayHot',
    props: {
        hots: {

        }
    },
    created() {
        // console.log(this.hots)
    },
    methods: {
        chooseSONG(key) {
            this.updatesearchKEY(key)
            this.updateHotListshow(false)
        },
        ...mapMutations(['updatesearchKEY','updateHotListshow'])
    }
}
</script>
<style lang="less" scoped>
.todayhot {
    width: 100%;
    height: auto;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #FFB7B7 0%, #727272 100%), radial-gradient(60.91% 100% at 50% 0%, #FFD1D1 0%, #260000 100%), linear-gradient(238.72deg, #FFDDDD 0%, #720066 100%), linear-gradient(127.43deg, #00FFFF 0%, #FF4444 100%), radial-gradient(100.22% 100% at 70.57% 0%, #FF0000 0%, #00FFE0 100%), linear-gradient(127.43deg, #B7D500 0%, #3300FF 100%);
    background-blend-mode: screen, overlay, hard-light, color-burn, color-dodge, normal;

    .topic {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        font-weight: 700;
    }

    .hotList {
        width: 100%;
        height: auto;

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