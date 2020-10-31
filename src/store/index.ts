import { createStore } from 'vuex';

import catalog from '@/mocks/data.json';

interface Item {
  floor: number;
  rooms: number;
  square: number;
  short: string;
  price_full: number;
  [key: string]: any;
}

const initialfilters = {
  rooms: {
    S: false,
    '1k': false,
    '2k': false,
    '3k': false,
  },
  floor: [1, 99],
  square: [1, 999],
  price: [1, 100],
};
export default createStore({
  state: {
    filters: { ...initialfilters, rooms: { ...initialfilters.rooms } },
    catalog: [],
  },
  getters: {
    catalog(state) {
      const roomsArr = Object.entries(state.filters.rooms)
        .filter(([key, value]) => value)
        .map(([key]) => key);
      const result = state.catalog.filter((item: Item) => {
        if (roomsArr.length && !roomsArr.includes(item.short)) return false;
        return (item.floor >= state.filters.floor[0] && item.floor <= state.filters.floor[1])
        && (item.square >= state.filters.square[0] && item.square <= state.filters.square[1])
        && (
          item.price_full / 1000000 >= state.filters.price[0]
          && item.price_full / 1000000 <= state.filters.price[1]
        );
      });
      return result;
    },
  },
  mutations: {
    setCatalog(state, payload) {
      state.catalog = payload;
    },
    resetFilters(state) {
      state.filters = { ...initialfilters, rooms: { ...initialfilters.rooms } };
    },
    setFilters(state, payload) {
      state.filters = { ...payload, rooms: { ...payload.rooms } };
    },
  },
  actions: {
    getCatalog({ commit }) {
      Promise.resolve(catalog).then((res) => commit('setCatalog', res));
    },
  },
});
