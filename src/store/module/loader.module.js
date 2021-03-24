const state = {
  isLoading: true
};

const getters = {
  isLoading: state => state.isLoading
};

const mutations = {
  setLoading: (state, bool) => {
    state.isLoading = bool;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
