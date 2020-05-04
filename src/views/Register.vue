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
            v-model="form.username"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-input"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            aria-describedby="input-2-live-feedback"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-input2"
          label="Confirm Password:"
          label-for="password"
        >
          <b-form-input
            id="confirm_password"
            v-model="form.confirm_password"
            type="password"
            required
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form-group>

        <div class="row justify-content-between">
          <div class="col-6">
            <b-button type="submit" variant="success">Register</b-button>
          </div>
          <div class="col-6">
            <b-button type="reset" variant="secondary" @click="toLogIn"
              >Login</b-button
            >
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
      form: {
        username: "",
        password: "",
        confirm_password: ""
      }
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password
      });
      //this.$router.push("Home");
    },
    toLogIn() {
      this.$router.push("Login");
    }
  }
};
</script>
