<template>
  <div class="app">
    <div class="back">
      <vue-particles
        :particle-opacity="0.7"
        :particles-number="80"
        :particle-size="4"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        :click-effect="true"
        color="#666"
        shape-type="circle"
        lines-color="#666"
        hover-mode="grab"
        click-mode="push"
      />
    </div>
    <div class="login">
      <el-card class="box-card">
        <div id="login">
          <h2 class="text-center">登录</h2>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-position="top"
            label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="email">
              <el-input v-model="loginForm.email"/>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="loginForm.pass" type="password" auto-complete="off"/>
            </el-form-item>
            <el-form-item>
              <div id="button">
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <router-link to="/register">
                  <el-button type="primary">注册</el-button>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>

</template>
<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      userinfo: [],
      token: '',
      loginForm: {
        email: '',
        pass: ''
      },
      loginRules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style>
  .back {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  h2 {
    color: #48576a;
  }

  .login {
    opacity: 0.8;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #48576a;
    position: relative;
    /*margin-top: 250px;*/
    margin-right: auto;
    margin-left: auto;
    top: 250px;
    width: 350px;
    height: 45%;
  }

  #login {
    margin: 10% auto;
    width: 300px;
  }

  .el-form-item__label {
    font-weight: 500;
    /*padding: 20px 12px 20px 0 !important;*/
  }

  .el-input {
    margin-top: 0 !important;
  }

  #button button {
    margin-left: 55px;
  }

  #button a {
    color: #fff !important;
  }
</style>
