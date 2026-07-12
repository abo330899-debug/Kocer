<template>
  <UnifiedPageCard title="🔎 التحكم بالمسح" description="هذه الصفحة مخصصة لمراقبة عمليات المسح والتحقق من الوثائق.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
