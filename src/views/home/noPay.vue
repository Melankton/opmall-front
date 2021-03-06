<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="订单ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.orderId }}
        </template>
      </el-table-column>
      <el-table-column label="交易时间">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime).toDateString() }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          <span>￥:{{ scope.row.payment }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag @click="noPay(scope.row)">未支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="编辑" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">查看详情</el-button>
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
      title="订单详情"
      width="40%">
      <h3>商品列表</h3>
      <el-table
        :data="orderItemList"
        style="width: 100%">
        <el-table-column
          prop="goodstitle"
          label="商品名"
          width="180"/>
        <el-table-column
          prop="goodsprice"
          label="价格"
          width="180"/>
        <el-table-column
          prop="goodsnum"
          label="数量"/>
        <el-table-column
          prop="goodstotalprice"
          label="合计"/>
      </el-table>
      <h3>收货信息</h3>
      <h5>收货人:{{ address.name }}</h5>
      <h5>手机:{{ address.phone }}</h5>
      <h5>地址:{{ address.add }}</h5>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="订单详情"
      width="40%">
      <h3>商品列表</h3>
      <el-table
        :data="orderItemList"
        style="width: 100%">
        <el-table-column
          prop="goodstitle"
          label="商品名"
          width="180"/>
        <el-table-column
          prop="goodsprice"
          label="价格"
          width="180"/>
        <el-table-column
          prop="goodsnum"
          label="数量"/>
        <el-table-column
          prop="goodstotalprice"
          label="合计"/>
      </el-table>
      <h3>收货信息</h3>
      <h5>收货人:{{ address.name }}</h5>
      <h5>手机:{{ address.phone }}</h5>
      <h5>地址:{{ address.add }}</h5>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-dialog :visible.sync="outerVisible" title="是否立即支付">
        <el-dialog
          :visible.sync="innerVisible"
          width="30%"
          title="是否支付成功？"
          append-to-body>
          <el-button @click="outerVisible = false;innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="paySuccess()">已支付</el-button>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="payNow()">立即支付</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserOrder, getOrderItem, getOrderAdd, queryOrder, createPayUrl } from '@/api/goods'
export default {
  name: 'NoPay',
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      address: {
        name: '',
        phone: '',
        add: ''
      },
      payUrl: '',
      payRow: null,
      dialogVisible: false,
      currentPage4: 1,
      curNum: 10,
      curPage: 1,
      orderItemList: null,
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const status = '1'
      getUserOrder(this.$store.getters.id, this.curPage, this.curNum, status).then(response => {
        this.listLoading = false
        this.list = response.data
      })
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
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.curPage = val
      this.fetchData()
    },
    paySuccess() {
      queryOrder(this.payRow.orderId).then(response => {
        console.log(response)
        if (response.status === '200') {
          this.$router.push({ path: this.redirect || '/login' })
        } else {
          alert('支付失败！')
        }
      })
    },
    noPay(row) {
      this.outerVisible = true
      createPayUrl(row.payment, row.orderId).then(response => {
        this.payUrl = response.status
      })
      this.payRow = row
    },
    payNow() {
      this.innerVisible = true
      this.$store.dispatch('addUrl', this.payUrl)
      window.open('/#/payPage', '_blank')
    },
    handleEdit(row) {
      this.dialogVisible = true
      getOrderItem(row.orderId).then(response => {
        this.orderItemList = response.data
      })
      getOrderAdd(row.buyerNick).then(response => {
        const addData = response.data[0]
        this.address.name = addData.name
        this.address.phone = addData.phone
        this.address.add = addData.province + addData.city + addData.area + addData.address
        console.log(addData)
      })
      console.log(row)
    }
  }
}
</script>

<style scoped>
html {
  background-color: #f1f1f1;
}
</style>
