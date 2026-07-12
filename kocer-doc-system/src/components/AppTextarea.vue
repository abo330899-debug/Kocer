<template>
  <div class="app-textarea-wrapper">
    <label v-if="label" class="app-textarea-label">{{ label }}</label>
    <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :rows="rows" class="app-textarea" :class="{ 'input-error': error }"></textarea>
    <p v-if="error" class="input-error-msg">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({ modelValue: String, label: { type: String, default: '' }, placeholder: { type: String, default: '' }, rows: { type: Number, default: 3 }, error: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>
<style scoped>
.app-textarea-wrapper { margin-bottom: 16px; }
.app-textarea-label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; font-size: 14px; }
.app-textarea { width: 100%; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-family: 'Cairo', sans-serif; font-size: 14px; box-sizing: border-box; resize: vertical; transition: border-color 0.2s; }
.app-textarea:focus { outline: none; border-color: #1a5276; box-shadow: 0 0 0 3px rgba(26,82,118,0.15); }
.input-error { border-color: #e74c3c !important; }
.input-error-msg { margin: 4px 0 0; color: #e74c3c; font-size: 12px; }
</style>
