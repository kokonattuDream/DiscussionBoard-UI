<template>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <validation-provider
            name="username"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              id="username-input"
              label="Username:"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="username"
                placeholder="Enter Username"
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
            >
              <b-form-input
                id="password"
                v-model="password"
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
              <b-button type="submit" variant="success">Submit</b-button>
            </div>
            <div class="col-6">
              <b-button type="reset" variant="secondary" @click="toRegister">
                Register
              </b-button>
            </div>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: mapState({
    errorMessage: state => state.actionResponse.loginError
  }),
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onSubmit() {
      this.$store.dispatch("user/signIn", {
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
