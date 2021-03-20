import api from "@/helpers/api";

const state = {
  temperature: [],
  movement: [],
  air_pressure: [],
  humidity: [],
  luminosity: [],
  heatIndex: [],
  isLoading: true,
  error: ""
};

const getters = {
  temperature: state => state.temperature,
  movement: state => state.movement,
  air_pressure: state => state.air_pressure,
  humidity: state => state.humidity,
  luminosity: state => state.luminosity,
  heatIndex: state => state.heatIndex,
  getLoading: state => state.isLoading
};

const mutations = {
  setMeasurements(state, measurements) {
    state.temperature = measurements[0];
    state.movement = measurements[1];
    state.luminosity = measurements[2];
    state.air_pressure = measurements[3];
    state.humidity = measurements[4];
    state.heatIndex = measurements[5];

    state.isLoading = false;
  },
  error(state, error) {
    state.error = error;
    state.isLoading = false;
  }
};

const actions = {
  getMeasurements({ commit }, { date = null, scale = "day" }) {
    commit("loader/setLoading", true, { root: true });

    let URL = "measurement/";

    if (date && scale === "day") {
      URL = URL + "day";
    } else if (scale === "month") {
      URL = URL + "month";
    }

    return new Promise((resolve, reject) => {
      api({
        url: URL,
        method: "GET",
        params: {
          date: date
        }
      })
        .then(resp => {
          commit("loader/setLoading", false, { root: true });
          commit("setMeasurements", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("loader/setLoading", false, { root: true });
          commit("error", err);
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
};
