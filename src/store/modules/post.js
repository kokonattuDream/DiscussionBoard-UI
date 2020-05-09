import config from "../../config";
import router from "../../router";

export default {
  namespaced: true, 
  state: {
    posts: [],
    current_post: ""
  },

  getters: {
    posts: state => state.posts,
    current_post: state => state.current_post
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
          console.log(router.currentRoute.path);
          if (router.currentRoute.path != "/post") {
            router.push("/post");
          }
        } else {
          console.error(data.statusText);
          context.commit("showError", data.statusText);
        }
      } catch (error) {
        console.error(error);
        context.commit("showError", error);
      }
    },
    async addReply(context, reply) {
      console.log(reply);
      try {
        let res = await fetch(config.backend_API + "/replies", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply)
        });

        if (res.status >= 200 && res.status < 300) {
          console.log(reply.post);
          context.dispatch("getPost", reply.post);
        } else {
          console.error(res.statusText);
          context.commit("showError", res.statusText);
        }
      } catch (error) {
        console.log("getPost fail");
        console.error(error);
        context.commit("showError", error);
      }
    }
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.current_post = post;
    }
  }
};
