<script setup>
const { $bootstrap } = useNuxtApp();

onMounted(() => {
  $bootstrap.initializeTooltip();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>