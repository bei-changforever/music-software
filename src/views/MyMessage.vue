<template>
    <div class="mymesage">
        <van-nav-bar title="会员中心" left-text="返回" left-arrow   @click-left="onClickLeft">
            <template #right>
                <!-- <van-icon name="search" size="18" /> -->
            </template>
        </van-nav-bar>

        <van-empty description="暂无消息" />
    </div>
</template>
<script>
export default {
    name: 'MyMessage',
    methods:  {
        onClickLeft() {
            this.$router.push({
                name: 'Find'
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>