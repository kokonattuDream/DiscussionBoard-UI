import config from "../../config";
import router from "../../router";

export default {
  namespaced: true, 
  state: {
    user: ""
  },

  getters: {
    user: state => state.user
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
        console.error(error);
        context.commit("showError", error);
      }
    },
    async register(context, registerData) {
      try {
        let data = await fetch(config.backend_API + "/users", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData)
        });
        let res = await data.json();
        console.log(res);
        context.commit("setUser", res.user);
        router.push("/");
      } catch (error) {
        console.error(error);
        context.commit("showError", error);
      }
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
};
