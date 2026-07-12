<template>
  <UnifiedPageCard title="⛔ تعطيل الوثيقة" description="هذه الصفحة مخصصة لإلغاء أو تعطيل الوثيقة عند الحاجة.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
