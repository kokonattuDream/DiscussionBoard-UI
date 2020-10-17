import config from "../../config";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    posts: [],
    currentPost: "",
    displayPosts: [],
    pageNumber: 1
  },

  getters: {
    posts: state => state.posts,
    displayPosts: state => state.displayPosts,
    currentPost: state => state.currentPost,
    pageNumber: state => state.pageNumber
  },

  actions: {
    async setPageNumber(context, num) {
      context.commit("setPageNumber", num);
    },
    async searchPosts(context, form) {
      context.commit("setDisplayPosts", form);
    },
    async getAllPosts(context) {
      try {
        let data = await fetch(config.backendAPI + "/posts", {
          method: "get",
          credentials: "include"
        });
        let res = await data.json();
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

      const data = new FormData();
      data.append("file", form.image);
      data.append("data", JSON.stringify(form.data));
      try {
        let res = await fetch(config.backendAPI + "/posts", {
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
      try {
        let data = await fetch(config.backendAPI + "/posts/" + id, {
          credentials: "include",
          method: "get"
        });
        let res = await data.json();
        context.commit("setPost", res.post);

        if (res) {
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
      try {
        let res = await fetch(config.backendAPI + "/replies", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply)
        });

        if (res.status >= 200 && res.status < 300) {
          context.dispatch("getPost", reply.post);
        } else {
          console.error(res.statusText);
          context.commit(
            "actionResponse/addReplayError",
            "Reply Submit Failed",
            {
              root: true
            }
          );
        }
      } catch (error) {
        console.error(error);
        context.commit("actionResponse/addReplayError", "Adde Reply Failed", {
          root: true
        });
      }
    }
  },

  mutations: {
    setPageNumber(state, num) {
      state.pageNumber = num;
    },
    setPosts(state, posts) {
      state.posts = posts;
      state.displayPosts = posts;
    },
    setPost(state, post) {
      state.currentPost = post;
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
      state.displayPosts = posts;
      state.pageNumber = 1;
    }
  }
};
