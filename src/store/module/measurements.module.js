import api from "@/helpers/api";
import { pusher } from "@/plugins/pusher";
// eslint-disable-next-line no-unused-vars
import { isToday, isThisMonth, isThisYear, parseISO, format } from "date-fns";

const state = {
  isLoading: true,
  measurements: [],
  error: ""
};

const getters = {
  measurements: state => state.measurements
};

const mutations = {
  updateMeasurements(state, measurements) {
    state.measurements.forEach((node, index) => {
      state.measurements[index].data.push({
        x: measurements[index].x,
        y: parseFloat(measurements[index].y)
      });
    });
  },

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
  getMeasurements({ commit }, { date = null, scale = "day" }) {
    pusher.unsubscribe("measurements");

    commit("loader/setLoading", true, { root: true });

    let URL = "/api/measurement/";

    const parsedDate = date === null ? null : parseISO(date);

    if (
      date === null ||
      (scale === "month" && isThisMonth(parsedDate)) ||
      (scale === "year" && isThisYear(parsedDate))
    ) {
      var channel = pusher.subscribe("measurements");

      channel.bind("newMeasurement", function(data) {
        commit("updateMeasurements", data.measurement);
      });
    }

    if (date && scale === "day") {
      URL = URL + "day";
    } else if (scale === "month") {
      URL = URL + "month";
    } else if (scale === "year") {
      URL = URL + "year";
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
