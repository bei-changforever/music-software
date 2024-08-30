<template>
    <div class="captcha">
        <van-nav-bar>
            <template #left>
                <div class="left_btn" style="color: rgb(187,52,23)" @click="gotoLogin">
                    <van-icon name="arrow-left" color="rgb(187,52,23)" /> 返回密码登录
                </div>
            </template>
        </van-nav-bar>
        <van-form>
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field v-model="tel" type="tel" label="手机号" />
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <template #button>
                    <van-button size="small" type="primary" @click="sendSMS">发送验证码</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="YanZhen">提交</van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="shuaxin">刷新登入</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name: 'YanZhen',
    data() {
        return {
            tel: null,
            sms: null
        }
    },
    methods: {
        gotoLogin() {
            this.$router.push({name: 'Login'})
        },
        sendSMS() {
            this.axios({
                method: 'GET',
                url: '/captcha/sent',
                params: {
                    phone: this.tel
                }
            }).then(res=> {
                console.log(res)
            })
        },
        YanZhen() {
            console.log('触发了')
            this.axios({
                method: 'post',
                url: '/captcha/verify',
                params: {
                    phone: this.tel,
                    captcha: this.sms
                }
            }).then(res=> {
                console.log(res)
               
            })
        },
        shuaxin() {
            this.axios({
                method: 'get',
                url: '/login/refresh'
            }).then(res=> {
                if(res.data.code === 200) {
                    this.updateLogin(true)
                    this.$router.push({name: 'My'})
                }
            })
        },
        ...mapMutations(['updateLogin'])
    }
}
</script>
<style lang="less" scoped>

</style>