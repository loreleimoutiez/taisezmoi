<script setup>
import NavMenu from '@/frontend/frontend-vue/Components/NavMenu.vue'
import RibbonInfo from '@/frontend/frontend-vue/Components/RibbonInfo.vue'
import FooterThing from '@/frontend/frontend-vue/Components/FooterThing.vue'

defineOptions({
  inheritAttrs: false
})
</script>

<template>
    <NavMenu />
    <RibbonInfo />
    <div v-bind="$attrs">
      <slot></slot>
    </div>
    <FooterThing />
</template>
