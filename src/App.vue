<template>
  <div id="app">
    <!-- <FM></FM> -->

    <router-view />



    <div class="base_fo" :style="fixStyle">
      <FooterMusic v-show="(this.$route.name !== 'Login' && this.$route.name !== 'Captcha' &&this.$route.name !== 'SheQu')"></FooterMusic>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import FooterMusic from './components/FooterMusic.vue'
export default {
  components: {
    FooterMusic
  },
  computed: {
    fixStyle() {
      let res = { bottom: '0px' }

      if (this.$route.path == '/' || this.$route.name == 'Find' || this.$route.name == 'BoKe' || this.$route.name == 'My' || this.$route.name == 'SheQu' || this.$route.name == 'GuanZhu'
      ) {
        res = { bottom: '50px' }
      }

      // console.log('this.$route=>', this.$route)

      return res
    },

    ...mapState(['NightColor', 'isNight', 'LightColor'])
  },
  created() {
    // 判断本地歌单收藏ID数组是否存在 不存在则创建一个空数组
    if (!localStorage.mychooselikemusicID) {
      localStorage.setItem('mychooselikemusicID', JSON.stringify([]))
    }

    if(!localStorage.myLoveMusicID) {
      localStorage.setItem('myLoveMusicID',JSON.stringify([]))
    }

    // console.log(this.$route.path);
    // console.log('this.$route=>',this.$route)
  },
  watch: {
    "$store.state.isNight"(newval, oldval) {
      if (newval) {

      }
    }
  }
}

</script>

<style lang="less">
.app {
  min-height: 100vh;
  min-width: 100vw;
}

.base_fo {
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 2;
}
</style>

<style>
#app {
  font-family: wyyttf;
}

</style>
