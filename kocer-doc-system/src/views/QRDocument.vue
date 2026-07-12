<template>
  <div class="qr-page">
    <div class="qr-card">
      <h2>📄 وثيقة القراءة</h2>
      <p class="qr-desc">أدخل رقم الوثيقة لعرضها</p>
      <div class="form-group">
        <input v-model="docNumber" type="text" placeholder="رقم الوثيقة" class="form-input" @keyup.enter="fetchDoc" />
      </div>
      <button class="btn btn-primary" @click="fetchDoc" :disabled="loading">{{ loading ? 'جاري البحث...' : 'عرض الوثيقة' }}</button>
      <div v-if="documentData" class="doc-result"><ShipmentDoc :doc="documentData" /></div>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ShipmentDoc from '../components/ShipmentDoc.vue'
import { fetchQRDocument } from '../services/api.js'
const docNumber = ref(''); const documentData = ref(null); const loading = ref(false); const error = ref('')
async function fetchDoc() {
  if (!docNumber.value.trim()) { error.value = 'الرجاء إدخال رقم الوثيقة'; return }
  error.value = ''; loading.value = true
  try { const res = await fetchQRDocument(docNumber.value.trim()); documentData.value = res.data }
  catch { error.value = 'لم يتم العثور على الوثيقة'; documentData.value = null }
  finally { loading.value = false }
}
</script>
<style scoped>
.qr-page { min-height: 100vh; display: flex; justify-content: center; padding: 40px 20px; background: #f5f7fa; }
.qr-card { background: #fff; border-radius: 10px; padding: 32px; width: 100%; max-width: 800px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.qr-card h2 { margin: 0 0 4px; color: #1a5276; }
.qr-desc { margin: 0 0 20px; color: #666; font-size: 13px; }
.form-group { margin-bottom: 16px; }
.form-input { width: 100%; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; font-family: 'Cairo', sans-serif; box-sizing: border-box; }
.form-input:focus { outline: none; border-color: #1a5276; box-shadow: 0 0 0 3px rgba(26,82,118,0.15); }
.doc-result { margin-top: 24px; border-top: 1px solid #eee; padding-top: 20px; }
.btn { padding: 10px 24px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; font-family: 'Cairo', sans-serif; }
.btn-primary { background: #1a5276; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #154360; }
.btn-primary:disabled { background: #7fb3d8; cursor: not-allowed; }
.error-msg { color: #e74c3c; margin-top: 16px; font-size: 13px; }
</style>
