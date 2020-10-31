<template>
  <div class="app">
    <main class="main container">
      <h1 class="title">Lorem ipsum dolor sit</h1>
      <CatalogFilters />
      <ul class="catalog-list">
        <CatalogCardItem v-for="item in catalog" :key="item.id" :item="item" />
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CatalogCardItem from '@/components/CatalogCardItem.vue';
import CatalogFilters from '@/components/CatalogFilters.vue';

export default defineComponent({
  name: 'App',
  components: {
    CatalogCardItem,
    CatalogFilters,
  },
  setup() {
    const { getters, dispatch } = useStore();
    dispatch('getCatalog');

    const catalog = computed(() => getters.catalog);

    const sliderValues = ref<number[]>([0, 10]);
    const chechBoxValue = ref(false);
    return { sliderValues, chechBoxValue, catalog };
  },
});
</script>

<style lang="scss">
@import "~@/assets/scss/normalize.scss";
@import "~@/assets/scss/styles.scss";
</style>
