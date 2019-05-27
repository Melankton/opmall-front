<template>
  <div style="margin-left: 20px">
    <h1>个人信息</h1>
    <el-form ref="form" :model="userInfo" label-width="80px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="用户名" >
            <el-input :value="userInfo.username" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="邮箱" >
            <el-input v-model="userInfo.email"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="电话" >
            <el-input v-model="userInfo.phone"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="加入时间" >
            <el-input :value="new Date(userInfo.created).toLocaleDateString()"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="密码" >
            <el-input v-model="userInfo.password" type="password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button style="margin-left: 80px" @click="update()">更新用户信息</el-button>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, modifyUser } from '@/api/user'
export default {
  name: 'Person',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    getUserInfo(this.$store.getters.id).then(response => {
      this.userInfo = response.data[0]
      this.userInfo.password = ''
      console.log(this.userInfo)
    })
  },
  methods: {
    update() {
      modifyUser(this.userInfo).then(response => {
        if (response.status === '200') {
          this.success('更新信息成功')
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

<style scoped>

</style>
