<template>
  <div class="content">
    <br>
    <loader v-if="updateDiscoveryData.length === 0"></loader>
    <div v-if="updateDiscoveryData.length !== 0" class="middleContainer">
      <!-- Caption from the author -->
      <div class="commentBox">
        <div class="infoBox text-truncate">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;">{{updateDiscoveryData[0].title}}</v-list-item-title>
              <v-list-item-subtitle class="wrap-text"> {{ updateDiscoveryData[0].description }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <v-divider></v-divider>

      <!-- Comments -->
      <!-- NOT IMPLEMENTED YET: you have to refresh to see a new comment -->
      <div class="text-body-1" v-if="getComments.length === 0" style="margin: 12px"> There seems to be nothing here. Tell your friends about your post!</div>
      <div
          class="commentBox"
          v-for="comment in getComments"
          :key="comment">
        <div class="infoBox text-truncate">
          <v-list-item three-line dense>
            <avatar :size="48" :user-name="comment.userName" :picture="comment.avatar"
                    @click.native="goToUser(comment.commentedByUserIdFk)"></avatar>
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;"> {{comment.userName}} </v-list-item-title>
              <v-list-item-subtitle class="wrap-text"> {{ comment.comment }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>

      <!-- Write a new comment -->
      <div class="newComment">
        <v-text-field
            solo
            v-model = "newComment"
            label="Write a comment"
            clearable
            append-icon="mdi-send"
            @click:append="sendCommentToDb"
        ></v-text-field>
      </div>

    </div>
  </div>
</template>

<script>

import avatar from "@/components/avatar";
import loader from "@/components/loader";

export default {
  name: "commentContent",

  data: () => ({
    newComment: null,
  }),

  components: {
    avatar,
    loader
  },

  mounted() {
    this.$store.dispatch('fetchDiscoveryBasedOnId', this.$route.params.discovery_id);
    this.$store.dispatch('fetchComments', this.$route.params.discovery_id);
  },

  methods: {
    sendCommentToDb: function() {
      const json = JSON.stringify({
        userId: this.$store.getters.getLoggedInUserData[0].userId,
        discoId: this.$route.params.discovery_id,
        comment: this.newComment
      });
      this.$store.dispatch('uploadNewComment', json).then(response => {
            console.log(response);
            this.comments = this.$store.getters.getComments;
            // Hoped this would update the comments on the screen but it doesn't
          }
      );
      this.$store.commit("appendNewComment", this.newComment);
      this.newComment = null;
    },
    goToUser(user_id){
      this.$router.push({path: `/profile/${user_id}`})}
  },

  computed:{
    updateDiscoveryData(){
      return this.$store.getters.getDiscoveryPostData;
    },
    getComments(){
      return this.$store.getters.getComments;
    },
  }
}
</script>

<style scoped>

.middleContainer {
  width: 100%;
  max-width: 750px;
  height: 100%;
  margin: auto;
}

.commentBox {
  display: flex;
  flex-direction: row;
}

.newComment {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 750px;
  padding-right: 12px;
  padding-left: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.wrap-text {
  -webkit-line-clamp: unset !important;
}
</style>