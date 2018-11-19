<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">Code Angle</span>
        <el-form :model="loginUser" label-width="60px" class="loginForm">
          <el-form-item label="邮箱" prop="username">
            <el-input type="text" v-model="loginUser.username" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="goTo" type="primary" class="submit_btn">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <div class="item1">
              温馨提示:
            </div>
            <div class="item2">
              未登录过的新用户，自动注册
            </div>
            <div class="item2">
              注册过的用户可凭账号密码登录
            </div>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginUser: {
          username: '',
          password: '',
          date: Date.now()
        }
      }
    },
    methods: {
      goTo() {
        localStorage.user = JSON.stringify(this.loginUser)
        this.$com.req('/api/users/register', {
          username: this.loginUser.username,
          password: this.loginUser.password
        }).then((response) => {
          let res = response.data
          if (res) {
            this.$router.push('/')
            this.$message({
              type: 'success',
              message: '欢迎光临'
            })
          }
        })
      },

    }
  }
</script>

<style scoped>
  .register {
    position: relative;
    width: 100%;
    min-height: 1000px;
    background: url(/static/image/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
  }

  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
  }

  .form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }

  .loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #ccc;
  }

  .submit_btn {
    width: 100%;
  }

  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
  }

  .tiparea {
    color: #409eff;
    width: 100%;
  }

  .item1 {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }

  .item2 {
    width: 100%;
    text-align: center;
    margin-top: 4px;
  }
</style>
