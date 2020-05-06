<template>
  <div class="row justify-content-end">
    <div class="col-sm-8">
      <b-card>
        <b-card-title>
          <b-card-text class="card-link">
            {{ current_post.title }}
          </b-card-text>
        </b-card-title>
        <b-card-text> By {{ current_post.user.username }} </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">
            {{ new Date(current_post.create_date).toLocaleString() }}
          </small>
        </template>
      </b-card>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "Post",
  computed: mapState({
    user: state => state.user,
    current_post: state => state.current_post
  })
};
</script>
