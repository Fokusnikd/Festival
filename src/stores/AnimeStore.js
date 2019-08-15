import * as fb from 'firebase';
class Anime {
  constructor(title, src = "", promo = false, id = null) {
    this.title = title,
      this.src = src,
      this.promo = promo,
      this.id = id


  }
}
export default {
  state: {
    anime: []
  },
  mutations: {
    createAnime(state, payload) {
      state.anime.push(payload);
    },
    loadAnime(state, payload) {
      state.anime = payload;
    }
  },
  actions: {

    async createAnime({
      commit
    }, payload) {
      commit('cleanError')
      commit('setLoading', true)
      try {
        const newAnime = new Anime(
          payload.title,
          payload.src,
          payload.promo,

        )
        console.log(newAnime)
        const fbValue = await fb.database().ref('anime').push(newAnime)

        commit('createCosplay', {
          ...newAnime,
          id: fbValue.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false)
        throw error
      }

    },
    async fetchAnime({
      commit
    }) {
      commit('cleanError');
      commit('setLoading', true);
      const resultAnime = [];
      try {
        const fbVal = await fb.database().ref('anime').once('value');
        const anime = fbVal.val();
        Object.keys(anime).forEach(key => {
          const ad = anime[key];
          resultAnime.push(
            new Anime(
              ad.title,
              ad.src,
              ad.promo,
              key,
              ad.description)
          );
        });
        commit('loadAnime', resultAnime);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }


    }
  },
  getters: {
    anime(state) {
      return state.anime;
    },
    promoAnime(state) {
      return state.anime.filter(ad => {
        return ad.promo;
      });
    },
    myAnime(state) {
      return state.anime;
    },
    animeById(state) {
      return adId => {
        return state.anime.find(ad => ad.id === adId);
      }
    }
  }
}