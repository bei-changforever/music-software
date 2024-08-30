<template>
    <div class="commenttop">
        <div class="hotcomments">
            <ul>
                <li>
                    <div class="left">
                        <img class="auto-img" :src="nowComments.user.avatarUrl" alt="">
                    </div>
                    <div class="right">
                        <div class="nickname">
                            <div class="nickname-left">
                                {{nowComments.user.nickname}}
                                <br>
                                <p style="color: #999;font-size: 12px;">
                                {{nowComments.timeStr}}
                            </p>
                            </div>
                            <div class="nickname-right"><van-icon name="like" color="red" v-if="nowComments.liked" /><van-icon
                                    name="like" v-else /></div>
                        </div>
                        <div class="desc">
                            {{nowComments.content}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="hotcomments" v-if="isLogin">
            <ul>
                <li v-for="(item,index) in keyList">
                  <!-- {{item.reply}} -->
                    <div class="left">
                        <img  class="auto-img" :src="selfITEMS[0].picUrl" alt="">
                    </div>
                    <div class="right">
                        <div class="nickname">
                            <div class="nickname-left" >
                              {{selfITEMS[0].name}}
                                <br>
                                <p style="color: #999;font-size: 12px;">
                           {{item.reply[0].Thattime}}
                            </p>
                            </div>
                            <div class="nickname-right" @click="delHistory(item,index)"><van-icon name="delete-o" /></div>
                        </div>
                        <div class="desc">
                          {{item.reply[0].mes}}
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'CommentTop',
    props: {
        nowComments: {

        },
        keyList: {

        }
    },
    mounted() {
        console.log(this.keyList)
    },
    computed: {
        ...mapState(['commentId','isLogin','selfITEMS'])
    },
    methods: {
        delHistory(item,index) {
             console.log(item.NowcommentId)
              console.log(index)
              if(this.commentId === item.NowcommentId) {
               let deldata  = JSON.parse(localStorage[`keycomlist_${this.commentId}`])
               deldata.splice(index,1)
               localStorage[`keycomlist_${this.commentId}`] = JSON.stringify(deldata)
            //    console.log(deldata)
               this.$emit('upkeyList')
              }
        }
    }
}
</script>
<style lang="less" scoped>

.commenttop {
    width: 100%;
    height: auto;

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

    .div_bottom {
        width: 100%;
        height: 53px;
        position: fixed;
        bottom: 0;
    }
}
    
</style>