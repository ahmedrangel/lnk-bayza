<script setup>
const { $bootstrap } = useNuxtApp();

onMounted(() => {
  $bootstrap.initializeTooltip();
});
</script>

<template>
  <NuxtPage />
</template>