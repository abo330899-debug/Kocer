<template>
  <UnifiedPageCard title="🛣️ نقاط التفتيش" description="هذه الصفحة تمثل نقاط التفتيش التي يمكن أن تتفاعل مع الوثيقة عبر QR.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
