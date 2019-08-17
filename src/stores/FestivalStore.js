import * as fb from 'firebase';
class Festival {
  constructor(
    title,
    src = "",
    city,
    type,
    description,
    officialPage,
    dataTime,
    id = null,
  ) {
    this.title = title,
      this.src = src,
      this.city = city,
      this.type = type,
      this.description = description,
      this.officialPage = officialPage,
      this.dataTime = dataTime,
      this.id = id
  }
}
export default {
  state: {
    festival: []
  },
  mutations: {
    createFestival(state, payload) {
      state.festival.push(payload);
    },
    loadFestival(state, payload) {
      state.festival = payload;
    }
  },
  actions: {

    async createFestival({
      commit
    }, payload) {
      commit('cleanError')
      commit('setLoading', true)

      const image = payload.src

      try {
        const newFestival = new Festival(
          payload.title,
          '',
          payload.city,
          payload.type,
          payload.description,
          payload.officialPage,
          payload.dataTime,
        )
        const fbFestival = await fb.database().ref('festival').push(newFestival);
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`festival/${fbFestival.key}.${imageExt}`).put(image)
        const imageSrc = await fileData.ref.getDownloadURL();
        await fb.database().ref('festival').child(fbFestival.key).update({
          src: imageSrc
        })

        commit('createFestival', {
          ...newFestival,
          id: fbFestival.key,
          src: imageSrc
        })

        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false)
        throw error
      }

    },
    async fetchFestival({
      commit
    }) {
      commit('cleanError');
      commit('setLoading', true);
      const resultFestival = [];
      try {
        const fbVal = await fb.database().ref('festival').once('value');
        const festival = fbVal.val();
        Object.keys(festival).forEach(key => {
          const ad = festival[key];
          resultFestival.push(
            new Festival(
              ad.title,
              ad.src,
              ad.city,
              ad.type,
              ad.description,
              ad.officialPage,
              ad.dataTime,
              key)
          );
        });

        commit('loadFestival', resultFestival);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }


    }
  },
  getters: {
    festival(state) {
      return state.festival;
    },
    promoFestival(state) {
      return state.festival.filter(ad => {
        return ad.promo;
      });
    },
    festivalById(state) {
      return adId => {
        return state.festival.find(ad => ad.id === adId);
      }
    },
    festivalById2(state) {
      return adId => {
        return state.festival.filter(ad => ad.animeId === adId);
      }
    }
  }
}