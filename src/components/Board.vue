<template>
  <div>
    <div class="row" style="margin-bottom: 20px;">
      <div class="col-sm-5">
        <b-button variant="outline-secondary" @click="createPost"
          >New Post</b-button
        >
      </div>
    </div>
    <b-list-group v-for="(post, index) in posts" :key="`${index}`">
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
            <b-card-text> By {{ post.user.username }} </b-card-text>
            <b-button @click="viewPost(post._id)">See Post</b-button>
            <template v-slot:footer>
              <small class="text-muted">
                {{ new Date(post.create_date).toLocaleString() }}
              </small>
            </template>
          </b-card>
        </div>
      </div>
    </b-list-group>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Board",
  data() {
    return {};
  },
  computed: mapState({
    posts: state => state.post.posts,
    user: state => state.user.user
  }),
  created() {
    this.$store.dispatch("post/getAllPosts");
  },
  methods: {
    createPost() {
      if (!this.user) {
        this.$router.push("Login");
      } else {
        this.$router.push("NewPost");
      }
    },
    viewPost(id) {
      this.$store.dispatch("post/getPost", id);
    }
  }
};
</script>
