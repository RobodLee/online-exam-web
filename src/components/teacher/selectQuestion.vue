<!--查询所有题库-->
<template>
  <div class="exam">
    <el-table :data="pagination.list" border :row-class-name="tableRowClassName">
      <el-table-column fixed="left" prop="subject" label="试卷名称" width="180"></el-table-column>
      <el-table-column prop="question" label="题目信息" width="490"></el-table-column>
      <el-table-column prop="section" label="所属章节" width="200"></el-table-column>
      <el-table-column prop="type" label="题目类型" width="200"></el-table-column>
      <el-table-column prop="score" label="试题分值" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column>
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
    this.getQuestionInfo();
  },
  methods: {
    getQuestionInfo() {
      //分页查询所有题库信息
      this.$axios(
        `/apis/question/${this.pagination.pageNum}/${this.pagination.pageSize}`
      )
        .then(res => {
          this.pagination = res.data.data;
          console.log(res);
        })
        .catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getQuestionInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.getQuestionInfo();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.exam {
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
    background-color: #DD5862 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;

}

.el-table .success-row {
  background: #DD5862;
}

</style>
