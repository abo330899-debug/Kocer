<template>
  <UnifiedPageCard title="📊 قراءات الوثيقة" description="هذه الصفحة تعرض القراءات والتفتيشات الخاصة بالوثيقة.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
