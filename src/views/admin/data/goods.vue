<template>
  <div style="margin-top: 200px;margin-left: 20px">
    <el-row>
      <el-col :span="15">
        <h4>商品品牌数量统计</h4>
        <BarChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from '@/components/PanelGroup/BarChart'
export default {
  name: 'Goods',
  components: {
    BarChart
  }
}
</script>

<style scoped>

</style>
