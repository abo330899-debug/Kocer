<template>
  <UnifiedPageCard title="🩺 شهادة صحية" description="صفحة مخصصة لعرض أو إدارة الشهادات الصحية المرتبطة بالوثيقة.">
    <template #actions>
      <router-link class="btn btn-primary" to="/company-owner">العودة إلى لوحة التحكم</router-link>
    </template>
  </UnifiedPageCard>
</template>

<script setup>
import UnifiedPageCard from '../components/UnifiedPageCard.vue'
</script>
