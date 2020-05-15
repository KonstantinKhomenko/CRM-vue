import firebase from "firebase/app";

export default {
  state: {
    info: {},
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("SET_INFO", info);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    info: ({ info }) => info,
  },
};
