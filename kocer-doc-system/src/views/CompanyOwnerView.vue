<template>
  <CompanyOwnerLayout :company-name="companyData?.name" :user-name="user?.name">
    <div v-if="step === 'hash'" class="step-container">
      <div class="step-card">
        <div class="section-header">
          <div>
            <h3>إدخال رقم الشركة</h3>
            <p class="step-desc">أدخل رقم الشركة الموجود داخل ملف companies.json للبدء</p>
          </div>
          <div class="quick-links">
            <router-link class="btn btn-outline" to="/qr/document">عرض الوثيقة</router-link>
            <router-link class="btn btn-outline" to="/qr/local">QR محلي</router-link>
            <router-link class="btn btn-outline" to="/qr/imported">QR مستورد</router-link>
          </div>
        </div>
        <div class="form-group">
          <input v-model="companyNumber" type="number" min="1" placeholder="أدخل رقم الشركة" class="form-input ltr-input" @keyup.enter="fetchCompany" />
        </div>
        <button class="btn btn-primary" @click="fetchCompany" :disabled="fetching">{{ fetching ? 'جاري البحث...' : 'بحث' }}</button>
        <p v-if="hashError" class="error-msg">{{ hashError }}</p>
      </div>
    </div>
    <div v-else-if="step === 'items'" class="step-container">
      <div class="step-card">
        <div class="company-info-bar">
          <span><strong>الشركة:</strong> {{ companyData?.name }}</span>
          <span><strong>رمز الشركة:</strong> {{ companyData?.code }}</span>
          <div class="quick-links compact-links">
            <router-link class="btn btn-outline" to="/qr/health-certificate">شهادة صحية</router-link>
            <router-link class="btn btn-outline" to="/qr/readings">قراءات</router-link>
            <router-link class="btn btn-outline" to="/qr/checkpoints">نقاط تفتيش</router-link>
          </div>
        </div>
        <h3>المنتجات والمواد</h3>
        <p class="step-desc">حدد الكمية المطلوبة لكل منتج</p>
        <div class="items-grid">
          <div v-for="(item, idx) in companyItems" :key="idx" class="item-row">
            <div class="item-info">
              <span class="item-name">{{ item.item_name }}</span>
              <span class="item-unit">({{ item.unit }})</span>
            </div>
            <div class="item-input-group">
              <input v-model.number="item.quantity" type="number" min="0" placeholder="الكمية" class="form-input qty-input" />
            </div>
          </div>
        </div>
        <div class="step-actions">
          <button class="btn btn-primary" @click="submitShipment" :disabled="submitting">{{ submitting ? 'جاري إرسال الطلب...' : 'إرسال طلب شحن' }}</button>
        </div>
        <p v-if="submitError" class="error-msg">{{ submitError }}</p>
      </div>
    </div>
    <div v-else-if="step === 'document'" class="step-container">
      <div class="doc-actions">
        <button class="btn btn-outline" @click="printDocument">🖨️ طباعة الوثيقة</button>
        <button class="btn btn-outline" @click="regenerateDoc">🔄 إعادة توليد الوثيقة</button>
        <button class="btn btn-outline" @click="goBackToItems">↩ العودة إلى المنتجات</button>
      </div>
      <ShipmentDoc ref="shipmentDocRef" :doc="currentDoc" />
      <p v-if="regenerateMsg" class="success-msg">{{ regenerateMsg }}</p>
      <p v-if="regenerateError" class="error-msg">{{ regenerateError }}</p>
    </div>
  </CompanyOwnerLayout>
</template>

<script setup>
import { ref } from 'vue'
import CompanyOwnerLayout from '../layouts/CompanyOwnerLayout.vue'
import ShipmentDoc from '../components/ShipmentDoc.vue'
import { fetchCompanyByNumber, submitShipmentRequest, regenerateDocQR } from '../services/api.js'

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const step = ref('hash')
const companyNumber = ref('')
const fetching = ref(false)
const hashError = ref('')
const companyData = ref(null)
const companyItems = ref([])
const submitting = ref(false)
const submitError = ref('')
const currentDoc = ref(null)
const shipmentDocRef = ref(null)
const regenerateMsg = ref('')
const regenerateError = ref('')

async function fetchCompany() {
  const rawNumber = Number(companyNumber.value)
  if (!Number.isInteger(rawNumber) || rawNumber < 1) {
    hashError.value = 'الرجاء إدخال رقم شركة صحيح أكبر من 0'
    return
  }

  hashError.value = ''; fetching.value = true
  try {
    const res = await fetchCompanyByNumber(rawNumber)
    companyData.value = res.data.company
    companyItems.value = (res.data.items || []).map(item => ({ ...item, quantity: 0 }))
    step.value = 'items'
  } catch { hashError.value = 'لم يتم العثور على شركة بهذا الرقم' }
  finally { fetching.value = false }
}

async function submitShipment() {
  const selectedItems = companyItems.value.filter(item => item.quantity > 0)
  if (!selectedItems.length) { submitError.value = 'الرجاء إدخال كمية على الأقل'; return }
  submitError.value = ''; submitting.value = true
  try {
    const res = await submitShipmentRequest(companyData.value.id, selectedItems)
    currentDoc.value = res.data.doc || res.data
    step.value = 'document'
  } catch { submitError.value = 'فشل إرسال طلب الشحن' }
  finally { submitting.value = false }
}

function printDocument() {
  if (!shipmentDocRef.value) return
  const docEl = shipmentDocRef.value.docRef?.value
  if (!docEl) return
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  const printContent = docEl.querySelector('#print-area') || docEl.querySelector('.a4-page')
  if (!printContent) return
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(el => el.outerHTML).join('')
  printWindow.document.write(`
    <!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>طباعة وثيقة شحن</title>
    ${styles}
    <style>@page { size: A4; margin: 0; }
      body { margin: 0; padding: 0; font-family: 'Cairo', sans-serif; }
      .a4-page { width: 210mm; min-height: 296mm; padding: 10mm !important; box-shadow: none !important; border-radius: 0 !important; }
      button, .print-toolbar, .download-toolbar, .doc-actions, .step-actions, .btn { display: none !important; }
      .center-logo { height: 80px !important; }
      .large-qr .barcode-img { width: 40mm !important; height: 40mm !important; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    </style></head><body>${printContent.outerHTML}<script>window.onload=function(){window.print();window.close()}<\/script></body></html>
  `)
  printWindow.document.close()
}

async function regenerateDoc() {
  if (!currentDoc.value?.doc_number) return
  regenerateMsg.value = ''; regenerateError.value = ''
  try {
    const res = await regenerateDocQR(currentDoc.value.doc_number)
    if (res.data?.doc) currentDoc.value = { ...currentDoc.value, ...res.data.doc }
    regenerateMsg.value = 'تم إعادة توليد QR الوثيقة بنجاح'
    setTimeout(() => { regenerateMsg.value = '' }, 3000)
  } catch { regenerateError.value = 'فشل إعادة توليد الوثيقة' }
}

function goBackToItems() { step.value = 'items' }
</script>

<style scoped>
.step-container { display: flex; justify-content: center; padding: 24px 0; }
.step-card { background: #fff; border-radius: 10px; padding: 32px; width: 100%; max-width: 700px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.section-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
.quick-links { display: flex; flex-wrap: wrap; gap: 8px; }
.compact-links { margin-right: auto; }
.step-card h3 { margin: 0 0 4px; color: #1a5276; font-size: 18px; }
.step-desc { margin: 0 0 20px; color: #666; font-size: 13px; }
.company-info-bar { display: flex; align-items: center; gap: 24px; padding: 12px 16px; background: #eaf2f8; border-radius: 6px; margin-bottom: 20px; font-size: 14px; flex-wrap: wrap; }
.ltr-input { direction: ltr; text-align: left; font-family: monospace; letter-spacing: 2px; }
.items-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.item-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f9f9f9; border: 1px solid #eee; border-radius: 6px; }
.item-info { display: flex; gap: 6px; align-items: center; }
.item-name { font-weight: 600; color: #333; }
.item-unit { color: #888; font-size: 12px; }
.qty-input { width: 100px; text-align: center; }
.step-actions { display: flex; gap: 12px; justify-content: center; }
.doc-actions { display: flex; gap: 12px; justify-content: center; margin-bottom: 24px; flex-wrap: wrap; }
.btn { padding: 10px 24px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; font-family: 'Cairo', sans-serif; transition: all 0.2s; }
.btn-primary { background: #1a5276; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #154360; }
.btn-primary:disabled { background: #7fb3d8; cursor: not-allowed; }
.btn-outline { background: transparent; border: 1px solid #1a5276; color: #1a5276; }
.btn-outline:hover { background: #1a5276; color: #fff; }
.error-msg { color: #e74c3c; text-align: center; margin-top: 16px; font-size: 13px; }
.success-msg { color: #27ae60; text-align: center; margin-top: 16px; font-size: 13px; }
.form-input { width: 100%; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; font-family: 'Cairo', sans-serif; box-sizing: border-box; }
.form-input:focus { outline: none; border-color: #1a5276; box-shadow: 0 0 0 3px rgba(26,82,118,0.15); }
</style>
