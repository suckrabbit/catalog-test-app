<template>
  <label :class="{'checkbox_active': modelValue}" class="checkbox">
    <slot />
    <input :value="modelValue" type="checkbox" class="checkbox__checkbox" @change="onChange">
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VCheckBox',
  emits: ['update:modelValue'],
  props: {
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const onChange = () => {
      emit('update:modelValue', !props.modelValue);
    };
    return { onChange };
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  display: block;
  width: 47px;
  height: 40px;
  margin-right: 5px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid $border_color;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  background: $white_color;
  @include setFont("GothamPro", 16px, 700);
  &_active {
    background: $primary_color;
    border: 0;
    color: $white_color;
  }
  &__checkbox {
    display: none;;
  }
}
</style>
