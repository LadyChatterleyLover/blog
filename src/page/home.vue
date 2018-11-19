<template>
  <div>
    <el-table
      :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="category"
        label="类目"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.category === 'Vue'">{{scope.row.category}}</el-tag>
          <el-tag type="info" v-if="scope.row.category === 'React'">{{scope.row.category}}</el-tag>
          <el-tag type="warning" v-if="scope.row.category === 'JavaScript'">{{scope.row.category}}</el-tag>
          <el-tag type="danger" v-if="scope.row.category === '工具类'">{{scope.row.category}}</el-tag>
          <el-tag v-if="scope.row.category === '小程序'">{{scope.row.category}}</el-tag>
          <el-tag v-if="scope.row.category === '其他'">{{scope.row.category}}</el-tag>
          <el-tag type="info" v-if="scope.row.category === '性能优化'">{{scope.row.category}}</el-tag>
          <el-tag type="warning" v-if="scope.row.category === 'Node.js'">{{scope.row.category}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="stat"
        label="重要性"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.star * 1"
            disabled
            text-color="#ff9900"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="发布时间"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div style="display: flex;padding-right: -10px;justify-content: center">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.row,scope.$index)">删除
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="checkRow(scope.$index, scope.row)">查看
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        currentPage: 1,
        tableData: [],
        pageSize: 10
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$com.req('/api/article/article', {
          _id: row._id
        }).then((response => {
          let res = response.data.data
          if (res) {
            this.$store.state.article = res
            this.$router.push({name: 'detail', params: {id: row._id}})
          }
        }))
      },
      checkRow(index, row) {
        this.$com.req('/api/article/article', {
          _id: row._id
        }).then((response => {
          let res = response.data.data
          if (res) {
            this.$store.state.article = res
            this.$router.push('/check')
          }
        }))
      },
      deleteRow(row) {
        this.$com.req('/api/article/delete', {
          _id: row._id
        }).then(res => {
          if (res) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getArticle()
          }
        })
      },
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      getArticle() {
        this.$com.req('/api/article/allArticle').then(response => {
          let res = response.data.data
          this.tableData = res
        })
      },
    },
    mounted() {
      this.getArticle()
    }
  }
</script>

<style scoped lang="scss">

</style>
