import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from '../config';

Vue.use(Vuex);

const errorSystem = {
  state: {
    show: false,
    text: "Error"
  },
  mutations: {
    showError(state, message) {
      state.show = true;
      state.text = message;
    }
  }
};

export default new Vuex.Store({
  state: {
    user: ""
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async signIn(context){
      try {
        const user = (await axios.get(config.backend_API + "/user-session"))
          .data;
        context.commit("setUser", user);
      } catch (error) {
        context.commit("showError", error);
      }
    }
  },
  modules: {
    error: errorSystem
  }
});
