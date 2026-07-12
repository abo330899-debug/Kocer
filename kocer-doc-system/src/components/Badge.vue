<template>
  <span class="custom-badge" :class="[variant ? `badge-${variant}` : 'badge-default']"><slot /></span>
</template>
<script setup>
defineProps({ variant: { type: String, default: 'default' } })
</script>
<style scoped>
.custom-badge { display: inline-block; padding: 3px 10px; border-radius: 10px; font-size: 11px; font-weight: 600; }
.badge-default { background: #eee; color: #555; }
.badge-primary { background: #d4e6f1; color: #1a5276; }
.badge-success { background: #d5f5e3; color: #27ae60; }
.badge-danger { background: #fadbd8; color: #e74c3c; }
.badge-warning { background: #fef9e7; color: #d4ac0d; }
</style>
