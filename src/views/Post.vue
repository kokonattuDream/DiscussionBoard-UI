<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <b-card>
          <b-card-title>
            <b-card-text class="card-link">
              {{ currentPost.title }}
            </b-card-text>
          </b-card-title>
          <b-card-text> By {{ currentPost.user.username }} </b-card-text>
          <b-card-text>
            {{ currentPost.text }}
          </b-card-text>
          <b-img
            fluid
            alt="Responsive image"
            v-if="currentPost.imageUrl"
            :src="`${currentPost.imageUrl}`"
          />

          <template v-slot:footer>
            <div class="row">
              <div class="col-sm-2">
                <b-button v-if="user" @click="replyPost">Reply</b-button>
              </div>
              <div class="col-sm-8">
                <small class="text-muted">
                  {{ new Date(currentPost.createDate).toLocaleString() }}
                </small>
              </div>
            </div>
          </template>
        </b-card>
      </div>
    </div>
    <div class="row justify-content-center">
      <b-alert :show="this.errorMessage != ''" variant="danger">{{
        this.errorMessage
      }}</b-alert>
    </div>
    <div
      class="row justify-content-center"
      v-if="clickedReply"
      style="margin: 50px;"
    >
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
          <div class="row justify-content-center">
            <div class="col-sm-2">
              <b-button :disabled="!reply" @click="submitReply"
                >Submit</b-button
              >
            </div>
            <div class="col-sm-2">
              <b-button variant="danger" @click="deleteReply">Delete</b-button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
    <div
      v-for="(postReply, index) in pageData(currentPost.replies)"
      :key="`${index}`"
    >
      <div class="row justify-content-center" style="margin: 10px;">
        <div class="col-sm-8">
          <b-card>
            <div class="row">
              <b-card-sub-title
                >Comment {{ (pageNumber - 1) * 10 + index + 1 }} by
                {{ postReply.user.username }}</b-card-sub-title
              >
            </div>
            <b-card-text>{{ postReply.text }}</b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin: 10px;">
      <div class="col-sm-2">
        <b-button :disabled="this.pageNumber == 1" @click="prevReplies"
          >Prev</b-button
        >
      </div>
      <div class="col-sm-2">
        <b-button
          :disabled="this.pageNumber * 10 >= currentPost.replies.length"
          @click="nextReplies"
          >Next</b-button
        >
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
    user: state => state.user.user,
    currentPost: state => state.post.currentPost,
    errorMessage: state => state.actionResponse.addReplyError
  }),
  data() {
    return {
      clickedReply: false,
      reply: "",
      pageNumber: 1
    };
  },
  methods: {
    replyPost() {
      this.clickedReply = true;
    },
    deleteReply() {
      this.clickedReply = false;
      this.reply = "";
    },
    submitReply() {
      this.clickedReply = false;
      this.$store.dispatch("post/addReply", {
        user: this.user.username,
        reply: this.reply,
        post: this.currentPost._id
      });
    },
    pageData(replies) {
      if (!replies) {
        return replies;
      } else {
        let start = (this.pageNumber - 1) * 10;
        let end = start + 10 > replies.length ? replies.length : start + 10;
        return replies.slice(start, end);
      }
    },
    nextReplies() {
      this.pageNumber++;
    },
    prevReplies() {
      this.pageNumber--;
    }
  }
};
</script>
