<template>
  <div>
    <b-list-group v-for="post in posts" :key="`${post}`">
      <div class="row justify-content-end">
        <div class="col-sm-8">
          <b-list-group-item>
            {{ post.title }}
          </b-list-group-item>
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
  }
};
</script>
