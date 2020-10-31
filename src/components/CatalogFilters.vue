<template>
  <div class="filters">
    <div class="filters-block">
      <p class="filters-block__name">КОМНАТЫ</p>
      <div class="row">
        <VCheckBox v-model="rooomsFilters['S']">S</VCheckBox>
        <VCheckBox v-model="rooomsFilters['1k']">1к</VCheckBox>
        <VCheckBox v-model="rooomsFilters['2k']">2к</VCheckBox>
        <VCheckBox v-model="rooomsFilters['3k']">3к</VCheckBox>
      </div>
    </div>
    <div class="filters-block">
      <p class="filters-block__name">ЭТАЖ</p>
      <div class="row">
        <VInput v-model="floorFilter[0]" :minValue="0" :maxValue="floorFilter[1]" />
        <span style="margin: 0 10px">-</span>
        <VInput v-model="floorFilter[1]" :maxValue="10" :minValue="floorFilter[0]" />
      </div>
      <VSlider v-model="floorFilter" :min="1" :max="100" :step="1" />
    </div>
    <div class="filters-block">
      <p class="filters-block__name">ПЛОЩАДЬ, м<sup>2</sup></p>
      <div class="row">
        <VInput v-model="squareFulter[0]" :minValue="0" :maxValue="squareFulter[1]" />
        <span style="margin: 0 10px">-</span>
        <VInput v-model="squareFulter[1]" :maxValue="10" :minValue="squareFulter[0]" />
      </div>
      <VSlider v-model="squareFulter" :min="10" :max="999" :step="1" />
    </div>
    <div class="filters-block">
      <p class="filters-block__name">СТОИМОСТЬ, млн. р.</p>
      <div class="row">
        <VInput v-model="priceFilter[0]" :minValue="0" :maxValue="priceFilter[1]" />
        <span style="margin: 0 10px">-</span>
        <VInput v-model="priceFilter[1]" :maxValue="100" :minValue="priceFilter[0]" />
      </div>
      <VSlider v-model="priceFilter" :min="1" :max="100" :step="0.1" />
    </div>
    <div class="filters-block">
      <VButton @click="setFilters">ПРИМЕНИТЬ</VButton>
      <p class="filters__clear-btn" @click="resetFilters">сбросить фильтр</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import VSlider from '@/components/shareable/VSlider/VSlider.vue';
import VCheckBox from '@/components/shareable/VCheckBox.vue';
import VButton from '@/components/shareable/VButton.vue';
import VInput from '@/components/shareable/VInput.vue';

export default defineComponent({
  name: '',
  components: {
    VCheckBox,
    VSlider,
    VButton,
    VInput,
  },
  setup() {
    const { state, commit } = useStore();
    const floorFilter = ref<number[]>([...state.filters.floor]);
    const squareFulter = ref<number[]>([...state.filters.square]);
    const priceFilter = ref<number[]>([...state.filters.price]);
    const rooomsFilters = ref({ ...state.filters.rooms });
    const setFilters = () => {
      commit('setFilters', {
        rooms: { ...rooomsFilters.value },
        floor: [...floorFilter.value],
        square: [...squareFulter.value],
        price: [...priceFilter.value],
      });
    };
    const resetFilters = () => {
      commit('resetFilters');
      floorFilter.value = [...state.filters.floor];
      squareFulter.value = [...state.filters.square];
      priceFilter.value = [...state.filters.price];
      rooomsFilters.value = { ...state.filters.rooms };
    };
    return {
      floorFilter,
      squareFulter,
      priceFilter,
      rooomsFilters,
      setFilters,
      resetFilters,
    };
  },
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  width: 100%;
  margin: 50px 0;
  flex-wrap: wrap;
  &-block {
    flex: 1;
    position: relative;
    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__name {
      @include setFont("GothamPro", 12px, bold);
      line-height: 28px;
      margin: 0;
    }
    .row {
      display: flex;
      align-items: center;
    }
  }
  &__clear-btn {
    @include setFont("GothamPro", 10px, bold);
    line-height: 28px;
    text-transform: uppercase;
    color: $text_color;
    cursor: pointer;
    border-bottom: 2px solid $primary_color;
  }
}
</style>
