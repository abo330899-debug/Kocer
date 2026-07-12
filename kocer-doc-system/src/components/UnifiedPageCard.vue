<template>
  <div class="page-shell">
    <div class="page-card">
      <div class="page-card-header">
        <div>
          <h2>{{ title }}</h2>
          <p v-if="description">{{ description }}</p>
        </div>
        <router-link v-if="showBack" class="btn btn-outline" to="/company-owner">العودة إلى لوحة التحكم</router-link>
      </div>

      <div class="page-card-body">
        <slot />
      </div>

      <div v-if="$slots.actions" class="page-card-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  showBack: { type: Boolean, default: true }
})
</script>

<style scoped>
.page-shell {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #eaf2f8 100%);
}
.page-card {
  width: 100%;
  max-width: 760px;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6edf4;
}
.page-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.page-card-header h2 {
  margin: 0 0 6px;
  color: #1a5276;
  font-size: 22px;
}
.page-card-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
.page-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.page-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.btn-primary {
  background: #1a5276;
  color: #fff;
}
.btn-primary:hover {
  background: #154360;
}
.btn-outline {
  background: transparent;
  border-color: #1a5276;
  color: #1a5276;
}
.btn-outline:hover {
  background: #1a5276;
  color: #fff;
}
@media (max-width: 640px) {
  .page-card {
    padding: 24px;
  }
  .page-card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
