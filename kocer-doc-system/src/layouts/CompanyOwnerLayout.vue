<template>
  <div class="company-owner-layout">
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/logo.png" alt="شعار" class="navbar-logo" />
        <span class="navbar-title">{{ companyName || 'بوابة أصحاب الشركات' }}</span>
      </div>
      <div class="navbar-actions">
        <span class="user-name">{{ userName || 'المستخدم' }}</span>
        <button class="btn btn-outline" @click="handleLogout">تسجيل الخروج</button>
      </div>
    </nav>

    <main class="layout-content">
      <slot />
    </main>

    <footer class="layout-footer">
      <span>الهيئة العامة للجمارك العراقية</span>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  companyName: { type: String, default: '' },
  userName: { type: String, default: '' }
})

function handleLogout() {
  localStorage.removeItem('user')
  localStorage.removeItem('company_data')
  router.push('/')
}
</script>

<style scoped>
.company-owner-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 2px solid #1a5276;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.navbar-logo { height: 40px; }
.navbar-title { font-size: 18px; font-weight: 700; color: #1a5276; }
.navbar-actions { display: flex; align-items: center; gap: 16px; }
.user-name { font-size: 14px; color: #333; font-weight: 500; }
.btn-outline {
  padding: 8px 16px; font-size: 13px; border: 1px solid #1a5276;
  background: transparent; color: #1a5276; border-radius: 6px;
  cursor: pointer; font-weight: 600; transition: all 0.2s;
}
.btn-outline:hover { background: #1a5276; color: #fff; }
.layout-content { flex: 1; padding: 24px; max-width: 1200px; width: 100%; margin: 0 auto; }
.layout-footer { text-align: center; padding: 16px; background: #1a5276; color: #fff; font-size: 13px; font-weight: 500; }
</style>
