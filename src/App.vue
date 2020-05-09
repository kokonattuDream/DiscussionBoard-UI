<template>
  <div id="app">
    <div id="nav" class="row">
      <div class="col-xl-12">
        <b-navbar toggleable="lg" type="light" variant="success">
          <b-navbar-brand>Virtual Canada Board</b-navbar-brand>
          <b-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item v-if="!user" to="/login">Login/Register</b-nav-item>
            <b-nav-item v-if="user" to="/login">Log out</b-nav-item>
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
</style>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState("user",{
    user: state => state.user
  })
};
</script>
