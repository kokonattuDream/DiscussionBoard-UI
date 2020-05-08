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
    posts: [],
    current_post: ""
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
    },
    setPost(state, post) {
      state.current_post = post;
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
        console.error(error);
        context.commit("showError", error);
      }
    },
    async createNewPost(context, data) {
      console.log(data);
      try {
        let res = await fetch(config.backend_API + "/posts", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.status >= 200 && res.status < 300) {
          router.push("/");
        } else {
          console.error(res.statusText);
          context.commit("showError", res.statusText);
        }
      } catch (error) {
        console.error(error);
        context.commit("showError", error);
      }
    },
    async getPost(context, id) {
      console.log(id);
      try {
        let data = await fetch(config.backend_API + "/post/" + id);
        let res = await data.json();
        console.log(res);
        context.commit("setPost", res.post);

        if (res) {
          router.push("/post");
        } else {
          console.error(data.statusText);
          context.commit("showError", data.statusText);
        }
      } catch (error) {
        console.error(error);
        context.commit("showError", error);
      }
    },
    async submitReply(context, reply){
      console.log(reply);
      try {
        let data = await fetch(config.backend_API + "/replies", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply)
        });
        console.log(data);
        let res = await data.json();
        if (res.status >= 200 && res.status < 300) {
          console.log(reply.post);
          context.commit("getPost", reply.post);
        } else {
          console.error(res.statusText);
          context.commit("showError", res.statusText);
        }
      } catch (error) {
        console.error(error);
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
        context.commit("setUser", res.user);
        router.push("/");
      } catch (error) {
        console.error(error);
        context.commit("showError", error);
      }
    }
  },
  modules: {
    error: errorSystem
  }
});
