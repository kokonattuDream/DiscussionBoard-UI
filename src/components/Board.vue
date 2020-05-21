<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-2">
        <b-form-group id="input-group-3" label="Category:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.category"
            :options="categories"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col-sm-2">
        <b-form-group id="input-group-3" label="Region:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.region"
            :options="regions"
          ></b-form-select>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      
      <div class="col-sm-6">
        <b-icon icon="search"/>
        <b-form-input
          id="input-2"
          v-model="form.keyword"
          placeholder="Enter Keyword"
        ></b-form-input>
      </div>
    </div>
    <div class="row justify-content-center" style="margin: 20px;">
      <div class="col-sm-2">
        <b-button variant="outline-secondary" @click="searchPost"
          >Search</b-button
        >
      </div>
      <div class="col-sm-2">
        <b-button variant="outline-secondary" @click="createPost"
          >New Post</b-button
        >
      </div>
    </div>
    <b-list-group v-for="(post, index) in pageData(posts)" :key="`${index}`">
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <b-card>
            <b-card-title>
              <b-card-header>
                <div
                  class="row justify-content-start"
                  style="margin-bottom: 10px;"
                >
                  <b-card-text style="font-size:16px">
                    {{ post.region }}
                  </b-card-text>
                </div>
                <div class="row justify-content-start">
                  <b-card-sub-title>
                    {{ post.category }}
                  </b-card-sub-title>
                </div>
              </b-card-header>
              <b-card-text
                class="card-link"
                style="margin: 10px; font-size: 30px;"
              >
                {{ post.title }}
              </b-card-text>
            </b-card-title>
            <b-button @click="viewPost(post._id)">See Post</b-button>
            <template v-slot:footer>
              <div class="row">
                <div class="col-sm-2">
                  <b-card-text> By {{ post.user.username }} </b-card-text>
                </div>
                <div class="col-sm-8">
                  <small class="text-muted">
                    {{ new Date(post.updated_date).toLocaleString() }}
                  </small>
                </div>
                <div class="col-sm-2">
                  <b-icon icon="chat-fill"></b-icon>
                  <b-card-text>{{ post.replies.length }}</b-card-text>
                </div>
              </div>
            </template>
          </b-card>
        </div>
      </div>
    </b-list-group>
    <div class="row justify-content-center" style="margin: 10px;">
      <div class="col-sm-2">
        <b-button :disabled="this.page_number == 1" @click="prevPage"
          >Prev</b-button
        >
      </div>
      <div class="col-sm-2">
        <b-button
          :disabled="this.page_number * 10 >= posts.length"
          @click="nextPage"
          >Next</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import constants from "../constants/constants";
export default {
  name: "Board",
  data() {
    return {
      form: {
        category: "",
        region: "",
        keyword: ""
      },
      categories: constants.categories,
      regions: constants.regions
    };
  },
  computed: mapState({
    posts: state => state.post.display_posts,
    user: state => state.user.user,
    page_number: state => state.post.page_number
  }),
  created() {
    this.$store.dispatch("post/getAllPosts");
  },
  methods: {
    pageData(posts) {
      if (!posts) {
        return posts;
      } else {
        let start = (this.page_number - 1) * 10;
        let end =
          start + 10 > this.posts.length ? this.posts.length : start + 10;
        return posts.slice(start, end);
      }
    },
    createPost() {
      if (!this.user) {
        this.$router.push("Login");
      } else {
        this.$router.push("NewPost");
      }
    },
    searchPost() {
      this.$store.dispatch("post/searchPosts", this.form);
    },
    viewPost(id) {
      this.$store.dispatch("post/getPost", id);
    },
    nextPage() {
      this.$store.dispatch("post/setPageNumber", this.page_number + 1);
    },
    prevPage() {
      this.$store.dispatch("post/setPageNumber", this.page_number - 1);
    }
  }
};
</script>
