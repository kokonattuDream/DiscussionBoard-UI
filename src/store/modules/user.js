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
      try {
        let data = await fetch(config.backendAPI + "/user-session", {
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
          console.log(res);
          context.commit("setUser", res.user);
          router.push("/");

          setInterval(() => {
            context.commit("clearUser");
          }, 30 * 60 * 1000);
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/loginError", "Login Failed", {
          root: true
        });
      }
    },
    async register(context, registerData) {
      try {
        let data = await fetch(config.backendAPI + "/users", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData)
        });
        let res = await data.json();
        if (res.user) {
          context.commit("setUser", res.user);
          router.push("/");

          setInterval(() => {
            context.commit("clearUser");
          }, 30 * 60 * 1000);
        } else {
          context.commit("actionResponse/registerError", "Register Failed", {
            root: true
          });
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/registerError", "Register Failed", {
          root: true
        });
      }
    },
    async logout(context) {
      try {
        await fetch(config.backendAPI + "/user-session/", {
          credentials: "include",
          method: "delete"
        });
        context.commit("clearUser");
        localStorage.clear();
      } catch (error) {
        console.error(error);
      }
      
      window.location.reload();
      
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
