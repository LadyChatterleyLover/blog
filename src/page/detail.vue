<template>
  <div>
    <div class="detail">
      <div class="btn">
        <el-button type="danger" size="small" @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="edit1">
        <el-button type="primary" size="small" @click="edit">发布</el-button>
      </div>
    </div>
    <div class="content">
      <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="article.abstract"></el-input>
        </el-form-item>

        <div class="select">
          <el-form-item label="作者" prop="author">
            <el-input v-model="article.author"></el-input>
          </el-form-item>

          <el-form-item label="类目" prop="category">
            <el-select v-model="article.category" placeholder="请选择" @change="changSelect1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="来源" prop="source">
            <el-select v-model="article.source" placeholder="请选择" @change="changSelect2">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重要性" prop="star">
            <el-select v-model="article.star" placeholder="请选择" @change="changSelect3">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间" prop="date">
            <el-date-picker
              v-model="article.date"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :clearable="false" :editable="false"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <mavon-editor v-model="article.text" @imgAdd="imgAdd"  placeholder="请开始你的表演" style="z-index: 1"/>
    <div class="edit">
      <el-button type="primary" size="small" @click="edit">发布</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        dateValue: '',
        text: '',
        ruleForm: {
          title: '',
          abstract: '',
          author: ''
        },
        options1: [
          {
            value: 'Vue',
            label: 'Vue'
          },
          {
            value: 'React',
            label: 'React'
          },
          {
            value: 'Node.js',
            label: 'Node.js'
          },
          {
            value: '性能优化',
            label: '性能优化'
          },
          {
            value: 'JavaScript',
            label: 'JavaScript'
          },
          {
            value: '小程序',
            label: '小程序'
          },
          {
            value: '工具类',
            label: '工具类'
          },
          {
            value: '其他',
            label: '其他'
          },
        ],
        options2: [
          {
            value: '原创',
            label: '原创'
          },
          {
            value: '转载',
            label: '转载'
          },
          {
            value: '与他人合作',
            label: '与他人合作'
          }
        ],
        options3: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          },
          {
            value: '3',
            label: '3'
          },
          {
            value: '4',
            label: '4'
          },
          {
            value: '5',
            label: '5'
          }
        ],
        value1: '',
        value2: '',
        value3: '',
        allArticle: [],
        id: ''
      }
    },
    methods: {
      imgAdd(filename,file){
        //上传图片
        var formData = new FormData();
        formData.append('file', file,file.name)
        let config = {
          headers:{'Content-Type':'multipart/form-data'},
          emulateJSON:true
        };
        this.$axios.post('https://wd6868516337cqvkim.wilddogio.com/',formData,config).then((response) =>{
          if (response.status === 200) {
            this.$refs.md.$img2Url(filename,response.body.data);//更改图片内文章上传地址
          }
        })
      },
      changSelect1 (row) {
        this.value1 = row
      },
      changSelect2 (row) {
        this.value2 = row
      },
      changSelect3 (row) {
        this.value3 = row
      },
      edit () {
        this.$axios.post('/api/article/update', {
          id: this.id,
          title: this.article.title,
          abstract: this.article.abstract,
          author: this.article.author,
          category: this.article.category,
          source: this.article.source,
          star: this.article.star,
          text: this.article.text,
          date: this.article.date
        }).then(response => {
          let res = response.data
          console.log(res)
          if (res) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      let year = this.$moment(this.article.date).format('YYYY')
      let month = this.$moment(this.article.date).format('MM')
      let day = this.$moment(this.article.date).format('DD')
      let hours = this.$moment(this.article.date).format('HH')
      let min = this.$moment(this.article.date).format('MM')
      this.article.date = `${year}年${month}月${day}日${hours}时${min}分`
      this.id = this.$route.params.id
    },
    computed: {
      article () {
        return this.$store.state.article
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
    .btn {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .edit1 {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
  }
  .content {
    margin-top: 30px;
    .select {
      display: flex;
    }
  }
  .edit {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
</style>
