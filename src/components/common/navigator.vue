<template>
  <div id="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="title">{{active.title}}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:active.content[contentIndex].path}">
        {{active.content[contentIndex].item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import store from '@/store/index'
import {mapState} from 'vuex'

export default {
    data() {
      return {
        active: [],
        menuItemIndex: null,  //当前点击的是哪一个menu
        contentIndex: null    //当前点击的是menu中的哪一个content
      }
    },
    computed: mapState(["menu"]),
    methods: {
      getIndex() {
        this.$bus.$on('sendIndex', (menuItemIndex, contentIndex) => {
          this.menuItemIndex = menuItemIndex
          this.contentIndex = contentIndex
          this.active = this.menu[menuItemIndex - 1]
          // console.log(JSON.stringify(this.active))
        })
      }
    },
    created() {
      this.getIndex()
    },
    beforeDestroy() {
      // this.bus.$off('sendIndex') //销毁
    },
    store
  }
</script>

<style scoped>
  #nav .el-breadcrumb {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }

  #nav .el-breadcrumb .title {
    font-weight: bold;
  }
</style>
