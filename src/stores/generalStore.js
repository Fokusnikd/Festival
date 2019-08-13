export default {
  state: {
    loading: false,
    error: null
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
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
}