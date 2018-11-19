<template>
  <div class="statistics">
    <div class="top">
      <div class="item1 t-item">
        <div class="t-desc">
          <div>今日发布 </div>
          <div>{{newCreate}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-check"></i>
        </div>
      </div>
      <div class="item2 t-item">
        <div class="t-desc">
          <div>原创文章</div>
          <div>{{original}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-tickets"></i>
        </div>
      </div>
      <div class="item3 t-item">
        <div class="t-desc">
          <div>新留言</div>
          <div>{{newComment}}</div>
        </div>
        <div class="icon">
          <i class="el-icon-bell"></i>
        </div>
      </div>
      <div class="item4 t-item">
        <div class="t-desc">
          <div>新消息</div>
          <div>{{newMessage}}</div>
        </div>
        <div class="icon"><i class="el-icon-phone-outline"></i></div>
      </div>
    </div>
    <div class="content1">
      <ve-pie :data="chartData1"></ve-pie>
      <ve-ring :data="chartData2" :settings="chartSettings1"></ve-ring>
    </div>
    <div class="content1">
      <ve-waterfall :data="chartData3"></ve-waterfall>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'statistics',
    data() {
      return {
        chartSettings1: {
          roseType: 'radius'
        },
        chartData1: {
          columns: ['类目', '数量'],
          rows: []
        },
        chartData2: {
          columns: [ '来源', '数量'],
          rows: []
        },
        chartData3: {
          columns: [ '日期', '数量'],
          rows: []
        },
        newCreate: 0,
        original: 0, // 原创文章
        newComment: 0,
        newMessage: 0
      }
    },
    methods: {
      getArticle() {
        this.$com.req('/api/article/allArticle').then(response => {
          let res = response.data.data
          let chartData1 = []
          let chartData2 = []
          let chartData3 = []
         let categoryArr = this.$loadsh.groupBy(res, (item) => {
           return item.category
         })
          for(let prop in categoryArr) {
            chartData1.push({
              '类目': prop,
              '数量': categoryArr[prop].length
            })
          }
          let sourceArr = this.$loadsh.groupBy(res, (item) => {
            return item.source
          })
          for(let prop in sourceArr) {
            chartData2.push({
              '数量': sourceArr[prop].length,
              '来源': prop
            })
          }
          let dateArr = this.$loadsh.groupBy(res, (item) => {
            return item.date.substring(0, 11)
          })
          for(let prop in dateArr) {
            chartData3.push({
              '数量': dateArr[prop].length,
              '日期': prop
            })
          }
          chartData2.forEach(item => {
            if (item['来源'] === '原创') {
              this.original = item['数量']
            }
          })
          chartData3.forEach(item => {
            let date = this.$moment(item.date).format('YYYY-MM-DD')
            let now = this.$moment(new Date().getTime()).format('YYYY-MM-DD')
            if (date === now) {
              this.newCreate = item['数量']
            }
          })
          this.chartData1.rows = chartData1
          this.chartData2.rows = chartData2
          this.chartData3.rows = chartData3

        })
      },
    },
    mounted() {
      this.getArticle()
    }
  }
</script>

<style scoped lang="scss">
  .statistics {
    .top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
      }
      .t-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        color: #fff;
        position: relative;
        .t-desc {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          div {
            margin: 3px 0;
          }
        }
        .icon {
          position: absolute;
          top: 30%;
          right: 10%;
        }
      }
      .item1 {
        background: #7ccabf;
      }
      .item2 {
        background: #e88a87;
      }
      .item3 {
        background: #8375a3;
      }
      .item4 {
        background: #9fcec1;
      }
    }
    .content1 {
      display: flex;
      margin: 30px 0;
      div {
        flex: 1;
      }
    }
  }
</style>
