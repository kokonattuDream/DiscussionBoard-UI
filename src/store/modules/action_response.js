const state = () => ({
  show: false,
  text: "Error",
  post_submission_loading: false
});

const mutations = {
  showError(state, message) {
    state.show = true;
    state.text = message;
    state.post_submission_loading = false;
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
