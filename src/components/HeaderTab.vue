<template>
    <div class="headertab" :style="backcolor">
       <div class="leftTab" @click="poShow">
        <i :class="TabData.LefticonName"></i>
       </div>
       <div class="centerTab">
        <div > 
            <input class="input" placeholder="请输入关键字" type="text" @click="$router.push({name: 'Search'})">
        </div>
       </div>
       <div class="rightTab">
        <i :class="TabData.RighticonName"></i>
       </div>
    </div>
</template>
<script>
export default {
    props: {
        TabData: {
            type: [Array, String, Object]
        }
    },
    name: 'HeaderTab',
    computed:{
        backcolor() {
            let res = 'background-color: white;'
            if(this.$route.name === 'SheQu' ) {
                res = 'background-color: black;color: white;'
            }
            return res
        }
    },
    methods: {
        poShow() {
                let show  = false
                this.$emit('poShow',show || !show)
                
        }
    }
}
</script>
<style lang="less" scoped>
    
    .headertab {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100vw;
        height: 60px;
        background-color: rgb(242,242,242);
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .leftTab {
            flex: 1;
           
            display: flex;
            align-items: center;

            i {
                font-size: 20px;
            }
        }

        .centerTab {
            flex: 6;

             .input {
                background-color: rgb(248,248,248) !important;
             }
            
        }

        .rightTab {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            i {
                font-size: 20px;
            }
        }
    }
    
</style>

<style lang="less">
.headertab {
    .centerTab {
        .input {
            width: 100%;
            height: 40px;
            border: none;
            border-radius: 20px;
            text-indent: 2em;
            background-color: rgb(248,248,248);
        }
    }
}

</style>

