import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import postModule from "./modules/post";
import actionResponseModule from "./modules/action_response";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    post: postModule,
    actionResponse: actionResponseModule
  },
  plugins: [createPersistedState()]
});
