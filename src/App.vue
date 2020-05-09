<template>
  <div id="app">
    <div id="nav" class="row">

      <div class="col-xl-12">
        <b-navbar toggleable="lg" type="light" variant="success">
          <b-nav>
            <b-nav-item to="/">
              <span>
                Home
              </span>
            </b-nav-item>
            <b-nav-item v-if="!user" to="/login">
              <span>
                Login/Register
              </span>
            </b-nav-item>
            <b-nav-item v-if="user" to="/" @click="logout">
              <span>
                Log out
              </span>
            </b-nav-item>
          </b-nav>
        </b-navbar>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

span {
  color: black;
  font-size: 20px;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState("user", {
    user: state => state.user
  }),
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>
