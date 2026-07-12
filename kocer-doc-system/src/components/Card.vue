<template>
  <div class="custom-card" :class="[variant ? `card-${variant}` : '']">
    <div v-if="title" class="card-header"><h4>{{ title }}</h4></div>
    <div class="card-body"><slot /></div>
  </div>
</template>
<script setup>
defineProps({ title: { type: String, default: '' }, variant: { type: String, default: '' } })
</script>
<style scoped>
.custom-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; }
.card-header { padding: 14px 20px; border-bottom: 1px solid #eee; }
.card-header h4 { margin: 0; font-size: 15px; color: #1a5276; }
.card-body { padding: 20px; }
.card-primary { border-top: 3px solid #1a5276; }
.card-success { border-top: 3px solid #27ae60; }
.card-danger { border-top: 3px solid #e74c3c; }
.card-info { border-top: 3px solid #3498db; }
</style>
