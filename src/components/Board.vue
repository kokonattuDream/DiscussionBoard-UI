<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-8" style="margin-bottom: 50px;">
        <nav
          class="navbar navbar-light"
          style=" border-color: black; border-style: solid; background-color: #66ff99;"
        >
          <strong>Discussion Board</strong>
        </nav>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 20px;">
      <div class="col-sm-2">
        <b-button variant="outline-secondary" @click="createPost"
          >Create</b-button
        >
      </div>
    </div>
    <b-list-group v-for="(post, index) in posts" :key="`${index}`">
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <b-card>
            <b-card-title>
              <b-card-text class="card-link">
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
