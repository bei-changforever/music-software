<template>
    <div class="maintab" >

        <van-tabbar :border="false" :style="backcolor"  v-model="active" active-color="rgb(251,84,87)" inactive-color="#646566" route>
            <van-tabbar-item :style="backcolor" v-for="(item,index) in TabData" :key="index" :to="{name: item.name}">
                <span>{{item.title}}</span>
                <template #icon>
                    <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
                   <i  :class="item.iconName"></i>
                </template>
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    props: {
        TabData: {
            type: Array,
        },
    },
    name: 'MainTab',
    data(){
        return {
            active: 0
        }
    },
    computed: {
        ...mapState(['NightColor', 'isNight', 'LightColor']),
        backcolor() {
            let res = 'background-color: white;'
            if(this.$route.name === 'SheQu' ) {
                res = 'background-color: black'
            }
            return res
        }
    },
    created() {
        // console.log(this.$route)
        // console.log(this.backcolor)
    }
}
</script>
<style lang="less" scoped>
    .maintab {
        width: 100%;
        height: 50px;
        position: sticky;
        bottom: 0;

        span {
            font-size: 15px;
        }

        /deep/ .van-tabbar-item__icon i::before {
            font-size: 20px;
        }
    }
</style>