<template>
<div>
  <div class="row justify-content-center">
    <div class="col-sm-8">
      <b-card>
        <b-card-title>
          <b-card-text class="card-link">
            {{ current_post.title }}
          </b-card-text>
        </b-card-title>
        <b-card-text> By {{ current_post.user.username }} </b-card-text>
        <b-card-text>
          {{ current_post.text }}
        </b-card-text>
        <template v-slot:footer>
          <div class="row">
            <div class="col-sm-2">
              <b-button @click="replyPost">Reply</b-button>
            </div>
            <div class="col-sm-8">
              <small class="text-muted">
                {{ new Date(current_post.create_date).toLocaleString() }}
              </small>
            </div>
          </div>
        </template>
      </b-card>
    </div>
  </div>
  <div class="row justify-content-center" v-if="clickedReply" style="margin: 50px;">
    <div class="col-sm-8">
        <b-card>
            <b-card-text> Reply </b-card-text>
      <b-form-group id="input-group-2" label-for="input-2">
            <b-form-textarea
              id="textarea"
              v-model="reply"
              rows="4"
              placeholder="Write Text Here"
            ></b-form-textarea>
      </b-form-group>
      <b-button :disabled="!reply" @click="submitReply">Submit</b-button>
      </b-card>
      </div>
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
  }),
  data(){
    return {
        clickedReply: false,
        reply: ""
    }
  },
  methods:{
    replyPost(){
        this.clickedReply = true;
    },
    submitReply(){
        this
    }
  }
};
</script>
