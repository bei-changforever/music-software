<template>

  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadData">

    <p v-for="(item, index) in loadedData" :key="index">{{ item.msg }}</p>

  </van-list>
</template>

<script>
export default {
  name: 'LazyLoading',
 
  data() {
    return {

      //显示加载提示
      loading: false,

      //是否加载数据完成
      finished: false,

      //总数据量
      myData: [],

      //加载数据量
      count: 30,

      //数据偏移量
      offset: 0,

      //已加载的数据量
      loadedData: [],

      //函数防抖定时器序号
      timer: null

    };
  },

  created() {

    //创建初始化数据
    for (let i = 0; i < 200; i++) {
      this.myData.push({ msg: '数据' + (i + 1) });
    }

  },

  methods: {

    initLoad() {
      

      let data = this.myData.slice(this.offset, this.offset + this.count);
      console.log('data.length ==> ', data.length);
      console.log('this.count ==> ', this.count);

      this.loadedData.push(...data);

      this.offset += this.count;

      this.loading = false;


      setTimeout(() => {
        console.log('aaa');
        //如果本次数据加载不足this.count【30条数据】, 则说明数据已加载完毕, 则将this.finished设置为true
        if (data.length < this.count) {
          console.log('数据已加载完毕');
          this.finished = true;
        } else {
          this.laoding = true;
        }


      }, 600)

    },

    //每次触底加载数据方法
    loadData() {
      // console.log('触发触底加载');
      console.log('this.finished ==> ', this.finished);

      //函数防抖控制触发频率
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.timer = null;
        console.log('函数防抖控制触发频率');

        this.initLoad();

      }, 1000)

    }
  }
}
</script>

<style lang="less" scoped>

</style>