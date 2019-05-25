<template>
  <div>
    <Header/>
    <el-row :gutter="0" style="margin-top: 100px">
      <el-col :sm="6" :md="2" :lg="6" :xl="6"><div class="grid-content bg-purple"/></el-col>
      <el-col :sm="24" :md="20" :lg="12" :xl="12">
        <h1>支付订单</h1>
        <el-collapse>
          <el-collapse-item title="历史地址" name="2">
            <el-radio v-model="addressHis" label="1">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念</el-radio>
            <el-divider/>
            <el-radio v-model="addressHis" label="2">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念</el-radio>
            <el-divider/>
            <el-radio v-model="addressHis" label="3">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念</el-radio>
            <el-divider/>
            <el-radio v-model="addressHis" label="4">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念</el-radio>
            <el-divider/>
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
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"/>
              <el-option label="区域二" value="beijing"/>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
            </el-col>
            <el-col :span="2" class="line">-</el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;"/>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"/>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"/>
              <el-checkbox label="地推活动" name="type"/>
              <el-checkbox label="线下主题活动" name="type"/>
              <el-checkbox label="单纯品牌曝光" name="type"/>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"/>
              <el-radio label="线下场地免费"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.desc" type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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

export default {
  name: 'Pay',
  components: {
    Header,
    VDistpicker
  },
  data() {
    return {
      addressHis: '',
      form: {
        name: '',
        province: '',
        city: '',
        area: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSelected(data) {
      this.form.province = data.province['value']
      this.form.city = data.city['value']
      this.form.area = data.area['value']
    },
    onSubmit() {
      console.log(this.addressHis)
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 1px;
  }
</style>
