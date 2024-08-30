<template>
    <div class="hottoplist">
        <van-nav-bar :border="false">
            <template #left>
                <van-icon name="arrow-left" color="black" @click="$router.go(-1)"/>
            </template>
        </van-nav-bar>
        <div class="topic_box">
            <div class="top">
                <div class="img">
                    <img class="auto-img" :src="hotTopl.sharePicUrl" alt="">
                </div>
                <div class="desc">
                    <div class="title">
                        {{ hotTopl.title }}
                    </div>
                    <div class="count">
                        {{ changeCount(hotTopl.participateCount) }}
                    </div>
                </div>
                <div class="btn">
                    <van-button round type="danger">+关注</van-button>
                </div>
            </div>
            <div class="center">
                <span v-for="item in hotTopl.text">
                    {{ item }}</span>
            </div>
        </div>
        <div class="mt">热门话题动态</div>
        <div class="wwwwter">
            <waterFull :pushjson="pushjson"></waterFull>
        </div>
        
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import waterFull from '../components/waterfull.vue'
export default {
    name: 'HotTopist',
    data() {
        return {
            hotTopl: [],
            pushjson: []
        }
    },
    components: {
        waterFull
    },
    created() {
        let actid = this.$route.query.actid
        this.getTopList(actid)
        this.getfuck(actid)
    },
    methods: {
        getTopList(id) {
            this.axios({
                method: 'get',
                url: '/topic/detail',
                params: {
                    actid: id
                }
            }).then(res => {
                if (res.data.code === 200) {
                    this.hotTopl = res.data.act
                }
            })
        },
        getfuck(id) {
            this.axios({
                method: 'get',
                url: '/topic/detail/event/hot',
                params: {
                    actid: id
                }
            }).then(res=> {
                // console.log(res)
                if(res.data.code === 200) {
                    // console.log(JSON.parse(res.data.events[0].json))
                    this.pushjson  = res.data.events
         

                    this.pushjson.forEach(item=> {
                        item.json = JSON.parse(item.json)
                    })

                    console.log(this.pushjson)
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
.hottoplist {
    width: 100%;
    height: auto;

    .topic_box {
        padding: 10px;
        margin-top: 10px;
        width: 100%;
        height: auto;
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        display: flex;
        flex-direction: column;


        .top {
            width: 100%;
            height: 70px;

            display: flex;


            .img {
                width: 70px;
                height: 70px;

                .auto-img {
                    width: 100%;
                    display: block;
                    border-radius: 15px;
                }
            }

            .desc {
                margin-left: 5px;
                width: 200px;
                height: 70px;
                display: flex;
                flex-direction: column;

                .title {
                    width: 100%;
                    height: 35px;
                    font-size: 18px;
                    line-height: 35px;
                }

                .count {
                    width: 100%;
                    line-height: 35px;
                    height: 35px;
                    color: #999;
                }
            }


            .btn {
                width: 70px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;

                .van-button {
                    min-width: 70px;
                    height: 30px;
                    padding: 5px;
                }
            }


        }

        .center {
            margin-top: 5px;
            color: #999;
        }
    }
    .mt {
        width: 100%;
        height: 25px;
        font-size: 16px;
        text-indent: 1.0em;
        margin-top: 10px;
        // background-color: skyblue;
    }
 
    .wwwwter {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: pink;
    }

}
</style>