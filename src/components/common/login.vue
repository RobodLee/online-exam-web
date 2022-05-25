<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">在线考试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <!--:model="formLabelAlign"  将formLabelAlign与model属性绑定   :model=v-bind:model     -->
            <el-form label-position="left" :model="formLabelAlign" label-width="80px">
              <el-form-item label="用户名">
                <!--v-model.number 限制为数字类型-->
                <el-input v-model.number="formLabelAlign.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" type="password"></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        formLabelAlign: {
          username: '9527',
          password: '123456'
        }
      }
    },
    methods: {
      login() {
        console.log('submit!');
        // this.$http.post("http://localhost:9000/user/login", this.formLabelAlign).then(res => {
        //   console.log(res.data);
        // })
        this.$axios({
          url: `apis/user/login`,
          method: 'post',
          data: {
            ...this.formLabelAlign
          }
        }).then(res => {
          console.log(res.data);
          let resData = res.data
          let code = resData.code
          if (code === 200) {
            resData = resData.data
            let name = resData.name
            let id = resData.id
            let role = resData.role
            this.$cookies.set("loginName", name+'110')
            this.$cookies.set("loginId", id)
            this.$cookies.set("loginRole", role)
            switch (role) {
              case '0': //管理员
                console.log('管理员登录')
                this.$router.push({path: '/index'}) //跳转到首页
                break
              case '1':
                console.log('教师登录')
                // todo 教师登录
                break
              case '2':
                console.log('学生登录')
                // todo 学生登录
                break
            }
          }


        })
      },
    }
  }
</script>

<style scoped>
  #login {
    color: #000;
    background-color: #fff;
  }

  #login .bg {
    position: fixed; /*固定定位*/
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    background: url('../../assets/img/loginbg.png') center top / cover no-repeat;
    background-color: #b6bccdd1 !important;
  }

  #login .main-container {
    display: flex; /*弹性布局*/
    justify-content: center; /*在主轴居中对齐*/
    align-items: center; /*设置侧轴上的子元素的排列方式，垂直居中*/
  }

  #login .main-container .top {
    margin-top: 100px;
    font-size: 30px;
    color: #ff962a;
    display: flex;
    justify-content: center;
  }

  #login .top .icon-kaoshi {
    font-size: 80px;
  }

  /*在线考试系统*/
  #login .top .title {
    margin-top: 20px;
  }

  #login .bottom {
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  /*账号登录*/
  #login .bottom .title {
    text-align: center;
    font-size: 30px;
  }

  .bottom .container .title {
    margin: 30px 0px;;
  }

  .bottom .submit .row-login {
    width: 100%;
    background-color: #04468b;
    border-color: #04468b;
    margin: 20px 0px 10px 0px;
    padding: 15px 20px;
  }

  .bottom .submit {
    display: flex;
    justify-content: center;
  }
</style>
