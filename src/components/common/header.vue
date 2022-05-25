<!-- 顶部信息栏 -->
<template>
  <header id="topbar">
    <el-row>
      <el-col :span="4" class="topbar-left">
        <i class="iconfont icon-kaoshi"></i>
        <span class="title" @click="index()">EXAM-SYSTEM</span>
      </el-col>
      <el-col :span="20" class="topbar-right">
        <i class="el-icon-menu" @click="toggle()"></i>
        <div class="user">
          <span>{{user.userName}}</span>
          <img src="@/assets/img/userimg.png" class="user-img" ref="img" @click="showSetting()"/>
          <!--过渡动画 https://element.eleme.cn/#/zh-CN/component/transition#an-xu-yin-ru-->
          <transition name="fade">
            <div class="out" ref="out" v-show="login_flag">
              <ul>
                <li><a href="javascript:;">用户信息</a></li>
                <li><a href="javascript:;">设置</a></li>
                <li class="exit" @click="exit()"><a href="javascript:;">退出登录</a></li>
              </ul>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
    data() {
      return {
        login_flag: false,
        user: { //登录的用户信息
          userName: null,
          userId: null
        }
      }
    },
    created() {
      this.getUserInfo()
    },
    computed: mapState(["flag", "menu"]),   //mapState，将state中的字段映射到计算属性
    methods: {
      //显示、隐藏退出按钮
      showSetting() {
        this.login_flag = !this.login_flag
      },
      //左侧栏放大缩小
      ...mapMutations(["toggle"]),  //调用toggle方法，对flag的值取反
      getUserInfo() { //获取用户信息
        let userName = this.$cookies.get("loginName")
        let userId = this.$cookies.get("loginId")
        this.user.userName = userName
        this.user.userId = userId
      },
      index() {
        console.log('EXAM-SYSTEM')
        this.$router.push({path: '/index'}) //跳转到首页，这句没啥用，报错
      },
      exit() {
        let role = this.$cookies.get("loginRole")
        this.$router.push({path: "/"}) //跳转到登录页面
        //清除cookie
        this.$cookies.remove("loginName")
        this.$cookies.remove("loginId")
        this.$cookies.remove("loginRole")
        if (role === '0') {
          this.menu.pop()
        }
      }
    },
    // store  todo 在这里不知道有什么用
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  #topbar {
    position: relative;
    z-index: 10;
    background-color: #124280;
    height: 80px;
    line-height: 80px;
    color: #fff;
    box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
  }

  #topbar .topbar-left {
    height: 80px;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .topbar-left .icon-kaoshi {
    font-size: 60px;
  }

  .topbar-left .title {
    font-size: 20px;
    cursor: pointer;
  }

  .topbar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .topbar-right .user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .topbar-right .el-icon-menu {
    font-size: 30px;
    margin-left: 20px;
  }

  .topbar-right .user {
    position: relative;
    margin-right: 40px;
    display: flex;
  }

  .topbar-right .user .user-img {
    margin-top: 15px;
    margin-left: 10px;
    cursor: pointer;
  }

  .user .out {
    font-size: 14px;
    position: absolute;
    top: 80px;
    right: 0px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 12px;
  }

  .user .out ul {
    list-style: none;
  }

  .user .out ul > li {
    height: 26px;
    line-height: 26px;
  }

  .out a {
    text-decoration: none;
    color: #000;
  }

  .out .exit {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid #ccc;
  }
</style>
