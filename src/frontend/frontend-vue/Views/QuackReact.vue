<template>
  <LayoutComp>
    <div class="flex justify-between">
      <div id="react-root" class="flex-grow"></div>
    </div>
  </LayoutComp>
</template>

<script setup lang="jsx">
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import { onMounted } from 'vue'
import { ReactConnector } from '@/frontend/frontend-react/src/ReactConnector'
import App from '@/frontend/frontend-react/src/App'

onMounted(() => {
  const reactRoot = document.getElementById("react-root");
  if (reactRoot) {
    const reactAppConnector = new ReactConnector(reactRoot);
    reactAppConnector.render(App);
  } else {
    console.error("Impossible de trouver le conteneur React.");
  }
});
</script>
