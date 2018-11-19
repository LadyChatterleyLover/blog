<template>
  <div>
    <div class="detail">
      <div class="btn">
        <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="title">
        {{article.title}}
      </div>
      <div class="abstract">
        摘要:{{article.abstract}}
      </div>
      <div class="date">
        发表于: {{article.date}}
      </div>
    </div>
    <mavon-editor :boxShadow="false"
                  placeholder="请开始你的表演"
                  :toolbarsFlag="false"
                  v-model="value"
                  :subfield="false"
                  :defaultOpen="defaultData"
                  style="z-index: 1"
    >
    </mavon-editor>
  </div>
</template>

<script>
  export default {
    name: 'check',
    data() {
      return {
        defaultData: "preview",
        value: ''
      }
    },
    methods: {},
    mounted() {
      let year = this.$moment(this.article.date).format('YYYY')
      let month = this.$moment(this.article.date).format('MM')
      let day = this.$moment(this.article.date).format('DD')
      let hours = this.$moment(this.article.date).format('HH')
      let min = this.$moment(this.article.date).format('MM')
      this.article.date = `${year}年${month}月${day}日${hours}时${min}分`
      this.value = this.article.text
    },
    computed: {
      article() {
        return this.$store.state.article
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .btn {
      position: absolute;
      top: 0;
      left: 0;
    }
    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: 700;
      margin: 20px 0;
    }
    .abstract {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      margin: 20px 0;
    }
    .date {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      margin-bottom: 20px;
      color: #ccc;
    }
  }
</style>
