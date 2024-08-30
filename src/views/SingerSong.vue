<template>
  <div class="singer-song">
    <van-nav-bar title="歌手歌单">
      <template #left>
        <div class="arrow_left">
          <van-icon name="arrow-left" color="black" @click="$router.go(-1)" />
        </div>
      </template>
      <template #right>
        <!-- <van-icon name="search" size="18" /> -->
      </template>
    </van-nav-bar>
    <div class="header">

      <div class="img">
        <img class="auto-img" :src="SingerPicUrl" alt="">
      </div>
    </div>
    <div class="songs_list">
      <ul>
        <li v-for="(item, i) in singerSongs">
          <div class="left" @click="updateNewMusic(item)">
            <div class="paihang">{{ i + 1 }}</div>
            <div class="songs_detail">
              <div class="song_name">{{ item.al.name }}</div>
              <div class="song_desc">
                <van-tag type="danger" v-if="(item.fee == 1)">VIP</van-tag> <span v-for="(val, index) in item.ar">--{{
                    val.name
                }}</span>
              </div>
            </div>
          </div>
          <div class="have_mv">
            <van-icon name="video" v-if="(item.mv != 0)" />
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
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'SingerSong',
  data() {
    return {
      singerSongs: []
    }
  },
  computed: {
    ...mapState(['SingerPicUrl'])
  },

  created() {
    //获取歌手的id
    let singerId = this.$route.params.id;
    console.log('singerId ==> ', singerId);
    this.getArtistSongs(singerId)
  },
  methods: {
    getArtistSongs(id) {
      this.axios({
        method: 'GET',
        url: '/artist/songs',
        params: {
          id,
          order: 'hot',
          limit: 20
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.singerSongs = res.data.songs
        }
      })
    },
    updateNewMusic(item) {
      this.$store.commit('pushPlayList', item)
      this.$store.commit('updateIndex', this.$store.state.playList.length - 1)
    },
    ...mapMutations(['pushPlayList', 'updateIndex'])
  }
}
</script>

<style lang="less" scoped>
.singer-song {

  width: 100vw;
  height: 100vh;

  .header {
    width: 100%;
    height: auto;

    .img {
      width: 100%;
      height: 250px;

      .auto-img {
        width: 100%;
        height: 250px;
        display: block;
      }
    }
  }

  .songs_list {
    margin-top: 10px;
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
        background-color: white;
        border-radius: 15px;
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