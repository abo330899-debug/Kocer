<template>
  <div class="qr-document-root" ref="docRef">
    <div class="doc-viewport">
      <div class="a4-page" id="print-area">
        <div class="header-clean">
          <div class="header-right">
            <img src="/logo.png" alt="شعار" class="center-logo" />
          </div>
          <div class="header-left">
            <h2>وثيقة شحن</h2>
            <p class="doc-number">رقم الوثيقة: {{ doc?.doc_number || '---' }}</p>
          </div>
        </div>
        <div class="doc-meta">
          <div class="meta-line">
            <span class="meta-label">تاريخ الإنشاء:</span>
            <span class="meta-value">{{ formatDate(doc?.created_at) }}</span>
          </div>
          <div class="meta-line">
            <span class="meta-label">تاريخ الانتهاء:</span>
            <span class="meta-value">{{ formatDate(doc?.expires_at) }}</span>
          </div>
        </div>
        <div class="subject-row">
          <div class="subject-field">
            <span class="subject-label">اسم الشركة:</span>
            <span class="subject-value">{{ doc?.company_name || '---' }}</span>
          </div>
          <div class="subject-field">
            <span class="subject-label">اسم السائق:</span>
            <span class="subject-value">{{ doc?.driver_name || '---' }}</span>
          </div>
        </div>
        <div class="info-section">
          <div class="info-table">
            <table>
              <thead>
                <tr>
                  <th>رقم العجلة</th>
                  <th>نوع الحمولة</th>
                  <th>وزن الحمولة (كغم)</th>
                  <th>الوجهة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ doc?.vehicle_number || '---' }}</td>
                  <td>{{ doc?.load_type || '---' }}</td>
                  <td>{{ doc?.load_weight || '---' }}</td>
                  <td>{{ doc?.destination || '---' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="items-section">
          <h4>المواد والمنتجات</h4>
          <table class="items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المادة</th>
                <th>الطاقة الإنتاجية</th>
                <th>الوحدة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in doc?.items || []" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td>{{ item.item_name }}</td>
                <td>{{ item.production_capacity }}</td>
                <td>{{ item.unit }}</td>
              </tr>
              <tr v-if="!doc?.items?.length">
                <td colspan="4" class="empty-row">لا توجد مواد مضافة</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="qr-wrap">
          <div class="large-qr">
            <img v-if="qrImage" :src="qrImage" alt="QR Code" class="barcode-img" />
            <p v-else class="qr-placeholder">QR غير متوفر</p>
          </div>
        </div>
        <div class="doc-footer">
          <p>هذه الوثيقة معتمدة من الهيئة العامة للجمارك العراقية</p>
          <p class="footer-ref">المرجع: {{ doc?.reference || '---' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({ doc: { type: Object, default: () => ({}) } })
const docRef = ref(null)
const qrImage = ref('')

function formatDate(dateStr) {
  if (!dateStr) return '---'
  return new Date(dateStr).toLocaleDateString('ar-IQ', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function generateQR() {
  const qrSource = props.doc?.qr_code || props.doc?.response?.qr_code || ''
  if (!qrSource) {
    const fallback = props.doc?.license_approval_number || props.doc?.vehicle_number || props.doc?.driver_name
    if (fallback) {
      try { qrImage.value = await QRCode.toDataURL(fallback, { width: 200, margin: 2 }) }
      catch { qrImage.value = '' }
    }
    return
  }
  if (qrSource.startsWith('data:image')) { qrImage.value = qrSource; return }
  if (qrSource.includes('robot?url=')) {
    const m = qrSource.match(/robot\?url=([^&]+)/)
    if (m) { qrImage.value = `https://quickchart.io/qr?text=${encodeURIComponent(decodeURIComponent(m[1]))}&size=200` }
    return
  }
  if (qrSource.startsWith('http://') || qrSource.startsWith('https://')) { qrImage.value = qrSource; return }
  if (qrSource.length > 80 && /^[A-Za-z0-9+/=]+$/.test(qrSource)) { qrImage.value = `data:image/png;base64,${qrSource}`; return }
  try { qrImage.value = await QRCode.toDataURL(qrSource, { width: 200, margin: 2 }) }
  catch { qrImage.value = '' }
}

defineExpose({ docRef })
onMounted(generateQR)
</script>

<style scoped>
.qr-document-root { font-family: 'Cairo', sans-serif; direction: rtl; }
.doc-viewport { display: flex; justify-content: center; padding: 16px; }
.a4-page { width: 210mm; min-height: 297mm; background: #fff; padding: 15mm 20mm; box-shadow: 0 4px 20px rgba(0,0,0,0.12); border-radius: 4px; position: relative; }
.header-clean { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1a5276; padding-bottom: 12px; margin-bottom: 16px; }
.center-logo { height: 60px; }
.header-left { text-align: left; }
.header-left h2 { margin: 0; color: #1a5276; font-size: 20px; }
.doc-number { margin: 4px 0 0; font-size: 13px; color: #555; }
.doc-meta { display: flex; gap: 32px; margin-bottom: 16px; font-size: 13px; }
.meta-label { font-weight: 600; color: #1a5276; }
.meta-value { margin-right: 6px; color: #333; }
.subject-row { display: flex; gap: 32px; margin-bottom: 16px; }
.subject-label { font-weight: 600; color: #1a5276; font-size: 14px; }
.subject-value { margin-right: 6px; color: #333; }
.info-section, .items-section { margin-bottom: 16px; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { border: 1px solid #ccc; padding: 8px 10px; text-align: center; }
th { background: #1a5276; color: #fff; font-weight: 600; }
.items-section h4 { margin: 0 0 8px; color: #1a5276; font-size: 15px; }
.empty-row { color: #999; font-style: italic; }
.qr-wrap { display: flex; justify-content: center; margin: 24px 0; }
.large-qr { text-align: center; }
.barcode-img { width: 150px; height: 150px; }
.qr-placeholder { color: #999; font-size: 13px; }
.doc-footer { text-align: center; border-top: 2px solid #1a5276; padding-top: 12px; margin-top: 20px; font-size: 12px; color: #555; }
.footer-ref { font-weight: 600; color: #1a5276; }
</style>
