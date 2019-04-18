<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth" label="用户名" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
          <el-input v-model="form.username" /></el-row>
        </el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="密码" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
          <el-input v-model="form.password" type="password"/></el-row>
        </el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="邮箱" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
          <el-input v-model="form.email"/></el-row>
        </el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="电话" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
          <el-input v-model="form.phone"/></el-row>
        </el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="用户类别" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
            <el-select v-model="form.isadmin" placeholder="请选择用户类型">
              <el-option label="管理员" value="1"/>
              <el-option label="普通用户" value="0"/>
            </el-select>
        </el-row></el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="" >
        <el-col :xs="12" :sm="10" :md="10" :lg="6" :xl="6">
          <el-row>
            <el-button type="primary" @click="submitUserForm">添加用户</el-button>
        </el-row></el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
export default {

  data() {
    return {
      filterText: '',
      formLabelWidth: '100px',
      form: {
        username: '',
        phone: '',
        email: '',
        password: '',
        isadmin: ''
      }
    }
  },
  watch: {},

  methods: {
    submitUserForm() {
      addUser(this.form).then(response => {
        const data = response
        if (data.status === '200') {
          this.success('添加用户成功')
          this.form.username = ''
          this.form.password = ''
          this.form.email = ''
          this.form.phone = ''
          this.form.isadmin = ''
        }
      })
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    }
  }
}
</script>

