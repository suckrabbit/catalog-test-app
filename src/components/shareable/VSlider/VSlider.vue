<template>
  <div class="slider-wrapper">
    <div ref="slider" class="slider">
      <div
        :style="{ left: `${leftPos}%` }"
        :class="{'slider__touch_active': selectedTouch === 'left'}"
        class="slider__touch slider__touch_left"
        @mousedown="setTouch('left', $event)"
        @mouseup="touchDrop"
      />
      <div
        :style="{ left: `${rightPos}%` }"
        class="slider__touch slider__touch_right"
        :class="{'slider__touch_active': selectedTouch === 'right'}"
        @mousedown="setTouch('right', $event)"
        @mouseup="touchDrop"
      />
      <div class="slider__bar" />
      <div
        :style="{ left: `${leftPos}%`, width: `${connectorWidth}%` }"
        :class="{'slider__connect-line_active': selectedTouch}"
        class="slider__connect-line"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { UseSlider } from './UseSlider';

export default defineComponent({
  name: 'VSlider',
  emits: ['update:modelValue'],
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  watch: {
    modelValue: {
      handler(nv) {
        if (this.localChage) return;
        let outwards = false;
        const updatedValue = [...nv];
        if (nv[0] < this.min) {
          outwards = true;
          updatedValue[0] = this.min;
        }
        if (nv[1] > this.max) {
          outwards = true;
          updatedValue[1] = this.max;
        }
        if (outwards) {
          this.$emit('update:modelValue', updatedValue);
        } else {
          this.updatePositions();
        }
      },
      deep: true,
    },
  },
  setup(props, { emit }) {
    return {
      ...UseSlider(props, emit),
    };
  },
});
</script>

<style lang="scss" scoped>
$touch_height: 24px;
$bar_height: 2px;

.slider-wrapper {
  width: 199px;
  padding-left: calc(#{$touch_height} / 2);
  padding-right: calc(#{$touch_height} / 2 + #{$touch_height});
}
.slider {
  display: block;
  position: relative;
  height: $touch_height;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;

  &__touch {
    display: block;
    position: absolute;
    height: $touch_height;
    width: $touch_height;
    z-index: 2;
    background: $primary_color;
    border: 4px solid $white_color;
    border-radius: 50%;
    box-shadow: 0px 5px 10px rgba(86, 86, 86, 0.05);
    cursor: pointer;
    transition: 0.3s;
    &_left {
      transform: translateX(-50%);
    }
    &_right {
      transform: translateX(50%);
    }
    &_active {
      transition: unset;
    }
  }
  &__bar {
    position: absolute;
    width: calc(100% + #{$touch_height});
    top: calc(50% - #{$bar_height} / 2);
    height: $bar_height;
    border-radius: $bar_height;
    z-index: 0;
    overflow: hidden;
    background: $border_color;
  }
  &__connect-line {
    position: absolute;
    height: $bar_height;
    transform: translateX(calc(#{$touch_height} / 2));
    top: calc(50% - #{$bar_height} / 2);
    background: $primary_color;
    transition: 0.3s;
    &_active {
      transition: unset;
    }
  }
}
</style>
