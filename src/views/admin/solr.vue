<template>
  <div style="margin-left: 20px">
    <h4>索引设置</h4>
    <el-button type="primary" @click="solrSync()">一键同步Solr索引</el-button>
  </div>
</template>

<script>
import { syncSolr } from '@/api/goods'
export default {
  name: 'Solr',
  methods: {
    solrSync() {
      syncSolr().then(response => {
        if (response.status === 200) {
          this.success('Solr索引同步成功')
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
