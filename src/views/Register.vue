<template>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <validation-provider
            name="username"
            :rules="{ required: true, min: 5 }"
            v-slot="validationContext"
          >
            <b-form-group
              id="username-input"
              name="username"
              label="Username:"
              label-for="username"
            >
              <b-form-input
                id="username"
                name="username"
                v-model="username"
                aria-describedby="input-1-live-feedback"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="password"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="password-input"
              label="Password:"
              label-for="password"
              name="password"
            >
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="confirmPassword"
            rules="required|password:@password"
            v-slot="validationContext"
          >
            <b-form-group
              id="password-input2"
              label="Confirm Password:"
              label-for="password"
            >
              <b-form-input
                id="confirmPassword"
                name="confirmPassword"
                v-model="confirmPassword"
                type="password"
                aria-describedby="password-help-block"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-alert :show="errorMessage != ''" variant="danger">{{
            errorMessage
          }}</b-alert>
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
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { extend } from "vee-validate";

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match"
});

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: mapState({
    errorMessage: state => state.actionResponse.registerError
  }),
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onSubmit() {
      this.$store.dispatch("user/register", {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
    },
    toLogIn() {
      this.$router.push("Login");
    }
  }
};
</script>
