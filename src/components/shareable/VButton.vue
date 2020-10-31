<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.button {
  width: 200px;
  height: 40px;
  background: $primary_color;
  border: 0;
  outline: none;
  color: $white_color;
  border-radius: 5px;
  @include setFont("GothamPro", 14px, 700);
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 5px 10px rgba(86, 86, 86, 0.1);
  }
  &:active {
    box-shadow: inset 0px 5px 10px rgba(86, 86, 86, 0.1);
  }
}
</style>
