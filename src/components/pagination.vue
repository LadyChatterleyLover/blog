<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pagesize"
    layout="total, prev, pager, next"
    :total="tableData.length">
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      currentPage: 1,
      pagesize: 10
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
      this.$emit('getPagesize', this.pagesize)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.$emit('getCurrentPage', this.currentPage)
    }
  }
}
</script>

<style>
  .el-pagination__jump {
    padding-top: 12px;
  }
  .el-pagination__total {
    padding-top: 14px;
  }
  .el-pagination__sizes {
    padding-top: 8px;
  }
  .el-pagination{
    z-index: 9999;
  }
</style>
