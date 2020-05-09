<template>
  <div class="home">
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
