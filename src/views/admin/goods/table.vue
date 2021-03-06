<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="商品ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="商品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="编辑" width="200">
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
    <el-dialog :visible.sync="dialogFormVisible" title="商品信息修改">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="商品名" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.title" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="关键词" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.keyword" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="价格" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.price" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="数量" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.num" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="图片" >
          <el-row>
            <el-col :span="14"><img :src="form.image" height="200px" width="200px"></el-col>
            <el-upload
              :http-request="picUpload"
              class="upload-demo"
              drag
              action="/image"
              multiple>
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="状态" >
          <el-row>
            <el-col :span="14">
              <el-select v-model="form.status" placeholder="请选择商品状态">
                <el-option label="在售" value="1"/>
                <el-option label="禁用" value="0"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类别" >
          <el-row>
            <el-cascader
              :options="goodsCatlist"
              v-model="form.cid"/>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品内容">
          <el-row>
            <editor :catch-data="catchData" :content="form.barcode"/>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, upload, modifyGoods, deleteGoods } from '@/api/goods'
import { getNavList } from '@/api/index'
import editor from '@/components/WangEditor/wangeditor'
export default {
  components: {
    editor
  },
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
      goodsCatlist: {},
      list: null,
      listLoading: true,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      curPage: 1,
      curNum: 10,
      total: 2,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogVisibleDelete: false,
      form: {
        id: '',
        title: '',
        keyword: '',
        price: '',
        num: '',
        content: '',
        barcode: '',
        image: '',
        status: '',
        cid: [],
        parcid: '',
        childcid: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGoodsList(this.curPage, this.curNum).then(response => {
        const data = response
        this.total = parseInt(data.status)
        this.list = data.data
        this.listLoading = false
      })
      getNavList().then(response => {
        this.goodsCatlist = response
        const goodsCats = []
        for (let i = 0; i < this.goodsCatlist.length; i++) {
          const goodsCat = {
            'value': this.goodsCatlist[i].id,
            'label': this.goodsCatlist[i].text,
            'children': []
          }
          for (let j = 0; j < this.goodsCatlist[i].child.length; j++) {
            const item = {
              'value': this.goodsCatlist[i].child[j].id,
              'label': this.goodsCatlist[i].child[j].text
            }
            goodsCat['children'].push(item)
          }
          goodsCats.push(goodsCat)
        }
        this.goodsCatlist = goodsCats
      })
    },
    catchData(value) {
      this.form.barcode = value
    },
    picUpload(file) {
      const param = new FormData()
      param.append('smfile', file.file)
      param.append('file_id', '0')
      upload(param).then(response => {
        const data = response.data
        this.form.image = data.url
      })
    },
    handleDelete(row) {
      this.dialogVisibleDelete = true
      this.form.id = row.id
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(this.form)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitUserForm() {
      this.form.parcid = this.form.cid[0]
      this.form.childcid = this.form.cid[1]
      this.dialogFormVisible = false
      modifyGoods(this.form).then(response => {
        if (response.status === '200') {
          this.success('商品信息更新成功')
        }
      })
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.title = row.title
      this.form.keyword = row.keyword
      this.form.price = row.price
      this.form.num = row.num
      this.form.barcode = row.barcode
      this.form.image = row.image
      this.form.status = row.status
      this.form.cid = []
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
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
