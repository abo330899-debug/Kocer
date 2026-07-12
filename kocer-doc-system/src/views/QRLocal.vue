<template>
  <UnifiedPageCard title="📱 QR محلي" description="هذه الصفحة مخصصة لعرض أو إدارة الوثائق التي تُرسل محليًا داخل النظام.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
