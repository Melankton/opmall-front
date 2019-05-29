<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名:{{ name }}</div>
    <div class="dashboard-text">用户权限:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <panel-group/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <BarChart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <PieChart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/PanelGroup/BarChart'
import PanelGroup from '../../components/PanelGroup/PanelGroup'
import RaddarChart from '../../components/PanelGroup/RaddarChart'
import PieChart from '../../components/PanelGroup/PieChart'
export default {
  name: 'Dashboard',
  components: { PanelGroup, RaddarChart, PieChart, BarChart },
  component: {
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
