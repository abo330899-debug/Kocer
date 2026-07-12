<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <img src="/logo.png" alt="شعار" class="login-logo" />
        <h1>بوابة أصحاب الشركات</h1>
        <p>الهيئة العامة للجمارك العراقية</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">اسم المستخدم</label>
          <input id="username" v-model="username" type="text" placeholder="أدخل اسم المستخدم" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="password">كلمة المرور</label>
          <input id="password" v-model="password" type="password" placeholder="أدخل كلمة المرور" required class="form-input" />
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
        </button>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    localStorage.setItem('user', JSON.stringify({ username: username.value, name: 'صاحب الشركة' }))
    router.push('/company-owner')
  } catch {
    error.value = 'فشل تسجيل الدخول. تحقق من بيانات الدخول.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #1a5276 0%, #2980b9 100%); }
.login-card { background: #fff; border-radius: 12px; padding: 40px; width: 400px; max-width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.login-header { text-align: center; margin-bottom: 32px; }
.login-logo { height: 64px; margin-bottom: 12px; }
.login-header h1 { margin: 0 0 4px; color: #1a5276; font-size: 22px; }
.login-header p { margin: 0; color: #666; font-size: 13px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; font-size: 14px; }
.form-input { width: 100%; padding: 10px 14px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; font-family: 'Cairo', sans-serif; box-sizing: border-box; }
.form-input:focus { outline: none; border-color: #1a5276; box-shadow: 0 0 0 3px rgba(26,82,118,0.15); }
.btn-primary { background: #1a5276; color: #fff; border: none; padding: 12px; font-size: 15px; font-weight: 700; border-radius: 6px; cursor: pointer; }
.btn-primary:hover { background: #154360; }
.btn-primary:disabled { background: #7fb3d8; cursor: not-allowed; }
.btn-block { width: 100%; }
.error-msg { color: #e74c3c; text-align: center; margin-top: 16px; font-size: 13px; }
</style>
