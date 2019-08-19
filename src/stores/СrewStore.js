import * as fb from 'firebase';
class Crew {
  constructor(
    title,
    description,
    contacts,
    memberId,
    id = null) {
    this.title = title,
      this.description = description,
      this.contacts = contacts,
      this.memberId = memberId,
      this.id = id
  }
}
export default {
  state: {
    crew: []
  },
  mutations: {
    createCrew(state, payload) {
      state.crew.push(payload);


    },
    loadCrew(state, payload) {
      state.crew = payload;
    }
  },
  actions: {

    async createCrew({
      commit
    }, payload) {
      commit('cleanError');
      commit('setLoading', true);

      try {
        const newCrew = new Crew(
          payload.title,
          payload.description,
          payload.contacts,
          payload.memberId
        )
        const fbCrew = await fb.database().ref('crew').push(newCrew);


        commit('createCrew', {
          ...newCrew,
          id: fbCrew.key
        })

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false);
        throw error;
      }

    },
    async fetchCrew({
      commit
    }) {
      commit('cleanError');
      commit('setLoading', true);
      const resultCrew = [];
      try {
        const fbVal = await fb.database().ref('crew').once('value');
        const crew = fbVal.val();
        Object.keys(crew).forEach(key => {
          const ad = crew[key];
          resultCrew.push(
            new Crew(
              ad.title,
              ad.description,
              ad.contacts,
              ad.memberId,
              key)
          );
        });

        commit('loadCrew', resultCrew);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    }
  },
  getters: {
    crew(state) {
      return state.crew;
    }
  },
  crewById(state) {
    return adId => {
      console.log(state.crew.find(ad => ad.id === adId))
      return state.crew.find(ad => ad.id === adId);
    }
  }
};