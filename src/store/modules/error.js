const state = () => ({
  show: false,
  text: "Error"
});

const mutations ={
  showError(state, message) {
    state.show = true;
    state.text = message;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
