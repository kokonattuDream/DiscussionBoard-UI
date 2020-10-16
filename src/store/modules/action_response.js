const state = () => ({
  createPostError: "",
  getPostError: "",
  getAllPostsError: "",
  addReplyError: "",
  registerError: "",
  loginError: "",
  postSubmissionLoading: false
});

const mutations = {
  async registerError(state, message){
    state.registerError = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.registerError = "";
  },
  async loginError(state, message){
    state.loginError = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.loginError = "";
  },
  async getAllPostsError(state, message){
    state.getAllPostsError = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.getAllPostsError = "";
  },
  async createPostError(state, message){
    state.createPostError = message;
    state.postSubmissionLoading = false;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.createPostError = "";
  },
  async getPostError(state, message){
    state.getPostError = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.getPostError = "";
  },
  async addReplayError(state, message){
    state.addReplyError = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    state.addReplyError = "";
  },
  runSpinner(state) {
    state.postSubmissionLoading = true;
  },
  endSpinner(state){
    state.postSubmissionLoading = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
