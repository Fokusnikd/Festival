import * as fb from 'firebase';
class Anime {
  constructor(title, description, promo = false, src = "", id = null) {
    this.title = title,
      this.description = description,
      this.promo = promo,
      this.src = src,
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

      const image = payload.src;


      try {
        const newAnime = new Anime(
          payload.title,
          payload.description,
          payload.promo,
          ''

        )
        const fbAnime = await fb.database().ref('anime').push(newAnime);

        const imageExt = image.name.slice(image.name.lastIndexOf('.'));

        const fileData = await fb.storage().ref(`anime/${fbAnime.key}.${imageExt}`).put(image)

        const imageSrc = await fileData.ref.getDownloadURL();

        await fb.database().ref('anime').child(fbAnime.key).update({
          src: imageSrc
        })


        commit('createAnime', {
          ...newAnime,
          src: imageSrc,
          id: fbAnime.key,

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
              ad.description,
              ad.promo,
              ad.src,
              key,
            )
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