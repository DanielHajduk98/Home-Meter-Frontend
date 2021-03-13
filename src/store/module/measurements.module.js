import api from "@/helpers/api";

const namespaced = true;

const state = {
  measurements: {},
  isLoading: true,
  error: ""
};

const getters = {
  getMeasurements: state => state.measurements,

  getLoading: state => state.isLoading
};

const mutations = {
  setMeasurements(state, measurements) {
    state.measurements = measurements;
    state.isLoading = false;
  },
  error(state, error) {
    state.error = error;
    state.isLoading = false;
  }
};

const actions = {
  fetchMeasurements({ commit }) {
    return new Promise((resolve, reject) => {
      api({
        url: `measurement/`,
        method: "GET"
      })
        .then(resp => {
          commit("setMeasurements", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("error", err);
          reject(err);
        });
    });
  }
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters
};
