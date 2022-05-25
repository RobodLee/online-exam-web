<!--左边下拉导航栏-->
<template>
  <div id="left">
    <el-menu
      active-text-color="#dd5862"
      text-color="#000"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="flag"
      background-color="#124280"
      menu-trigger="click" router>
      <el-submenu v-for="(menuItem,index) in menu" :index='menuItem.index' :key="index">
        <template slot="title">
          <div class="left-width">
            <i class="iconfont" :class="menuItem.icon"></i>
            <span slot="title" class="title">{{menuItem.title}}</span>
          </div>
        </template>
        <!--<el-menu-item-group v-for="(list,index1) in item.content" :key="index1">-->
        <!--  <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item1 != null">{{list.item1}}-->
        <!--  </el-menu-item>-->
        <!--  <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item2 != null">{{list.item2}}-->
        <!--  </el-menu-item>-->
        <!--  <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item3 != null">{{list.item3}}-->
        <!--  </el-menu-item>-->
        <!--</el-menu-item-group>-->
        <el-menu-item v-for="(contentItem,contentIndex) in menuItem.content"
                      :key="contentItem.path"
                      @click="handleTitle(menuItem.index,contentIndex)"
                      v-if="contentItem.item != null">{{contentItem.item}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import store from '../../store/index'
import {mapState} from 'vuex'

export default {
    name: "mainLeft",
    data() {
      return {}
    },
    computed: mapState(["flag", "menu"]),
    created() {
      this.addData()
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      //点击标题传递参数给navigator组件
      handleTitle(menuItemIndex,contentIndex) {
        //发送事件的语法：this.$bus.$emit(发送的事件名,传递的参数)
        console.log(menuItemIndex)
        this.$bus.$emit('sendIndex', menuItemIndex,contentIndex)
      },
      addData() {
        //如果是管理员登录，就添加一个教师管理的标签
        let role = this.$cookies.get("loginRole")
        if (role === '0') {
          this.menu.push({
            index: '5',
            title: '教师管理',
            icon: 'icon-Userselect',
            content: [
              // {item1: '教师管理', path: '/teacherManage'},
              // {item2: '添加教师', path: '/addTeacher'}
              {item: '教师管理', path: '/teacherManage'},
              {item: '添加教师', path: '/addTeacher'}
            ],
          })
        }
      }
    },
    store
  }
</script>

<style>
  .el-menu-vertical-demo .el-submenu__title {
    overflow: hidden;
  }

  .left-width .iconfont {
    font-size: 18px;
    color: #fff;
  }

  .left-width {
    width: 213px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 900px;
  }

  #left {
    height: 900px;
    background-color: #124280;
    z-index: 0;
  }

  #left .el-menu-vertical-demo .title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-left: 14px;
  }

  .el-submenu {
    border-bottom: 1px solid #eeeeee0f !important;
  }

  .el-submenu__title:hover {
    background-color: #fff;
  }

  .el-submenu__title i {
    color: #fbfbfc !important;
  }
</style>
