<!--所有学生-->
<!-- 先加载所有的学生信息到页面进行展示。点击对应学生后面的查看成绩按钮时，调用 checkGrade 方法，跳转到charts/grade组件，并将学生id传入 -->
<!-- 在grade组件中，通过学生id将成绩查询出来通过折线图的方式进行展示 -->
<template>
  <div class="all">
    <el-table :data="pagination.list" border>
      <el-table-column fixed="left" prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="institute" label="学院" width="200"></el-table-column>
      <el-table-column prop="studentMajor" label="专业" width="200"></el-table-column>
      <el-table-column prop="studentGrade" label="年级" width="200"></el-table-column>
      <el-table-column prop="clazz" label="班级" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
      <el-table-column fixed="right" label="查看成绩" width="150">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.id)" type="primary" size="small">查看成绩</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="[6, 10]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        //分页后的考试信息
        pageNum: 1, //当前页
        total: null, //记录条数
        pageSize: 6 //每页条数
      }
    };
  },
  created() {
    this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      //分页查询所有学生信息
      this.$axios(`/apis/student/${this.pagination.pageNum}/${this.pagination.pageSize}`).then(res => {
        this.pagination = res.data.data;
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(this.pagination.pageSize)
      this.getStudentInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      console.log(this.pagination.pageNum);
      this.getStudentInfo();
    },
    checkGrade(id) {
      this.$router.push({ path: "/grade", query: { studentId: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.all {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #dd5862 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>
