<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="用户ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="手机" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="用户类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isadmin === '1'">管理员</span>
          <span v-else>普通用户</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="编辑" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100, 400]"
        :page-size="20"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="用户信息修改">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="用户名" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.username" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="Email" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.email" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="Phone" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.phone" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-row>
          <el-form-item :label-width="formLabelWidth" label="用户类型">
            <el-col :span="14">
              <el-select v-model="form.isadmin" placeholder="请选择用户类型">
                <el-option label="管理员" value="1"/>
                <el-option label="普通用户" value="0"/>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleDelete"
      :before-close="handleClose"
      title="提示"
      width="30%">
      <span>是否删除用户?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, modifyUser, deleteUser } from '@/api/user'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      curPage: 1,
      curNum: 10,
      total: 2,
      dialogFormVisible: false,
      dialogVisibleDelete: false,
      form: {
        id: '',
        username: '',
        isadmin: '',
        phone: '',
        email: ''
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submitDelete() {
      deleteUser(this.form).then(response => {
        const data = response
        if (data.status === '200') {
          this.success('用户删除成功')
          this.dialogVisibleDelete = false
          this.fetchData()
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitUserForm() {
      modifyUser(this.form).then(response => {
        const data = response
        if (data.status === '200') {
          this.success('用户信息修改成功')
          this.dialogFormVisible = false
          this.fetchData()
        }
      })
    },
    handleDelete(row) {
      this.dialogVisibleDelete = true
      this.form.id = row.id
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.form.username = row.username
      this.form.email = row.email
      this.form.phone = row.phone
      this.form.isadmin = row.isadmin
      this.form.id = row.id
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    fetchData() {
      this.listLoading = true
      getUserList(this.curPage, this.curNum).then(response => {
        const data = response
        this.total = parseInt(data.status)
        this.list = data.data
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.curNum = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.curPage = val
      this.fetchData()
    }
  }
}
</script>
<style>
  .block {
    margin-left: 20%;
    margin-top: 40px;
  }
</style>
