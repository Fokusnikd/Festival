import * as fb from 'firebase';
class Cosplay {
  constructor(title, src = "", animeId, id = null, ) {
    this.title = title,
      this.src = src,
      this.animeId = animeId,
      this.id = id

  }
}
export default {
  state: {
    cosplay: []
  },
  mutations: {
    createCosplay(state, payload) {
      state.cosplay.push(payload);
    },
    loadCosplay(state, payload) {
      state.cosplay = payload;

    }
  },
  actions: {

    async createCosplay({
      commit
    }, payload) {
      commit('cleanError')
      commit('setLoading', true)
      try {
        const newCosplay = new Cosplay(
          payload.title,
          payload.src,
          payload.animeId
        )
        const fbValue = await fb.database().ref('cosplay').push(newCosplay)

        commit('createCosplay', {
          ...newCosplay,
          id: fbValue.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false)
        throw error
      }

    },
    async fetchCosplay({
      commit
    }) {
      commit('cleanError');
      commit('setLoading', true);
      const resultCosplay = [];
      try {
        const fbVal = await fb.database().ref('cosplay').once('value');
        const cosplay = fbVal.val();
        Object.keys(cosplay).forEach(key => {
          const ad = cosplay[key];
          resultCosplay.push(
            new Cosplay(
              ad.title,
              ad.src,
              ad.animeId,
              key)
          );
        });

        commit('loadCosplay', resultCosplay);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }


    }
  },
  getters: {
    cosplay(state) {
      return state.cosplay;
    },
    promoCosplay(state) {
      return state.cosplay.filter(ad => {
        return ad.promo;
      });
    },
    myCosplay(state) {
      return state.cosplay;
    },
    cosplayById(state) {
      return adId => {
        return state.cosplay.find(ad => ad.id === adId);
      }
    },
    cosplayById2(state) {
      return adId => {
        return state.cosplay.find(ad => ad.animeId === adId);
      }
    }
  }
}