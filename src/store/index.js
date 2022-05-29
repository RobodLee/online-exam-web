import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);  //配置内置vue注册vuex状态管理

// 用来定义一系列组件共享数据
// {{this.$store.state.XXX}}
const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
    index: '1',
    title: '考试管理',
    icon: 'icon-kechengbiao',
    content: [
      // {item1: '功能介绍', path: '/examDescription'},
      // {item2: '考试查询', path: 'selectExam'},
      // {item3: '添加考试', path: '/addExam'}
      {item: '功能介绍', path: '/examDescription'},
      {item: '考试查询', path: '/selectExam'},
      {item: '添加考试', path: '/addExam'}
    ],
  },
    {
      index: '2',
      title: '题库管理',
      icon: 'icon-tiku',
      content: [
        // {item1: '功能介绍', path: '/answerDescription'},
        // {item2: '所有题库', path: '/selectAnswer'},
        // {item3: '增加题库', path: '/addAnswer'},
        {item: '功能介绍', path: '/answerDescription'},
        {item: '所有题库', path: '/selectQuestion'},
        {item: '增加题库', path: '/addQuestion'},
        {path: '/addAnswerChildren'}
      ],
    },
    {
      index: '3',
      title: '成绩查询',
      icon: 'icon-performance',
      content: [
        // {item1: '学生成绩查询', path: '/allStudentsGrade'},
        {item: '学生成绩查询', path: '/allStudentsGrade'},
        {path: '/grade'},
        // {item2: '成绩分段查询', path: '/selectExamToPart'},
        {item: '成绩分段查询', path: '/selectExamToPart'},
        {path: '/scorePart'}
      ],
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'icon-role',
      content: [
        // {item1: '学生管理', path: '/studentManage'},
        // {item2: '添加学生', path: '/addStudent'}
        {item: '学生管理', path: '/studentManage'},
        {item: '添加学生', path: '/addStudent'}
      ],
    },
    // {
    //   index: '5',
    //   title: '教师管理',
    //   icon: 'icon-Userselect',
    //   content:[{item1:'教师管理',path:'/teacherManage'},{item2: '添加教师',path: '/addTeacher'}],
    // },
    // {
    //   index: '7',
    //   title: '模块管理',
    //   icon: 'icon-module4mokuai',
    //   content:[{item1:'模块操作',path:'/module'}],
    // }
  ],
}

//用来定义对共享数据状态修改方法，在这里面定义的方法都有一个默认参数，默认参数会将状态对象state传递给自定义方法
//调用：this.$store.commit('XXX')
const mutations = {
  practice(state, status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state, info) {
    state.userInfo = info
  }
}

// 用来定义对共享数据进行计算的方法，相当于组件中的computed，只计算一次，缓存结果，当数据改变时，才会再次触发
const getters = {
  testAdd() {
    return state.testHeHe * state.testHeHe;
  }
}

const actions = {
  getUserInfo(context, info) {
    context.commit('changeUserInfo', info)
  },
  getPractice(context, status) {
    context.commit('practice', status)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})
