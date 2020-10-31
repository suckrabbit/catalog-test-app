<template>
  <input
    ref="input"
    :value="modelValue"
    type="text"
    class="text-input"
    @input="onInput"
    @blur="onBlur"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VInput',
  emits: ['update:modelValue', 'input'],
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
    numberType: {
      type: Boolean,
      default: true,
    },
    minValue: {
      type: [Number, Object],
      default: null,
    },
    maxValue: {
      type: [Number, Object],
      default: null,
    },
  },

  setup(props, { emit }) {
    const input = ref<HTMLInputElement | null>(null);
    const onInput = () => {
      if (props.numberType) {
        let value = (input.value as HTMLInputElement).value
          .replace(/[^.\d]/g, '')
          .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2');
        if (Number.isInteger(props.maxValue) && (props.maxValue! < value)) {
          value = props.maxValue!;
          emit('update:modelValue', value);
          emit('input', value);
          return;
        }
        if (Number.isInteger(props.minValue) && (props.minValue! > value || !value)) {
          console.log('asdas');
          value = props.minValue!;
          emit('update:modelValue', value);
          emit('input', value);
          return;
        }
        (input.value as HTMLInputElement).value = value;
      }
      const value = +(input.value as HTMLInputElement).value || '';
      emit('update:modelValue', value);
      emit('input', value);
    };
    const onBlur = () => {
      (input.value as HTMLInputElement).value = props.modelValue.toString();
    };
    return {
      onInput,
      input,
      onBlur,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-input {
  @include setFont("GothamPro", 16px);
  outline: none;
  border-radius: 5px;
  border: 1px solid $border_color;
  background: $white_color;
  width: 80px;
  height: 40px;
  line-height: 28px;
  color: $text_color;
  text-align: center;
}
</style>
