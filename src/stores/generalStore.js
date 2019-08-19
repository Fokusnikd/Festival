export default {
  state: {
    loading: false,
    error: null,
    typeOfPerformance: ['cosplay', 'dance', 'vocal'],
    typeOfFestival: ['Cons', 'Xz', 'Garage'],
    cities: ['Воронеж', 'Ростов', 'Москва', 'Киев', 'Ижевск'],
    typeOfMember: ['Троль', 'Лжец', 'Девственник']
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    cleanError(state) {
      state.error = null;
    }
  },
  actions: {
    setLoading({
      commit
    }, payload) {
      commit('setLoading', payload);
    },
    setError({
      commit
    }, payload) {
      commit('setError', payload);
    },
    cleanError({
      commit
    }) {
      commit('cleanError');
    }
  },
  getters: {
    cities(state) {
      return state.cities;
    },
    typeOfPerformance(state) {
      return state.typeOfPerformance;
    },
    typeOfMember(state) {
      return state.typeOfMember;
    },
    typeOfFestival(state) {
      return state.typeOfFestival;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
}