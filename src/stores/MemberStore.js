import * as fb from 'firebase';
class Member {
  constructor(
    nickname,
    city,
    type,
    description,
    officialPage,
    src = "",
    id = null) {
    this.nickname = nickname,
      this.city = city,
      this.type = type,
      this.description = description,
      this.officialPage = officialPage,
      this.src = src,
      this.id = id
  }
}
export default {
  state: {
    member: []
  },
  mutations: {
    createMember(state, payload) {
      state.member.push(payload);
    },
    loadMember(state, payload) {
      state.member = payload;
    }
  },
  actions: {

    async createMember({
      commit
    }, payload) {
      commit('cleanError');
      commit('setLoading', true);
      const image = payload.src;

      try {
        const newMember = new Member(
          payload.nickname,
          payload.city,
          payload.type,
          payload.description,
          payload.officialPage,
          ''
        );
        console.log(1)
        const fbMember = await fb.database().ref('member').push(newMember);
        console.log(2)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'));
        console.log(3)
        const fileData = await fb.storage().ref(`member/${fbMember.key}.${imageExt}`).put(image)
        console.log(4)
        const imageSrc = await fileData.ref.getDownloadURL();
        console.log(5)
        await fb.database().ref('member').child(fbMember.key).update({
          src: imageSrc
        })


        commit('createMember', {
          ...newMember,
          src: imageSrc,
          id: fbMember.key
        })

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.mesage);
        commit('setLoading', false);
        throw error;
      }

    },
    async fetchMember({
      commit
    }) {
      commit('cleanError');
      commit('setLoading', true);
      const resultMember = [];
      try {
        const fbVal = await fb.database().ref('member').once('value');
        const member = fbVal.val();
        Object.keys(member).forEach(key => {
          const ad = member[key];
          resultMember.push(
            new Member(
              ad.nickname,
              ad.src,
              ad.city,
              ad.type,
              ad.description,
              ad.officialPage,
              key)
          );
        });

        commit('loadMember', resultMember);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    }
  },
  getters: {
    member(state) {
      return state.member;
    },

    memberById(state) {
      return adId => {
        return state.member.find(ad => ad.id === adId);
      };
    },
  }
};