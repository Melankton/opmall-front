<template>
  <div style="margin-left: 20px">
    <br>
    <el-select v-model="commentStatus" placeholder="请选择评论类别" style="margin-bottom: 20px" @change="fetchData">
      <el-option
        v-for="item in commentStatusDict"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div>
      <el-table
        v-loading="listLoading"
        :data="commentList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="评论ID" width="150">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="评论时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.created).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column label="商品id">
          <template slot-scope="scope">
            {{ scope.row.goodsId }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="评价状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">未审核</el-tag>
            <el-tag v-if="scope.row.status === 2">已审核</el-tag>
            <el-tag v-if="scope.row.status === 3">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="编辑" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">审核评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100, 400]"
          :page-size="20"
          layout="sizes, prev, pager, next, jumper"
          style="margin-top: 20px;margin-bottom: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        title="评价详情"
        width="40%">
        {{ dialogForm.comment }}
        <div>
          <h5>审核评论</h5>
          <el-select v-model="dialogForm.status" placeholder="请选择评论类别" style="margin-bottom: 20px">
            <el-option
              v-for="item in commentStatusDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitComment">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCommentList, changeCommentStatus } from '@/api/goods'
export default {
  name: 'Comment',
  data() {
    return {
      dialogForm: {
        comment: '',
        status: '',
        commentId: ''
      },
      dialogVisible: false,
      commentStatus: '1',
      currentPage4: 1,
      curNum: 10,
      curPage: 1,
      listLoading: true,
      commentList: null,
      commentForm: {
        commentStatus: '1',
        page: 1,
        rows: 20
      },
      commentStatusDict: [
        {
          value: '1',
          label: '未审核'
        },
        {
          value: '2',
          label: '已审核'
        },
        {
          value: '3',
          label: '已禁用'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submitComment() {
      changeCommentStatus(this.dialogForm).then(response => {
        if (response.status === '200') {
          this.success('评论审核成功！')
          this.fetchData()
        }
      })
      this.dialogVisible = false
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.dialogForm.commentId = row.id
      this.dialogForm.status = row.status
      this.dialogForm.comment = row.comment
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSizeChange(val) {
      this.curNum = val
      this.commentForm.rows = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.curPage = val
      this.commentForm.page = val
      this.fetchData()
    },
    fetchData() {
      this.commentForm.commentStatus = this.commentStatus
      console.log(this.commentForm)
      getCommentList(this.commentForm).then(response => {
        if (response.status === '200') {
          this.listLoading = false
          this.commentList = response.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
