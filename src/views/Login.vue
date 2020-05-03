<template>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="username-input"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="form.username"
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
            v-model="form.password"
            type="password"
            required
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form-group>
        <div class="row justify-content-between">
          <div class="col-6">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
          <div class="col-6">
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </div>

      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password
      });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.name = "";
    }
  }
};
</script>
