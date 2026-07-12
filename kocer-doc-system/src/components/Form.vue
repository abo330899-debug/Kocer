<template>
  <form class="custom-form" @submit.prevent="$emit('submit')"><slot /></form>
</template>
<script setup>
defineEmits(['submit'])
</script>
<style scoped>
.custom-form { width: 100%; }
</style>
