<template>
    <div class="search">
        <div class="search_top">
            <div class="search_left" @click="$router.go(-1)">
                <van-icon name="arrow-left" />
            </div>
            <div class="search_center">
                <input type="text" placeholder="请输入关键字" v-model="searchKey" @keydown.enter="enterKey" />
            </div>
            <div class="search_right" @click="enterKey">搜索</div>
        </div>
        <div class="search_fenlei">
            <ul>
                <li @click="$router.push({ name: 'SongList' })"><van-icon name="friends" color="rgb(247,61,58)" />歌手
                </li>
                <li><van-icon name="hot" color="rgb(247,61,58)" @click="ShowToDayListSearch" />热搜</li>
                <li  @click="$router.push({name: 'HotMusic'})"><van-icon name="hot" color="rgb(247,61,58)"/>热门歌单分类</li>
            </ul>
        </div>
        <div class="searchHistory">
            <div class="searchSpan_top">
                <span class="searchSpan" v-if="(keyWorldList.length != 0)">搜索历史</span>
                <span class="searchSpan" v-else>暂无搜索历史</span>
                <span class="icon" >
                    <van-icon name="delete-o" v-if="(keyWorldList.length != 0)"  @click="delHistory" />
                </span>
            </div>

            <span class="spanKey" v-for="(item, index) in keyWorldList" :key="index" @click="searchHistory(item)">{{
                    item
            }}</span>
        </div>
        <div class="songs_list">
            <ul>
                <li v-for="(item, i) in searchList" :key="i">
                    <div class="left" @click="updateSIndex(item)">
                        <div class="paihang">{{ i + 1 }}</div>
                        <div class="songs_detail">
                            <div class="song_name">{{ item.name }}</div>
                            <div class="song_desc">
                                <van-tag type="danger" v-if="item.fee == 1">VIP</van-tag> 
                                <span>--{{ item.artists[0].name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="have_mv">
                        <van-icon name="video" v-if='item.mvid != 0' />
                    </div>
                    <div class="xuanze">
                        <van-icon name="bars" />
                    </div>
                </li>
            </ul>
        </div>
        <van-popup v-model="$store.state.HotListshow" style="height: 50%; width: 80%;border-radius: 15px;">
            <ToDayListSearch :hots="hots"></ToDayListSearch>
        </van-popup>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>
<script>
import ToDayListSearch from '../components/ToDayHotSearch.vue'
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Search',
    data() {
        return {
            keyWorldList: [],
            searchKey: "",
            searchList: [],
            hots: [],
            // HotListshow: false
            toggle: false
        }
    },
    computed: {
        ...mapState(['HotListshow', 'searchKEY'])
    },
    components: {
        ToDayListSearch
    },
    mounted() {
        this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) ? JSON.parse(localStorage.getItem("keyWorldList"))
            : [];
    },
    methods: {
        ShowToDayListSearch() {
            this.getHotSearch()
            // this.toggle = !this.toggle
            if(this.toggle) {
                this.updateHotListshow(false)
            }
            else {
                this.updateHotListshow(true)
            }
        },
        enterKey() {
            if (this.searchKey !== '') {
                this.keyWorldList.unshift(this.searchKey)

                this.keyWorldList = [...new Set(this.keyWorldList)]

                

                if (this.keyWorldList.length > 10) {
                    this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
                }
                this.getSearchMusic(this.searchKey)
                localStorage.setItem('keyWorldList', JSON.stringify(this.keyWorldList))
                this.searchKey = ''
            }
        },
        delHistory() {
            localStorage.removeItem("keyWorldList");
            this.keyWorldList = [];
        },
        searchHistory(keywords) {
            this.getSearchMusic(keywords)
        },
        getSearchMusic(keywords) {
            this.axios({
                method: 'get',
                url: '/search',
                params: {
                    keywords,
                    limit: 25
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.searchList = res.data.result.songs
                    console.log('=>',this.searchList)
                }
            })
        },
        getHotSearch() {
            this.axios({
                method: 'get',
                url: '/search/hot',
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.hots = res.data.result.hots
                }
            })
        },
        updateSIndex(item) {
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            item.ar = [
                {
                    name: item.artists[0].name
                }
            ]
            this.$store.commit('pushPlayList', item)
            this.$store.commit('updateIndex', this.$store.state.playList.length - 1)
        },
        ...mapMutations(['updateHotListshow'])
    },
    watch: {
        "$store.state.searchKEY"(newval) {
            console.log(newval)
            this.getSearchMusic(newval)
            this.keyWorldList.unshift(newval)
        }
    }

}
</script>
<style lang="less">
.search {
    width: 100vw;
    height: 100vh;

    .search_top {
        margin-top: 5px;
        width: 100%;
        height: 53.97px;
        background-color: white;
        display: flex;

        .search_left {
            width: 15%;
            height: 100%;
            text-align: center;
            line-height: 53.97px;
            font-size: 18px;
        }

        .search_center {
            width: 70%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            // background-color: pinks;
            input {
                width: 100%;
                height: 40px;
                border: 0;
                border-radius: 25px;
                outline: none;
                text-indent: 2em;
                background-color: rgb(248, 248, 248) !important;
            }

        }

        .search_right {
            width: 10%;
            height: 100%;
            text-align: center;
            line-height: 55px;
            font-size: 18px;
            margin-left: 10px;
        }


    }

    .search_fenlei {
        width: 100%;
        height: 50px;
        background-color: white;

        ul {
          
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;

            li {
                position: relative;
                width: 35%;
                height: 100%;
                text-align: center;
                line-height: 50px;
                font-size: 16px;

                &::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 2px;
                    height: 20px;
                    background-color: #999;
                }

                &:last-child::after {
                    content: '';
                    width: 0;
                    height: 0;
                }
            }
        }
    }

    .searchHistory {
        padding: 10px;
        width: 100%;
        position: relative;

        .searchSpan_top {
            width: 100%;
            height: 20px;
            display: flex;
            justify-content: space-between;

            .searchSpan {
                font-weight: 700;
            }

            .icon {
                font-size: 18px;
                font-weight: 700;
            }
        }


        .spanKey {
            padding: 0.1rem 0.2rem;
            background-color: white;
            border-radius: 0.4rem;
            margin: 0.1rem 0.2rem;
            display: inline-block;
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