<template>
  <div class="home">
    <div v-if="user" class="text-center">Welcome back {{ user.username }}</div>
    <img alt="Vue logo" width="20%" height="20%" src="../assets/logo.png" />
    <Board />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Board from "../components/Board";
export default {
  name: "Home",
  components: {
    Board
  },
  computed: mapState({
    user: state => state.user.user
  })
};
</script>
