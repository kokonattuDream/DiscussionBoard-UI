<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-10" style="margin-bottom: 50px;">
        <nav
          class="navbar navbar-light"
          style=" border-color: black; border-style: solid; background-color: #66ff99;"
        >
          <strong>New Post</strong>
        </nav>
      </div>
    </div>
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
          description="Select the region of the post topic"
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
          description="Select the region of the post topic"
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
        <div class="col-sm-4">
          <b-form-group id="input-group-2" label="Image" label-for="input-3">
            <b-form-file
              id="file"
              v-model="file"
              accept=".jpg, .png, .gif"
              placeholder="JPG, PNG, GIF files"
              drop-placeholder="Drop file here..."
            ></b-form-file>
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
      categories:[
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
        "Calgry",
        "Ottawa",
        "Montreal",
        "Canada"
      ],
      category:"",
      region: "",
      title: "",
      text: "",
      file: null
    };
  },
  computed: mapState({
    user: state => state.user
  }),
  methods:{
    async onSubmit(event){
      event.preventDefault();
      this.$store.dispatch("createNewPost", {
        category: this.category,
        region: this.region,
        title: this.title,
        username: this.user.username,
        text: this.text,
        file: this.file
      });
    }
  }
};
</script>
