import config from "../../config";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    posts: [],
    current_post: "",
    display_posts: []
  },

  getters: {
    posts: state => state.posts,
    display_posts: state => state.display_posts,
    current_post: state => state.current_post
  },

  actions: {
    async searchPosts(context, form) {
      context.commit("setDisplayPosts", form);
    },
    async getAllPosts(context) {
      try {
        let data = await fetch(config.backend_API + "/posts", {
          method: "get",
          credentials: "include"
        });
        let res = await data.json();
        console.log(res);
        context.commit("setPosts", res.posts);
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/getAllPostsError", "Get Posts Failed", {
          root: true
        });
      }
    },
    async createNewPost(context, form) {
      context.commit("actionResponse/runSpinner", null, { root: true });
      //console.log(form);
      const data = new FormData();
      data.append("file", form.image);
      data.append("data", JSON.stringify(form.data));
      try {
        let res = await fetch(config.backend_API + "/posts", {
          method: "post",
          header: {
            "Content-Type": "multipart/form-data"
          },
          credentials: "include",
          body: data //JSON.stringify(data)
        });

        if (res.status >= 200 && res.status < 300) {
          context.commit("actionResponse/endSpinner", null, { root: true });
          router.push("/");
        } else {
          console.error(res.statusText);
          context.commit(
            "actionResponse/createPostError",
            "Create Post Failed",
            {
              root: true
            }
          );
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/createPostError", "Post Submit Failed", {
          root: true
        });
      }
    },
    async getPost(context, id) {
      console.log(id);
      try {
        let data = await fetch(config.backend_API + "/post/" + id, {
          credentials: "include",
          method: "get"
        });
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
          context.commit("actionResponse/getPostError", "Post Not Found", {
            root: true
          });
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/getPostError", "Post Not Found", {
          root: true
        });
      }
    },
    async addReply(context, reply) {
      console.log(reply);
      try {
        let res = await fetch(config.backend_API + "/replies", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply)
        });

        if (res.status >= 200 && res.status < 300) {
          console.log(reply.post);
          context.dispatch("getPost", reply.post);
        } else {
          console.error(res.statusText);
          context.commit("actionResponse/addReplayError", "Adde Reply Failed", {
            root: true
          });
        }
      } catch (error) {
        console.log("getPost fail");
        console.error(error);
        context.commit("actionResponse/addReplayError", "Adde Reply Failed", {
          root: true
        });
      }
    }
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
      state.display_posts = posts;
      console.log(state.display_posts);
    },
    setPost(state, post) {
      state.current_post = post;
    },
    setDisplayPosts(state, form) {
      let posts = state.posts;
      if (form.category) {
        posts = posts.filter(post => post.category === form.category);
      }
      if (form.region) {
        posts = posts.filter(post => post.region === form.region);
      }
      if (form.keyword) {
        const regex = new RegExp(form.keyword, "i");
        posts = posts.filter(post => {
          return post.title.match(regex) || post.text.match(regex);
        });
      }
      console.log(posts);
      console.log(state.posts);
      state.display_posts = posts;
    }
  }
};
