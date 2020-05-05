<template>
  <div>
    <div class="row justify-content-end">
      <div class="col-sm-8" style="margin-bottom: 50px;">
        <nav
          class="navbar navbar-light"
          style=" border-color: black; border-style: solid; background-color: #66ff99;"
        >
          <strong>Discussion Board</strong>
        </nav>
      </div>
    </div>
    <div class="row justify-content-end" style="margin-bottom: 20px;">
      <div class="col-sm-2">
        <b-button variant="outline-danger" @click="createPost">Create New</b-button>
      </div>
    </div>
    <b-list-group v-for="post in posts" :key="`${post}`">
      <div class="row justify-content-end">
        <div class="col-sm-8">
          <b-card>
            <b-card-title>
              <a href="#" class="card-link">
                {{ post.title }}
              </a>
            </b-card-title>
            <b-card-text> By {{ post.user.username }} </b-card-text>
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
    posts: state => state.posts
  }),
  created() {
    this.$store.dispatch("getAllPosts");
  },
  methods:{
    createPost() {
        this.$router.push("NewPost");
    }
  }
  
};
</script>
