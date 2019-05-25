<template>
  <div>
    <Header/>
    <el-row :gutter="0" style="margin-top: 100px">
      <el-col :sm="6" :md="2" :lg="6" :xl="6"><div class="grid-content bg-purple"/></el-col>
      <el-col :sm="24" :md="20" :lg="12" :xl="12">
        <h1>支付订单</h1>
        <el-collapse>
          <el-collapse-item title="历史地址" name="2">
            <el-radio-group v-model="addId" :change="bandAdd(addId)">
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
  </div>
</template>

<script>
import Header from '../common/header'
import VDistpicker from 'v-distpicker'
import { getHisAdd } from '@/api/goods'
export default {
  name: 'Pay',
  components: {
    Header,
    VDistpicker
  },
  data() {
    return {
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
    bandAdd(id) {
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
    },
    onSelected(data) {
      this.form.province = data.province['value']
      this.form.city = data.city['value']
      this.form.area = data.area['value']
    },
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 1px;
  }
</style>
