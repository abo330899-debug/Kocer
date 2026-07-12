<template>
  <UnifiedPageCard title="📥 QR مستورد" description="هذه الصفحة مخصصة للوثائق التي يتم استيرادها أو تحميلها من مصادر خارجية.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
