<template>
  <div class="headerNav">
    <div class="top">
      <div class="title">{{user.username}}的代码世界</div>
      <div class="content">
        <div class="date" v-if="date >= 6 && date <=11">早上好,</div>
        <div class="date" v-if="date > 11 && date <=13">中午好,</div>
        <div class="date" v-if="date > 13 && date <=18">下午好,</div>
        <div class="date" v-if="date> 18 && date <=23">晚上好,</div>
        <div class="date" v-if="date > 23 || date <6">已经很晚了,该休息了喔,</div>
        <div class="user">亲爱的 {{user.username}}</div>
        <div class="loginTime">上次登录时间:
          {{year}}年{{month}}月{{day}}日{{hours}}时{{min}}分{{seconds}}秒</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headerNav',
    data() {
      return {
        user: JSON.parse(localStorage.user) || {},
        year: '',
        month: '',
        day: '',
        hours: '',
        min: '',
        seconds: '',
        date: ''
      }
    },
    methods: {},
    mounted () {
      if (this.user) {
        this.year = this.$moment(this.user.date).format('YYYY')
        this.month = this.$moment(this.user.date).format('MM')
        this.day = this.$moment(this.user.date).format('DD')
        this.hours = parseInt(this.$moment(this.user.date).format('HH'))
        this.min = this.$moment(this.user.date).format('MM')
        this.seconds = this.$moment(this.user.date).format('SS')
        this.seconds = this.seconds < 60 ? this.seconds : this.seconds - 60
      }
      let date = new Date().getTime()
      this.date = parseInt(this.$moment(date).format('HH'))
    }
  }
</script>

<style scoped lang="scss">
  .headerNav {
    background: #2e5e85;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 99;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        padding-left: 30px;
        font-size: 18px;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 30px;
        font-size: 16px;
        div {
          &:last-child {
            padding: 0 10px;
          }
          &:first-child {
            padding-right: 5px;
          }
        }
      }
    }
  }
</style>
