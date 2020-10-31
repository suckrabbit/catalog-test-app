<template>
  <li class="catalog-item">
    <div class="item-details">
      <span style="opacity:0.5" class="detail-item">{{item.floor}} этаж</span>
      <span style="margin-left:auto" class="detail-item">{{romms}}</span>
      <span style="opacity:0.5" class="detail-item"> - </span>
      <span class="detail-item">{{item.square}}м<sup>2</sup></span>
    </div>
    <div class="catalog-item__preview">
      <div class="catalog-item__number">№{{item.number}}</div>
      <div class="catalog-item__image" />
      <!-- <img src="~@/assets/image.png" alt="" class="catalog-item__image"> -->
    </div>
    <div class="item-price">
      <p class="item-price__full-price">{{item.price_full}}р.</p>
      <span class="item-price__meter-price">{{pricePerMeter}}р. за м<sup>2</sup></span>
    </div>
    <VButton class="catalog-item__btn">ПОДРОБНЕЕ</VButton>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import VButton from '@/components/shareable/VButton.vue';

interface Item {
  id: number;
  floor: number;
  number: number;
  rooms: number;
  square: number;
  plan: string;
  price_full: number;
  [key: string]: any;
}

export default defineComponent({
  name: 'CatalogCardItem',
  components: {
    VButton,
  },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
    // required: () => true,
  },
  setup(props) {
    const pricePerMeter = computed(() => Math.round(props.item.price_full / props.item.square));
    const romms = computed(() => {
      const { rooms } = props.item;
      if (rooms === 1) {
        return `${rooms} комната`;
      } if ((rooms > 1) && (rooms < 5)) {
        return `${rooms} комнаты`;
      } if (rooms > 5) {
        return `${rooms} комнат`;
      }
      return '';
    });
    return { pricePerMeter, romms };
  },
});
</script>

<style lang="scss" scoped>
.catalog-item {
  list-style: none;
  height: 365px;
  width: 270px;
  background-color: $white_color;
  box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05);
  border-radius: 10px;
  padding: 10px;
  transition: box-shadow 0.5s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .item-details {
    display: flex;
    margin-bottom: 4px;
    line-height: 28px;
    @include setFont("GothamPro", 12px, bold);
    .detail-item {
      margin: 0 5px;
    }
  }
  &__preview {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid $border_light_color;
    border-radius: 5px;
  }
  &__number {
    margin-left: auto;
    border-bottom: 1px solid $border_light_color;
    border-left: 1px solid $border_light_color;
    height: 30px;
    border-radius: 0px 5px;
    line-height: 28px;
    padding: 0 10px;
    @include setFont("GothamPro", 14px, bold);
  }
  &__image {
    flex: 1;
    margin: 5px;
    background: url("~@/assets/image.png") no-repeat center;
    background-size: contain;
  }
  .item-price {
    margin-left: auto;
    margin-top: 10px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__full-price {
      @include setFont("GothamPro", 20px, bold);
      margin: 0;
      line-height: 28px;
    }
    &__meter-price {
      opacity: 0.5;
      @include setFont("GothamPro", 12px, bold);
      margin: 0;
      line-height: 28px;
    }
  }
  &:hover {
    box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.25);
    .catalog-item__btn {
      height: 40px;
      visibility: visible;
      margin-top: 10px;
    }
  }
  &__btn {
    width: 100%;
    position: relative;
    top: 1px;
    height: 0;
    visibility: hidden;
    transition: 0.3s linear;
  }
}
</style>
