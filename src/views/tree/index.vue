<template>
  <div class="app-container">
    <el-col :span="14">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="商品名" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.title" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="关键词" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.keyword" width="100" placeholder="关键词用空格隔开"/></el-col>
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
            <el-col :span="14">
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
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="状态" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.status" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类别" >
          <el-row>
            <el-col :span="14"><el-input v-model="form.cid" width="100"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品内容">
          <el-row>
            <editor :catch-data="catchData" :content="form.content"/>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { upload } from '@/api/goods'
import editor from '@/components/WangEditor/wangeditor'
export default {
  components: {
    editor
  },
  data() {
    return {
      filterText: '',
      formLabelWidth: '120px',
      form: {
        id: '',
        title: '',
        keyword: '',
        price: '',
        num: '',
        barcode: '',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgOTggMTUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8dGl0bGU+ZHVvaHVpLWVsZW1lbnQ8L3RpdGxlPgo8ZGVzYz5DcmVhdGVkIHVzaW5nIEZpZ21hPC9kZXNjPgo8ZyBpZD0iQ2FudmFzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIxNiAxNDApIj4KPGNsaXBQYXRoIGlkPSJjbGlwLTAiIGNsaXAtcnVsZT0iZXZlbm9kZCI+CjxwYXRoIGQ9Ik0gMjIxNiAtMTQwTCAyMzE0IC0xNDBMIDIzMTQgMTBMIDIyMTYgMTBMIDIyMTYgLTE0MFoiIGZpbGw9IiNGRkZGRkYiLz4KPC9jbGlwUGF0aD4KPGcgaWQ9ImR1b2h1aS1lbGVtZW50IiBjbGlwLXBhdGg9InVybCgjY2xpcC0wKSI+CjxwYXRoIGQ9Ik0gMjIxNiAtMTQwTCAyMzE0IC0xNDBMIDIzMTQgMTBMIDIyMTYgMTBMIDIyMTYgLTE0MFoiIGZpbGw9IiNGRkZGRkYiLz4KPGcgaWQ9IkR1b2h1aSBJY29uIDIiPgo8ZyBpZD0iVmVjdG9yIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNjYzNiAwIDAgMS4yMTkyOSAyMjMwIC03NS43MDM4KSIgZmlsbD0iIzNBODhGRCIvPgo8L2c+CjxnIGlkPSJWZWN0b3IiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoMV9maWxsIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjQxNTM0IDAgMCAxLjIxODM0IDIyMjYgLTExMikiIGZpbGw9IiMzNUFGRkIiLz4KPC9nPgo8L2c+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSAyNS43NzIyIDEuMDA2MzVDIDI2LjIgMC4zNzQ5ODMgMjYuODk0OSAtMi42NjEzZS0wNyAyNy42MzQ5IC0yLjY2MTNlLTA3QyAyOC4zNzU1IC0yLjY2MTNlLTA3IDI5LjA2OTkgMC4zNzQ5ODMgMjkuNDk4MyAxLjAwNjM1QyAzNC40MDkgOC4yNDk2NCA0Ny43OTggMjcuOTk2NCA1NC41OTg2IDM4LjAyNjJDIDU1LjM4NzggMzkuMTkwMSA1NS40ODk2IDQwLjcxNjIgNTQuODYyMyA0MS45ODNDIDU0LjIzNSA0My4yNDk4IDUyLjk4MzMgNDQuMDQ1MiA1MS42MTc4IDQ0LjA0NTJDIDM5LjY2OTQgNDQuMDQ1MiAxNS42MDEgNDQuMDQ1MiAzLjY1MjEgNDQuMDQ1MkMgMi4yODcxMiA0NC4wNDUyIDEuMDM1NDUgNDMuMjQ5OCAwLjQwODE3MyA0MS45ODNDIC0wLjIxOTEwNiA0MC43MTYyIC0wLjExNzM1MyAzOS4xOTAxIDAuNjcxODA0IDM4LjAyNjJDIDcuNDcyNDIgMjcuOTk2NCAyMC44NjA5IDguMjQ5NjQgMjUuNzcyMiAxLjAwNjM1WiIvPgo8cGF0aCBpZD0icGF0aDFfZmlsbCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNIDI0Ljk5MzkgMS40NDcwM0MgMjUuNjEzNyAwLjUzMzExNyAyNi41NTcyIC0zLjAxNjE0ZS0wNyAyNy41NTUxIC0zLjAxNjE0ZS0wN0MgMjguNTUzNSAtMy4wMTYxNGUtMDcgMjkuNDk3IDAuNTMzMTE3IDMwLjExNjggMS40NDcwM0MgMzUuNDY3NCA5LjMzODU0IDQ3Ljg3MjUgMjcuNjM0MiA1NC40MDQzIDM3LjI2ODFDIDU1LjE4MjUgMzguNDE1NyA1NS4zMjk5IDM5Ljk4MiA1NC43ODQ3IDQxLjI5OTlDIDU0LjIzODkgNDIuNjE4NSA1My4wOTYgNDMuNDU1NiA1MS44NDI2IDQzLjQ1NTZDIDM5LjkwMjMgNDMuNDU1NiAxNS4yMDg0IDQzLjQ1NTYgMy4yNjgxMSA0My40NTU2QyAyLjAxNDcxIDQzLjQ1NTYgMC44NzE3MzkgNDIuNjE4NSAwLjMyNTk3OCA0MS4yOTk5QyAtMC4yMTk3ODMgMzkuOTgyIC0wLjA3MTc4MTMgMzguNDE1NyAwLjcwNjM5IDM3LjI2ODFDIDcuMjM4MTggMjcuNjM0MiAxOS42NDMzIDkuMzM4NTQgMjQuOTkzOSAxLjQ0NzAzWiIvPgo8L2RlZnM+Cjwvc3ZnPgo=',
        status: '',
        cid: ''
      }
    }
  },
  watch: {
  },
  methods: {
    submitEdit() {
      console.log(this.form)
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
    catchData(value) {
      this.form.barcode = value
    }

  }
}
</script>

