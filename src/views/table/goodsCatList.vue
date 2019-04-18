<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="父类别ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="父类别名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.text }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="编辑" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-dialog :visible.sync="dialogFormVisible" title="类别信息修改">
        <el-table
          v-loading="listLoading"
          :data="listChild"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column label="子类别ID">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="子类别名称" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.text }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleChildEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleChildDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisibleChildDelete"
        :before-close="handleClose"
        title="提示"
        width="30%">
        <span>是否该子类别?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDelete = false">取 消</el-button>
          <el-button type="primary" @click="submitDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="block">
      <el-dialog :visible.sync="dialogFormVisibleChildEdit" title="子类别信息修改">
        <el-form :model="childData">
          <el-form-item :label-width="formLabelWidth" label="子类别名" >
            <el-row>
              <el-col :span="14"><el-input v-model="childData.text" width="100"/></el-col>
            </el-row>
            <br>
            <el-row>
              <el-button type="primary" @click="submitEdit">确 定</el-button>
            </el-row>
          </el-form-item>
    </el-form></el-dialog></div>
</div></template>

<script>
import { getNavList } from '@/api/index'
import { deleteCat, modifyCat } from '@/api/goods'

export default {
  name: 'GoodsCatList',
  data() {
    return {
      listLoading: true,
      dialogVisibleChildDelete: false,
      list: [],
      listChild: {},
      childData: {},
      formLabelWidth: '100px',
      dialogFormVisible: false,
      dialogVisibleDelete: false,
      dialogFormVisibleChildEdit: false,
      goodsCatList: {
        'id': '',
        'text': '',
        'status': '',
        'parentStatus': '',
        'parentId': '',
        'parentText': ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getNavList().then(response => {
        const data = response
        this.list = data
        this.listLoading = false
      })
    },
    submitEdit() {
      modifyCat(this.childData).then(response => {
        const data = response
        if (data.status === '200') {
          this.success('修改子类别信息成功')
          this.fetchData()
          this.dialogFormVisibleChildEdit = false
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
    handleEdit(row) {
      this.listChild = row.child
      console.log(this.listChild)
      this.dialogFormVisible = true
      console.log(row)
    },
    submitDelete() {
      console.log('delete')
    },
    handleChildEdit(row) {
      this.dialogFormVisibleChildEdit = true
      this.childData = row
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    handleChildDelete(row) {
      console.log(row)
      deleteCat(row).then(response => {
        const data = response
        if (data.status === '200') {
          this.success('删除子类别信息成功')
          this.fetchData()
          this.dialogVisibleChildDelete = false
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
