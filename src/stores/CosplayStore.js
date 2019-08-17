import * as fb from 'firebase';
class Cosplay {
  constructor(
    title,
    src = "",
    animeId,
    city,
    type,
    description,
    videoSrc,
    dataTime,
    festivalId,
    crew,
    id = null, ) {
    this.title = title,
      this.src = src,
      this.animeId = animeId,
      this.city = city,
      this.type = type,
      this.description = description,
      this.videoSrc = videoSrc,
      this.dataTime = dataTime,
      this.festivalId = festivalId,
      this.crew = crew,
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

      const image = payload.src;

      try {
        const newCosplay = new Cosplay(
          payload.title,
          '',
          payload.animeId,
          payload.city,
          payload.type,
          payload.description,
          payload.videoSrc,
          payload.dataTime,
          payload.festivalId,
          payload.crew
        )
        const fbCosplay = await fb.database().ref('cosplay').push(newCosplay);
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`cosplay/${fbCosplay.key}.${imageExt}`).put(image)
        const imageSrc = await fileData.ref.getDownloadURL();
        await fb.database().ref('cosplay').child(fbCosplay.key).update({
          src: imageSrc
        })

        commit('createCosplay', {
          ...newCosplay,
          id: fbCosplay.key,
          src: imageSrc
        })

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false);
        throw error;
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
              ad.city,
              ad.type,
              ad.description,
              ad.videoSrc,
              ad.dataTime,
              ad.festivalId,
              ad.crew, key)
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
    cosplayById(state) {
      return adId => {
        return state.cosplay.find(ad => ad.id === adId);
      }
    },
    cosplayById2(state) {
      return adId => {
        return state.cosplay.filter(ad => ad.animeId === adId);
      }
    }
  }
}