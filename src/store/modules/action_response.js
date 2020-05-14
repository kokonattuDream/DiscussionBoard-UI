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
  resetError(state, error_type) {
    state[error_type] = "";
    state[error_type] = "";
    state[error_type] = "";
    state[error_type] = "";
    state[error_type] = "";
    state[error_type] = "";
  },
  registerError(state, message){
    state.register_error = message;
  },
  loginError(state, message){
    state.login_error = message;
  },
  getAllPostsError(state, message){
    state.get_all_posts_error = message;
  },
  createPostError(state, message){
    state.create_post_error = message;
    state.post_submission_loading = false;
  },
  getPostError(state, message){
    state.get_post_error = message;
  },
  addReplayError(state, message){
    state.add_reply_error = message;
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
