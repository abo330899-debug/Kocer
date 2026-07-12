<template>
  <div class="app-input-wrapper">
    <label v-if="label" class="app-input-label">{{ label }}</label>
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" class="app-input" :class="{ 'input-error': error, 'ltr': ltr }" />
    <p v-if="error" class="input-error-msg">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({ modelValue: [String, Number], label: { type: String, default: '' }, type: { type: String, default: 'text' }, placeholder: { type: String, default: '' }, error: { type: String, default: '' }, ltr: { type: Boolean, default: false } })
defineEmits(['update:modelValue'])
</script>
<style scoped>
.app-input-wrapper { margin-bottom: 16px; }
.app-input-label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; font-size: 14px; }
.app-input { width: 100%; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-family: 'Cairo', sans-serif; font-size: 14px; box-sizing: border-box; transition: border-color 0.2s; }
.app-input:focus { outline: none; border-color: #1a5276; box-shadow: 0 0 0 3px rgba(26,82,118,0.15); }
.app-input.ltr { direction: ltr; text-align: left; font-family: monospace; }
.input-error { border-color: #e74c3c !important; }
.input-error-msg { margin: 4px 0 0; color: #e74c3c; font-size: 12px; }
</style>
