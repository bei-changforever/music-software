<template>
    <div class="login">
        <div class="logo_box">
            <van-nav-bar>
                <template #left>
                    <div class="logo" @click="goback">
                        <img src="../assets/images/logo.jpg" alt="">
                        <p>网易云音乐</p>
                    </div>
                </template>
                <template #right>
                    <p class="fr_style" @click="goback">首页</p>
                </template>
            </van-nav-bar>
        </div>
        <!-- 登录 -->
        <div class="login-box">
            <div class="login_box_bk">
                <img src="../assets/images/login_bk.png" alt="">
            </div>
            <van-form>
                <van-field v-model="userInfoLogin.phone" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="userInfoLogin.password" type="password" name="密码" label="密码" placeholder="密码"
                    right-icon="closed-eye" :rules="[{ required: true, message: '请填写密码' }]" />
                <div class="change_yzm" style="margin: 16px;color: #999;" @click="gotoYz">切换手机验证码登录
                    <van-icon name="arrow" />
                </div>
                <div class="QR_code" style="margin: 16px;color: #999;">切换扫描二维码登录
                    <van-icon name="arrow" />
                </div>
                <div class="forget" style="margin-left: 16px;color: #999;" @click="xiugaimima">忘记密码? <van-icon name="arrow" /></div>
                <div style="margin: 16px;margin-top: 30px; ">
                    <van-button round block type="danger" native-type="submit" @click="Login">登录</van-button>
                </div>
            </van-form>
        </div>
        <div class="r_btn">
            <van-button type="primary" round @click="changeShow">注册</van-button>
        </div>
        <!-- 注册 -->
        <van-popup position="bottom" v-model="show">
            <div class="register">
                <div class="r-title" style="margin-left: 15px">注册</div>
                <van-form>
                    <van-field v-model="userInfoLogin.phone" name="手机号码" label="手机号码" placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写手机号码' }]" />
                    <van-field v-model="userInfoLogin.password" type="password" name="密码" label="密码" placeholder="密码"
                        right-icon="closed-eye" :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="userInfoLogin.sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                        <template #button>
                            <van-button size="small" @click="ChangeisDisabled" :disabled="isDisabled" type="danger">发送验证码</van-button>
                        </template>
                    </van-field>
                    <div style="margin: 16px;margin-top: 30px;">
                        <van-button round block type="danger" native-type="submit">注册</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
        <!-- 修改密码 -->
        <van-popup position="bottom" v-model="Isshow">
            <div class="register">
                <div class="r-title" style="margin-left: 15px">修改密码</div>
                <van-form>
                    <van-field v-model="userInfoLogin.phone" name="手机号码" label="手机号码" placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写手机号码' }]" />
                    <van-field v-model="userInfoLogin.password" type="password" name="密码" label="密码" placeholder="密码"
                        right-icon="closed-eye" :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="userInfoLogin.sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                        <template #button>
                            <van-button size="small" @click="ChangeisDisabled" :disabled="isDisabled" type="info">发送验证码</van-button>
                        </template>
                    </van-field>
                    <div style="margin: 16px;margin-top: 30px;">
                        <van-button round block type="info" native-type="submit">提交确定</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>

    </div>
</template>
<script>

export default {
    name: 'Login',
    data() {
        return {
            //登录数据
            userInfoLogin: {
                phone: '',
                password: '',
                sms: ''
            },
            show: false,
            Isshow: false,
            isDisabled: false
        }
    },
    methods: {
        gotoYz() {
            console.log('点击了')
            this.$router.push({ name: 'Captcha' })
        },
        changeShow() {
            this.show = !this.show
        },
        xiugaimima() {
            this.Isshow = !this.Isshow
        },
        ChangeisDisabled() {
            this.isDisabled = !this.isDisabled
            setTimeout(()=> {
                this.isDisabled = false
            },6000)
        },
        goback() {
            this.$router.push({
                name: 'Find'
            })
        },
        Login() {
            this.$store.dispatch('getPhoneLogin',{
                phone: this.userInfoLogin.phone,
                password: this.userInfoLogin.password
            })
        }
        ///login/cellphone?phone=xxx&password=yyy
        
        
    }
}
</script>
<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-color: white;

    .logo_box {

        .van-nav-bar {
            height: 50px;

            /deep/ .van-nav-bar__content {
                height: 100%;

                .logo {
                    width: 200px;
                    height: 45px;
                    display: flex;
                    align-items: center;

                    p {
                        margin-left: 10px;
                        font-weight: 700;
                        color: #666;
                    }

                    img {
                        width: 45px;
                        height: 45px;
                        display: block;
                    }
                }

                .fr_style {
                    color: brown;
                }
            }
        }
    }

    .login-box {
        margin-top: 50px;
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: column;

        .login_box_bk {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
        }
    }

    .r-title {
        font-size: 18px;
    }

    .r_btn {
        width: 100vw;
        height: 50px;
        // background-color: pink;
        display: flex;
        justify-content: center;
        align-items: center;

        .van-button {
            width: 92%;
        }
    }
}
</style>