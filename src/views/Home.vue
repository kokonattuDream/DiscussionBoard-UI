<template>
  <div class="home">
    <div v-if="user" class="text-center">
      Welcome back {{ $store.getters.user.username }}
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
  },
  computed: mapState({
    user: state => state.user
  })
};
</script>
