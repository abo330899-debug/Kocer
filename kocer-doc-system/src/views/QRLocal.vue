<template>
  <UnifiedPageCard title="� QR - محلي" description="قراءة QR للشحن المحلي">
    <div class="form-group">
      <input v-model="docNumber" type="text" placeholder="رقم الوثيقة" class="form-input" />
    </div>

    <button class="btn btn-primary" @click="fetchData">بحث</button>

    <div v-if="data" class="result-box">
      <p><strong>رقم الوثيقة:</strong> {{ data.doc_number }}</p>
      <p><strong>الشركة:</strong> {{ data.company_name }}</p>
      <p><strong>الحالة:</strong> شحن محلي</p>
    </div>

    <template #actions>
      <router-link class="btn btn-outline" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import { ref } from 'vue'
import UnifiedPageCard from '../components/UnifiedPageCard.vue'

const docNumber = ref('')
const data = ref(null)

function fetchData() {
  data.value = {
    doc_number: docNumber.value.trim() || '———',
    company_name: 'شركة محلية'
  }
}
</script>

<style scoped>
.form-group { margin-bottom: 16px; }
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
.btn {
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-family: 'Cairo', sans-serif;
}
.btn-primary {
  background: #1a5276;
  color: #fff;
}
.btn-primary:hover {
  background: #154360;
}
.result-box {
  margin-top: 20px;
  padding: 16px;
  background: #eaf2f8;
  border-radius: 6px;
}
.result-box p {
  margin: 4px 0;
  font-size: 14px;
}
</style>
