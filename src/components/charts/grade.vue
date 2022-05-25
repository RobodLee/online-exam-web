<!-- 学生成绩展示界面 -->
<!-- 首先通过 allStudentGrade 组件传过来的studentId对学生成绩进行查询，并将成绩信息存入到tableDataX和tableDataY两个数组中-->
<template>
  <div id="grade">
    <div ref="box" class="box"></div>
    <div class="notFound" v-if="isNull">
      <i class="iconfont icon-LC_icon_tips_fill"></i><span>该考生未参加考试</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "grade",
  data() {
    return {
      isNull: false, //原始数据
      tableDataX: [], //x轴数据 保存次数
      tableDataY: [], //y轴数据 保存分数
    }
  },
  mounted() {
    this.score();
  },
  methods: {
    score() {
      let studentId = this.$route.query.studentId //从allStudentsGrade传入的学生id
      this.$axios(`/apis/score/${studentId}`).then(res => { //根据学生Id查询成绩
        // 如果后端返回了数据就将数据在页面进行展示，否则显示未参加考试字样
        if(res.data.code === 200) {
          let rootData = res.data.data
          // 遍历后端传过来的数据，将次数和分数分别放入两个数组中
          rootData.forEach((element,index) => {
            this.tableDataX.push(`第${index + 1}次`)
            this.tableDataY.push(element.etScore)
          });
          let boxDom = this.$refs["box"]; // 获取的是添加了ref="box"标签对应的dom元素
          let scoreCharts = this.$echarts.init(boxDom);
          let option = {
            xAxis: {
              type: "category",
              data: this.tableDataX
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: this.tableDataY,
                type: "line",
                itemStyle: { normal: { label: { show: true } } }
              }
            ]
          };
          scoreCharts.setOption(option);
          scoreCharts.on("mouseover", params => {
            console.log(params.value);
          });
        }else {
          this.isNull = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#grade {
  position: relative;
  .box{
    width: 600px;
    height: 400px;
  }
  .notFound {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>
