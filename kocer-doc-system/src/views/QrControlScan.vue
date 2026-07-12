<template>
  <UnifiedPageCard title="� قراءات السيطرة" description="قراءات نقاط السيطرة والتفتيش">
    <div class="scan-area">
      <div class="scan-placeholder">
        <div class="scan-icon">📷</div>
        <p>وجه الكاميرا نحو QR Code للمسح</p>
        <div class="scan-box"></div>
      </div>

      <div class="manual-entry">
        <p class="or-divider">أو</p>
        <div class="form-group">
          <input v-model="manualCode" type="text" placeholder="أدخل رمز QR يدوياً" class="form-input" />
        </div>
        <button class="btn btn-primary" @click="manualScan">بحث</button>
      </div>
    </div>

    <div v-if="scanResult" class="scan-result">
      <h4>نتيجة المسح</h4>
      <p><strong>رقم الوثيقة:</strong> {{ scanResult.doc_number }}</p>
      <p><strong>الشركة:</strong> {{ scanResult.company }}</p>
      <p><strong>الحالة:</strong>
        <span class="status-badge allowed">✅ مسموح</span>
      </p>
      <button class="btn btn-success" @click="confirmPass">تأكيد المرور</button>
      <button class="btn btn-danger" @click="denyPass">منع المرور</button>
    </div>

    <p v-if="msg" class="success-msg">{{ msg }}</p>

    <template #actions>
      <router-link class="btn btn-outline" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import { ref } from 'vue'
import UnifiedPageCard from '../components/UnifiedPageCard.vue'

const manualCode = ref('')
const scanResult = ref(null)
const msg = ref('')

function manualScan() {
  if (!manualCode.value.trim()) return
  scanResult.value = {
    doc_number: manualCode.value.trim(),
    company: 'شركة تم مسحها'
  }
  msg.value = ''
}

function confirmPass() {
  msg.value = `✅ تم تأكيد مرور الوثيقة رقم ${scanResult.value.doc_number}`
  scanResult.value = null
  manualCode.value = ''
}

function denyPass() {
  msg.value = `⛔ تم منع مرور الوثيقة رقم ${scanResult.value.doc_number}`
  scanResult.value = null
  manualCode.value = ''
}
</script>

<style scoped>
.scan-area { text-align: center; }
.scan-placeholder {
  padding: 40px 20px;
  background: #f0f4f8;
  border: 2px dashed #1a5276;
  border-radius: 12px;
  margin-bottom: 20px;
}
.scan-icon { font-size: 48px; margin-bottom: 8px; }
.scan-placeholder p { color: #555; font-size: 14px; }
.scan-box {
  width: 200px;
  height: 200px;
  border: 2px solid #1a5276;
  margin: 16px auto;
  border-radius: 12px;
  background: rgba(26, 82, 118, 0.05);
}
.manual-entry { margin-top: 16px; }
.or-divider { color: #888; font-size: 13px; margin: 12px 0; }
.form-group { margin-bottom: 12px; }
.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: 'Cairo', sans-serif;
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: #1a5276;
  box-shadow: 0 0 0 3px rgba(26, 82, 118, 0.15);
}
.scan-result {
  margin-top: 20px;
  padding: 20px;
  background: #eaf2f8;
  border-radius: 8px;
  text-align: right;
}
.scan-result h4 { margin: 0 0 12px; color: #1a5276; }
.scan-result p { margin: 4px 0; font-size: 14px; }
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}
.allowed { background: #d5f5e3; color: #27ae60; }
.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-family: 'Cairo', sans-serif;
  margin: 8px 4px;
}
.btn-primary {
  background: #1a5276;
  color: #fff;
}
.btn-primary:hover {
  background: #154360;
}
.btn-success {
  background: #27ae60;
  color: #fff;
}
.btn-success:hover {
  background: #1e8449;
}
.btn-danger {
  background: #e74c3c;
  color: #fff;
}
.btn-danger:hover {
  background: #c0392b;
}
.success-msg {
  margin-top: 16px;
  padding: 12px;
  background: #d5f5e3;
  border-radius: 6px;
  color: #27ae60;
  text-align: center;
  font-weight: 600;
}
</style>
