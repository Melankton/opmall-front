<template>
  <div style="margin-left: 20px"><h3>添加商品类别</h3>
    <h4>请选择父类别</h4>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="cat in goodsCat"
        :key="cat.value"
        :label="cat.label"
        :value="cat.value"/>
    </el-select>
    <el-row>
      <el-col :span="6">
        <h4>请输入商品子类别</h4>
        <el-input v-model="goodsCatChild" placeholder="请输入子类别"/>
      </el-col>
    </el-row>
    <el-button type="primary" style="margin-top: 20px" @click="add()">立即添加</el-button>
  </div>
</template>

<script>
import { getParentCat, addCatChild } from '@/api/goods'
export default {
  name: 'GoodsCatAdd',
  data() {
    return {
      goodsCatChild: '',
      value: '',
      goodsCat: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getParentCat().then(response => {
        const data = response.data
        for (let i = 0; i < data.length; i++) {
          const item = {
            value: data[i].id,
            label: data[i].name
          }
          this.goodsCat.push(item)
        }
      })
    },
    add() {
      addCatChild(this.value, this.goodsCatChild).then(response => {
        if (response.status === '200') {
          this.success('类别添加成功!')
        }
      })
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
