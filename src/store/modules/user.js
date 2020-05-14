import config from "../../config";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    user: "",
    showingError: false
  },

  getters: {
    user: state => state.user,
    showingError: state => state.showingError
  },

  actions: {
    async signIn(context, signInData) {
      console.log(signInData);
      try {
        let data = await fetch(config.backend_API + "/user-session", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(signInData)
        });
        let res = await data.json();
        if (!res.user) {
          context.commit("actionResponse/loginError", "Login Failed", {
            root: true
          });
        } else {
          context.commit("setUser", res.user);
          if (context.rootState.actionResponse.login_error) {
            context.commit("actionResponse/resetError", "login_error", {
              root: true
            });
          }
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/loginError", error, { root: true });
      }
    },
    async register(context, registerData) {
      try {
        let data = await fetch(config.backend_API + "/users", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData)
        });
        let res = await data.json();
        if (res.user) {
          context.commit("setUser", res.user);
          if (context.rootState.actionResponse.register_error) {
            context.commit("actionResponse/resetError", "register_error", {
              root: true
            });
          }
          router.push("/");
        } else {
          context.commit("actionResponse/registerError", "Register Failed", {
            root: true
          });
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/registerError", error, { root: true });
      }
    },
    async logout(context) {
      try {
        let res = await fetch(config.backend_API + "/user-session/", {
          credentials: "include",
          method: "delete"
        });

        if (res.status >= 200 && res.status < 300) {
          context.commit("clearUser");
        } else {
          context.commit("actionResponse/registerError", res.statusText, {
            root: true
          });
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/registerError", error, { root: true });
      }
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  }
};
