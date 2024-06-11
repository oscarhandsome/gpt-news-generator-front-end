<script lang="ts" setup>
const bcolor = ref('#000')
</script>

<template>
  <!-- variant 1 -->
  <!-- <span class="loader" :style="{ 'border-color': bcolor }"></span> -->
  <!-- variant 2 -->
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid v-bind(bcolor);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
