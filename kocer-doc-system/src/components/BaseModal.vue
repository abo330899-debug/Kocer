<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" :style="{ maxWidth: width }">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="modal-close" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body"><slot /></div>
        <div v-if="$slots.footer" class="modal-footer"><slot name="footer" /></div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
defineProps({ visible: { type: Boolean, default: false }, title: { type: String, default: '' }, width: { type: String, default: '500px' } })
defineEmits(['close'])
</script>
<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-container { background: #fff; border-radius: 12px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.2); overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #eee; }
.modal-header h3 { margin: 0; color: #1a5276; font-size: 18px; }
.modal-close { background: none; border: none; font-size: 28px; color: #888; cursor: pointer; padding: 0; line-height: 1; }
.modal-close:hover { color: #333; }
.modal-body { padding: 20px; max-height: 70vh; overflow-y: auto; }
.modal-footer { padding: 16px 20px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 12px; }
</style>
