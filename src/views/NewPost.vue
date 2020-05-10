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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NewPost",
  data() {
    return {
      categories: [
        "Trip",
        "Study",
        "Immigrant",
        "Work",
        "Family",
        "Food",
        "Finance",
        "Life",
        "Friends",
        "Others"
      ],
      regions: [
        "Toronto",
        "Vancouver",
        "Victoria",
        "Calgary",
        "Ottawa",
        "Montreal",
        "Canada"
      ],
      category: "",
      region: "",
      title: "",
      text: ""
    };
  },
  computed: mapState({
    user: state => state.user.user
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("post/createNewPost", {
        category: this.category,
        region: this.region,
        title: this.title,
        username: this.user.username,
        text: this.text
      });
    }
  }
};
</script>
