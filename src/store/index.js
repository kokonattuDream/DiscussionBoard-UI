import Vue from "vue";
import Vuex from "vuex";
import config from "../config";
import router from "../router";

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
    async signIn(context, signInData) {
      console.log(signInData);
      try {
        let data = await fetch(config.backend_API + "/user-session", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInData)
        });
        let res = await data.json();
        console.log(res.user);
        context.commit("setUser", res.user);
        router.push("/");
      } catch (error) {
        context.commit("showError", error);
      }
    },
    async register(context, registerData) {
      try {
        let data = await fetch(config.backend_API + "/users", {
          method: "post",
          body: registerData
        });
        let res = await data.json();
        context.commit("setUser", res.user);
        router.push("/");
      } catch (error) {
        context.commit("showError", error);
      }
    }
  },
  modules: {
    error: errorSystem
  }
});
