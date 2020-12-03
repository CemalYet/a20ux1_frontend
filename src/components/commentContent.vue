<template>
  <div class="content">
    <br>
    <div class="middleContainer">
      <!-- Caption from the author -->
      <div class="commentBox">
        <div class="infoBox text-truncate">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;">{{getDiscovery.title}}</v-list-item-title>
              <v-list-item-subtitle class="wrap-text"> {{ getDiscoveryExtraInfo.description }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <v-divider></v-divider>

      <!-- Comments -->
      <!-- NOT IMPLEMENTED YET: you have to refresh to see a new comment -->
      <div
          class="commentBox"
          v-for="comment in getComments"
          :key="comment">
        <div class="infoBox text-truncate">
          <v-list-item three-line dense>
            <avatar :size="48" :user-name="comment.userName" :picture="comment.avatar"
                    @click.native="goToUser(comment.userId)"></avatar>
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
import axios from "axios";
import avatar from "@/components/avatar";

export default {
  name: "commentContent",

  data: () => ({
    newComment: null,
  }),

  components: {
    avatar
  },

  methods: {
    sendCommentToDb: function() {
      const json = JSON.stringify({
        my_comment: this.newComment
      });
      axios.post('savecomment', json)
          .then(function (res) {
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });
    },
    goToUser(user_id){
      console.log(user_id);
      if(typeof(user_id)!=='undefined'){
        this.$router.push({path: `/profile/${user_id}`})}
    }
  },

  computed:{
    getUserData(){
      return this.$store.getters.getLoggedInUserData;
    },
    getDiscovery(){
      return this.$store.getters.getDiscoveryBasedOnId(this.$route.params.discovery_id);
    },
    getDiscoveryExtraInfo(){
      return this.$store.getters.getDiscoveryExtraInfo;
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