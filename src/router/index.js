import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/common/login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'adminAndTeacherIndex',
      component: () => import('../components/admin/index'),
      children: [
        // 考试管理
        {
          path: '/examDescription', //考试管理功能描述
          component: () => import('../components/teacher/examDescription')
        },
        {
          path: '/selectExam', //查询所有考试
          component: () => import('@/components/teacher/selectExam')
        },
        {
          path: '/addExam', //添加考试
          component: () => import('@/components/teacher/addExam')
        },

        // 题库管理
        {
          path: '/questionDescription', //题库管理功能介绍
          component: ()=> import('@/components/teacher/questionDescription')
        },
        {
          path: '/selectQuestion', //查询所有题库
          component: () => import('@/components/teacher/selectQuestion')
        },
        {
          path: '/addQuestion', //增加题库主界面
          component: () => import('@/components/teacher/addQuestion')
        },
        {
          path: '/addQuestionChildren', //点击试卷跳转到添加题库页面
          component: () => import('@/components/teacher/addQuestionChildren')
        },

        // 成绩查询
        {
          path: '/allStudentsGrade', //所有学生成绩统计
          component: () => import('@/components/teacher/allStudentsGrade')
        },
        {
          path: '/grade', //学生成绩表格
          component: () => import('../components/charts/grade')
        },
        {
          path: '/selectExamToPart', //学生成绩分段查询
          component: () => import('../components/teacher/selectExamToPart')
        },
        {
          path: '/scorePart', //分段查询
          component: () => import('../components/charts/scorePart')
        },

        // 学生管理
        {
          path: '/studentManage', //查询所有学生
          component: () => import('@/components/teacher/studentManage')
        },
        {
          path: '/addStudent', //添加学生
          component: () => import('@/components/teacher/addStudent')
        },

        // 教师管理
        {
          path: '/teacherManage', //查询所有教师
          component: () => import('@/components/admin/teacherManage')
        },
        {
          path: '/addTeacher', //添加教师
          component: () => import('@/components/admin/addTeacher')
        },
      ]
    }
  ]
})
