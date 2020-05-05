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
    user: "",
    posts: []
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    async getAllPosts(context) {
      try {
        let data = await fetch(config.backend_API + "/posts");
        let res = await data.json();
        console.log(res);
        context.commit("setPosts", res.posts);
      } catch (error) {
        context.commit("showError", error);
      }
    },
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData)
        });
        let res = await data.json();
        context.commit("setUser", res.user);
        router.push("/");
      } catch (error) {
        context.commit("showError", error);
      }
    },
    async createNewPost(context, data){
      console.log(data);
      try{
        let res = await fetch(config.backend_API + "/users", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if(res.status >= 200 && res.status < 300){
          router.push("/");
        } else {
          context.commit("showError", res.statusText);
        }
      } catch (error){
        context.commit("showError", error);
      }
    } 
  },
  modules: {
    error: errorSystem
  }
});
