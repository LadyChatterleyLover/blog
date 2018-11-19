<template>
  <div class="visitor">
    <el-table
      :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册时间"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="登录时间"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="article"
        label="原创文章"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        align="center"
        >
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'visitor',
    data() {
      return {
        currentPage: 1,
        tableData: [],
        pageSize: 10,
        articles: []
      }
    },
    methods: {
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      getData() {
        this.$com.req('/api/users/visitor').then((response => {
          let res = response.data.data
          let hash = {}
          this.tableData = res.reduceRight((item, next) => {
            hash[next.username] ? '' : hash[next.username] = true && item.push(next)
            return item
          }, [])
          this.tableData.forEach((item => {
            let year = this.$moment(item.date).format('YYYY')
            let month = this.$moment(item.date).format('MM')
            let day = this.$moment(item.date).format('DD')
            let hours = this.$moment(item.date).format('HH')
            let min = this.$moment(item.date).format('MM')
            let seconds = this.$moment(item.date).format('SS')
            seconds = seconds < 60 ? seconds : seconds - 60
            item.date = `${year}年${month}月${day}日${hours}时${min}分${seconds}秒`
          }))
        }))
      },
      getArticle() {
        this.$com.req('/api/article/allArticle').then(response => {
          let res = response.data.data
          this.articles = res
          this.tableData.map(item => {
            let arr = res.filter(item1 => {
              return item.username === item1.author
            })
            this.$set(item, 'article', arr.length)
          })
        })
      }
    },
    created() {
      this.getData()
      this.getArticle()
    }
  }
</script>

<style scoped lang="scss">

</style>
