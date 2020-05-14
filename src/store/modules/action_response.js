const state = () => ({
  create_post_error: "",
  get_post_error: "",
  get_all_posts_error: "",
  add_reply_error: "",
  register_error: "",
  login_error: "",
  post_submission_loading: false
});

const mutations = {
  async registerError(state, message){
    state.register_error = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.register_error = "";
  },
  async loginError(state, message){
    state.login_error = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.login_error = "";
  },
  async getAllPostsError(state, message){
    state.get_all_posts_error = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.get_all_posts_error = "";
  },
  async createPostError(state, message){
    state.create_post_error = message;
    state.post_submission_loading = false;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.create_post_error = "";
  },
  async getPostError(state, message){
    state.get_post_error = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.get_post_error = "";
  },
  async addReplayError(state, message){
    state.add_reply_error = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.add_reply_error = "";
  },
  runSpinner(state) {
    state.post_submission_loading = true;
  },
  endSpinner(state){
    state.post_submission_loading = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
