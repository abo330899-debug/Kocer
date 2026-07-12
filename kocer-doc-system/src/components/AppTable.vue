<template>
  <div class="app-table-wrapper">
    <table class="app-table">
      <thead v-if="columns.length"><tr><th v-for="col in columns" :key="col.key">{{ col.label }}</th></tr></thead>
      <tbody>
        <tr v-for="(row, idx) in data" :key="idx">
          <td v-for="col in columns" :key="col.key">
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
          </td>
        </tr>
        <tr v-if="!data.length"><td :colspan="columns.length" class="empty-row">{{ emptyText }}</td></tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
defineProps({ columns: { type: Array, default: () => [] }, data: { type: Array, default: () => [] }, emptyText: { type: String, default: 'لا توجد بيانات' } })
</script>
<style scoped>
.app-table-wrapper { overflow-x: auto; }
.app-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.app-table th, .app-table td { border: 1px solid #ddd; padding: 10px 12px; text-align: center; }
.app-table th { background: #1a5276; color: #fff; font-weight: 600; }
.app-table tr:nth-child(even) { background: #f9f9f9; }
.app-table tr:hover { background: #eaf2f8; }
.empty-row { color: #999; font-style: italic; }
</style>
