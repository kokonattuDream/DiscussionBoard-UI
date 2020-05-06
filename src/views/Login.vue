<template>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
      <b-form @submit="onSubmit">
        <b-form-group
          id="username-input"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="username"
            required
            placeholder="Enter Username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-input"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form-group>
        <div class="row justify-content-between">
          <div class="col-6">
            <b-button type="submit" variant="success">Submit</b-button>
          </div>
          <div class="col-6">
            <b-button type="reset" variant="secondary" @click="toRegister">
              Register
            </b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password
      });
    },
    toRegister() {
      this.$router.push("Register");
    }
  }
};
</script>
