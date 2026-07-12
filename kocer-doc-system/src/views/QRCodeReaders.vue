<template>
  <UnifiedPageCard title="📷 قارئ QR" description="هذه الصفحة جاهزة لاستقبال أو عرض عمليات مسح QR مستقبلًا.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
