<template>
  <div>
    <b-form @submit="onSubmit">
      <div class="row justify-content-center">
        <b-form-group id="input-group-2" label="Username:" label-for="input-2">
          {{ user.username }}
        </b-form-group>
      </div>
      <div class="row justify-content-center">
        <b-form-group
          id="input-group-3"
          label="Post Category:"
          label-for="input-3"
          description="Select the category of the topic"
        >
          <b-form-select
            id="input-3"
            v-model="category"
            :options="categories"
            required
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="row justify-content-center">
        <b-form-group
          id="input-group-3"
          label="Region:"
          label-for="input-3"
          description="Select the region of the topic"
        >
          <b-form-select
            id="input-3"
            v-model="region"
            :options="regions"
            required
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <b-form-group id="input-group-2" label="Title" label-for="input-2">
            <b-form-input id="title" v-model="title" required></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-8">
          <b-form-group id="input-group-2" label="Text" label-for="input-2">
            <b-form-textarea
              id="textarea"
              v-model="text"
              rows="8"
              required
            ></b-form-textarea>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <b-form-group
            id="input-group-2"
            label="Image"
            description="Accept jpg, png, gif files"
            label-for="input-2"
          >
            <b-form-file
              accept=".jpg, .png, .gif"
              id="image"
              v-model="image"
            ></b-form-file>
          </b-form-group>
        </div>
      </div>
      <div v-if="this.spinning" class="row justify-content-center">
        <b-spinner
          variant="primary"
          label="Spinning"
          style="margin:20px"
        ></b-spinner>
      </div>
      <div class="row justify-content-center">
        <b-alert :show="this.error_message != ''" variant="danger"
          >{{ this.error_message }}
        </b-alert>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import constants from "../constants/constants";
export default {
  name: "NewPost",
  data() {
    let categories = [...constants.categories];
    let regions = [...constants.regions];
    categories.splice(0, 1);
    regions.splice(0, 1);

    return {
      categories: categories,
      regions: regions,
      category: "",
      region: "",
      title: "",
      text: "",
      image: null
    };
  },
  computed: mapState({
    user: state => state.user.user,
    spinning: state => state.actionResponse.post_submission_loading,
    error_message: state => state.actionResponse.create_post_error
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();

      this.$store.dispatch("post/createNewPost", {
        data: {
          category: this.category,
          region: this.region,
          title: this.title,
          text: this.text,
          username: this.user.username
        },
        image: this.image
      });
    }
  }
};
</script>
