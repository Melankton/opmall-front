<template>
  <div style="margin-left: 20px">
    <h1>收货地址管理</h1>
    <el-radio-group v-model="addId" :change="bandAdd(addId)">
      <el-divider/>
      <div v-for="add in addressHis" :key="add.id">
        <el-radio :label="add['id']">{{ add['address'] }}</el-radio>
        <el-divider/>
      </div>
    </el-radio-group>
    <br>
    <el-button @click="deleteAdd()">删除历史地址</el-button>
</div></template>

<script>
import { getHisAdd, deleteAddress } from '@/api/goods'
export default {
  name: 'Address',
  data() {
    return {
      addId: '',
      addDict: [],
      addressHis: [],
      form: {}
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
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
    deleteAdd() {
      deleteAddress(this.addId).then(response => {
        if (response.status === '200') {
          this.success('删除历史地址成功！')
          this.fetch()
          this.addressHis = []
        }
      })
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    bandAdd(id) {
      this.addId = id
    }
  }
}
</script>

<style scoped>

</style>
