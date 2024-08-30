<template>
    <div class="ce" >
        <van-nav-bar :border="false"  >
            <template #left>
               <div class="title">
                <van-icon :name="CebianData.iconName" color="rgb(86,86,86)"/>
                &nbsp; 
                <span class="text_style">{{CebianData.title}}</span>
               </div>
            </template>
            <template #title>
                <div class="text">
                    
                </div>
            </template>

            <template #right>
                <van-switch v-if="CebianData.id === 0" v-model="checked" size="15px" active-color="#ee0a24" inactive-color="#dcdee0" @click="changeNight"/>     
                <van-icon v-else-if="!CebianData.id" name="arrow" color="#d5d5d5"/>
            </template>
        </van-nav-bar>
    </div>
</template>
<script>
import { mapMutations,mapState } from 'vuex'
export default {
    name: 'CeNav',
    props: {
        CebianData: {
            type: [String,Object,Array],
            default() {
                return {

                }
            }
        },
    },
    data(){
        return {
            checked: false
        }
    },
    computed: {
        ...mapState(['NightColor', 'isNight', 'LightColor'])
        },
    methods: {
        changeNight() {
            console.log(this.checked)
            if(this.checked) {
                this.updateisNight(true)
            }
            else {
                this.updateisNight(false)
            }
            this.checked = !this.checked
        },
        ...mapMutations(['updateisNight'])
    }
}
</script>
<style lang="less" scoped>
      .ce {
        width: 100%;
        height: auto;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
       
      /deep/  .van-nav-bar {
            height: 30px;
            width: 280px;
            // background-color: pink;

          
          
            .van-nav-bar__content {
                height: 30px;
                // background-color: pink;
                background-color: white;
            }
        }
      }
</style>