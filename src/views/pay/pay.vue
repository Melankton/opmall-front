<template>
  <div>
    <Header/>
    <el-row :gutter="0" style="margin-top: 100px">
      <el-col :sm="6" :md="2" :lg="6" :xl="6"><div class="grid-content bg-purple"/></el-col>
      <el-col :sm="24" :md="20" :lg="12" :xl="12">
        <h1>支付订单</h1>
        <div v-html="htmlvalue">Alipay</div>
        <div v-html="htmlvalue"/>
        <el-table
          ref="singleTable"
          :data="cart"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            label="编号"/>
          <el-table-column
            property="title"
            label="商品名"/>
          <el-table-column
            property="num"
            label="数量"/>
          <el-table-column
            property="price"
            label="单价"/>
        </el-table>
        <h3>总价: {{ total_count }}</h3>
        <el-collapse>
          <el-collapse-item title="历史地址" name="2">
            <el-radio-group v-model="addId" :change="bandAdd(addId)">
              <el-radio label=" ">新建地址</el-radio>
              <el-divider/>
              <div v-for="add in addressHis" :key="add.id">
                <el-radio :label="add['id']">{{ add['address'] }}</el-radio>
                <el-divider/>
              </div>
            </el-radio-group>
          </el-collapse-item>
        </el-collapse>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
          <el-form-item label="收货人">
            <el-col :span="6">
              <el-input v-model="form.name"/>
            </el-col>
          </el-form-item>
          <el-form-item label="区域">
            <v-distpicker @selected="onSelected"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-col :span="16">
              <el-input v-model="form.address"/>
            </el-col>
          </el-form-item>
          <el-form-item label="邮编">
            <el-col :span="6">
              <el-input v-model="form.postCode"/>
            </el-col>
          </el-form-item>
          <el-form-item label="手机">
            <el-col :span="6">
              <el-input v-model="form.phone"/>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交订单</el-button>
            <el-button><router-link to="/index">取消</router-link></el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :sm="6" :md="2" :lg="6" :xl="6"><div class="grid-content bg-purple"/></el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="订单创建成功"
      width="30%">
      <span>订单创建成功，是否立即支付？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payCancel">取 消</el-button>
        <el-button type="primary" @click="payNow">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisiblePay"
      :before-close="handleClose"
      title="订单创建成功"
      width="30%">
      <span>订单是否支付？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payCancel">取 消</el-button>
        <el-button type="primary" @click="paySuccess">已支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '../common/header'
import VDistpicker from 'v-distpicker'
import { getHisAdd, setOrder, queryOrder } from '@/api/goods'
export default {
  name: 'Pay',
  components: {
    Header,
    VDistpicker
  },
  data() {
    return {
      htmlvalue: '',
      order: {
        rawHtml: '<h1>sss</h1>',
        url: '',
        orderId: '',
        subject: '',
        total_count: ''
      },
      dialogVisiblePay: false,
      dialogVisible: false,
      cart: this.$store.getters.cart,
      total_count: 0,
      addId: '',
      addressHis: [],
      addDict: [],
      form: {
        id: '',
        name: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postCode: '',
        phone: ''
      }
    }
  },
  created() {
    for (let i = 0; i < this.cart.length; i++) {
      this.total_count = this.total_count + (this.cart[i].price * this.cart[i].num)
    }
    getHisAdd(this.$store.getters.id).then(response => {
      const addDict = response.data
      this.addDict = addDict
      for (let i = 0; i < addDict.length; i++) {
        const addItem = addDict[i]['name'] + ' ' + addDict[i]['phone'] + ' ' + addDict[i]['province'] + addDict[i]['city'] + addDict[i]['area'] + addDict[i]['address'] + '  邮编:' + addDict[i]['postcode']
        const item = {
          id: addDict[i]['id'],
          address: addItem,
          origin: addDict[i]
        }
        this.addressHis.push(item)
      }
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    bandAdd(id) {
      if (id.length === 0) {
        this.form.address = ''
        this.form.province = ''
        this.form.city = ''
        this.form.name = ''
        this.form.postCode = ''
        this.form.phone = ''
        this.form.area = ''
        this.form.id = ''
      } else {
        for (let i = 0; i < this.addDict.length; i++) {
          if (id === this.addDict[i]['id']) {
            this.form.address = this.addDict[i]['address']
            this.form.province = this.addDict[i]['province']
            this.form.city = this.addDict[i]['city']
            this.form.name = this.addDict[i]['name']
            this.form.postCode = this.addDict[i]['postcode']
            this.form.phone = this.addDict[i]['phone']
            this.form.area = this.addDict[i]['area']
            this.form.id = this.addDict[i]['id']
            break
          }
        }
      }
    },
    onSelected(data) {
      this.form.province = data.province['value']
      this.form.city = data.city['value']
      this.form.area = data.area['value']
    },
    payNow() {
      this.dialogVisible = false
      this.dialogVisiblePay = true
      console.log(this.order.url)
      this.$store.dispatch('addUrl', this.order.url)
      window.open('/#/payPage', '_blank')
    },
    paySuccess() {
      queryOrder(this.order.orderId).then(response => {
        console.log(response)
        if (response.status === '200') {
          this.$router.push({ path: this.redirect || '/login' })
        } else {
          alert('支付失败！')
        }
      })
    },
    payCancel() {
      this.$router.push({ path: this.redirect || '/login' })
    },
    onSubmit() {
      // 订单金额
      // 生成订单号
      const date = new Date()
      const year = date.getFullYear().toString()
      const month = date.getMonth().toString()
      const day = date.getDay().toString()
      const hours = date.getHours().toString()
      const minutes = date.getMinutes().toString()
      const seconds = date.getSeconds().toString()
      const orderNum = year + month + day + hours + minutes + seconds + this.$store.getters.id
      setOrder(this.total_count, orderNum, this.form, this.cart, this.$store.getters.id).then(response => {
        if (response.status === '200') {
          this.dialogVisible = true
          this.order.orderId = response.data[0].orderId
          this.order.subject = response.data[0].subject
          this.order.total_count = response.data[0].total_count
          this.order.url = response.data[0].url
          this.htmlvalue = this.order.url
        }
      })
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 1px;
  }
</style>
