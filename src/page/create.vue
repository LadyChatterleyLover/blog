<template>
  <div class="create">
    <div class="top">
      <div class="btn">
        <el-button type="danger" size="small" @click="$router.push('/home')">查看</el-button>
        <el-button type="primary" size="small" @click="create">发布</el-button>
      </div>
    </div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>

        <div class="select">
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>

          <el-form-item label="类目" prop="category">
            <el-select v-model="value1" placeholder="请选择" @change="changSelect1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="来源" prop="source">
            <el-select v-model="value2" placeholder="请选择" @change="changSelect2">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重要性" prop="star">
            <el-select v-model="value3" placeholder="请选择" @change="changSelect3">
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
              v-model="dateValue"
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

    <div class="mark">
      <mavon-editor v-model="text" @imgAdd="imgAdd" ref="md" placeholder="请开始你的表演"/>
    </div>
    <div class="f-btn">
      <el-button type="primary" @click="create">发布</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create',
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
        rules: {
          title: [
            {required: true, message: '请输入文章标题', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          abstract: [
            {required: true, message: '请输入文章摘要', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'},
          ],
          category: [
            {required: true, message: '请选择类目', trigger: 'blur'},
          ],
          source: [
            {required: true, message: '请选择来源', trigger: 'blur'},
          ],
          star: [
            {required: true, message: '请选择重要性', trigger: 'blur'},
          ],
          date: [
            // {required: true, message: '请选择发布时间', trigger: 'blur'},
          ]
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
        allArticle: []
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
        this.$axios.post('/api/article/upload',formData,config).then((response) =>{
          console.log(response)
          if (response.status=== 200) {
            this.$refs.md.$img2Url(filename,response.data);//更改图片内文章上传地址
          }
        })
      },
      create () {
        this.$com.req('/api/article/create', {
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,
          category: this.value1,
          source: this.value2,
          star: this.value3,
          text: this.text,
          date: this.dateValue
        }).then((response => {
          let res = response.data
          if (res) {
            this.$message({
              type: 'success',
              message: '发布成功'
            })
            this.$router.push('/')
          }

        })).catch(err => {
          console.log(err)
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
      }
    },

  }
</script>

<style scoped lang="scss">
  .create {
    .top {
      width: 100%;
      height: 40px;
      background: #59a586;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        padding-right: 30px;
      }
    }
    .content {
      margin-top: 30px;
      .select {
        display: flex;
      }
    }
    .f-btn {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
</style>
