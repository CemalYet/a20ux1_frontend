<template>
  <div class="content">
    <div class="middleContainer">

      <!-- Image + title and leaf -->
      <div class="img">
        <!-- Title of the discovery + favorite icon (leaf) -->
        <div class="titleLeafBox_container">
          <div class="titleLeafBox">
            <v-btn
                class="ma-2 title_disco white--text"
                outlined
                small
                color=var(--dark-color)
            > {{ getDiscoveryExtraInfo.plantName }} </v-btn>
          </div>
        </div>
        <!-- Image from the discovery-->
        <!-- NOT IMPLEMENTED YET: multiple images in a carousel -->
        <v-img :src="getDiscovery.photoPath"></v-img>

      </div>

      <!-- Icons: like, comments, tags, share -->
      <div class="iconBox">
        <div class="icons1">
          <!-- Like button clicked or not clicked, default values get sent to db, NOT IMPLEMENTED: showing the icon based on db information -->
          <v-btn icon v-on:click="likeClicked = false" v-if="likeClicked" class="icon">
            <v-icon large color=var(--dark-color) @click="deleteLikeFromDb">mdi-heart</v-icon>
          </v-btn>
          <v-btn icon v-on:click="likeClicked = true" v-else class="icon">
            <v-icon large color=var(--dark-color) @click="sendLikeToDb">mdi-heart-outline</v-icon>
          </v-btn>
          <!-- Comment button clicked or not clicked, NOT IMPLEMENTED YET: link to /comments page -->
          <v-btn icon class="icon" @click.stop="goToComments">
            <v-icon large color=var(--dark-color)>mdi-comment-multiple-outline</v-icon>
          </v-btn>
          <!-- Tag button clicked or not clicked, with menu for the tags -->
          <v-menu offset-y top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                     class="icon"
                     v-bind="attrs"
                     v-on="on"
              >
                <v-icon large color=var(--dark-color)>mdi-tag-outline</v-icon>
              </v-btn>
            </template>
            <v-list v-for="tag in getTaggedFriends" :key="tag" dense>
              <v-list-item>
                <v-list-item-title class="tags"> {{ tag.userName }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- Share icon -->
        <!-- NOT IMPLEMENTED YET: link to /sharedisco page -->
        <div class="icons2">
          <!-- NOT IMPLEMENTED YET: saving to the db that this discovery is favorited -->
          <v-btn icon v-on:click="favorited = false" v-if="favorited">
            <v-icon large color=var(--dark-color)>mdi-leaf</v-icon>
          </v-btn>
          <v-btn icon v-on:click="favorited = true" v-else>
            <v-icon large color="#5B5C5C">mdi-leaf</v-icon>
          </v-btn>
          <v-btn icon class="icon" @click.stop="goToShare">
            <v-icon large color=var(--dark-color)>mdi-share-variant</v-icon>
          </v-btn>
        </div>
      </div>

      <br>

      <!-- Comments -->
      <div class="comments">
        <!-- Caption from the author-->
        <div class="commentBox">
          <div class="infoBox text-truncate">

              <v-list-item three-line>
                <v-list-item-avatar size="48">
                  <v-img :src="getDiscovery.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title style="white-space: normal;">{{getDiscovery.title}}</v-list-item-title>
                  <v-list-item-subtitle class="wrap-text"> {{ getDiscoveryExtraInfo.description }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

          </div>
        </div>
        <v-divider></v-divider>
        <!-- For loop to show the comments -->
        <div class="commentBox">
          <div class="infoBox text-truncate">
            <v-list-item three-line>
              <v-list-item-avatar size="48">
                <v-img :src="getComments[0].avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title style="white-space: normal;"> {{getComments[0].userName}} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ getComments[0].comment }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle @click="goToComments">
                  And {{getComments.length}} more...
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>

      <v-dialog
          v-model="updateDeleteDialog"
          max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this post?
          </v-card-title>

          <v-card-text>
            This action can not be undone and your friends can't see your awesome picture anymore :(
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=var(--main-color)
                text
                @click="closeDelete"
            >
              Cancel
            </v-btn>

            <v-btn
                color=var(--main-color)
                text
                @click="closeDelete"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "postContent",

  data: () => ({
    likeClicked: false,
    favorited: false,
  }),

  methods: {
    sendLikeToDb: function() {
      const json = JSON.stringify({
        userId: this.$store.getters.getUserData[0].userId,
        discoId: this.$route.params.discovery_id
      });
      axios.post('savelike', json)
          .then(function (res) {
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });
    },
    deleteLikeFromDb: function() {
      const json = JSON.stringify({
        userId: this.$store.getters.getUserData[0].userId,
        discoId: this.$route.params.discovery_id
      });
      axios.post('deletelike', json)
          .then(function (res) {
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });
    },
    goToComments(){
      this.$router.push({path:`${this.$route.params.discovery_id}/comments`});
    },
    goToShare(){
      this.$router.push({path:`${this.$route.params.discovery_id}/share`});
    },
    closeDelete(){
      this.$store.commit('updateDeleteDialog', false);
    }
  },

  computed:{
    getUserData(){
      return this.$store.getters.getUserData;
    },
    getDiscovery(){
      return this.$store.getters.getDiscoveryBasedOnId(this.$route.params.discovery_id);
    },
    getDiscoveryExtraInfo(){
      return this.$store.getters.getDiscoveryExtraInfo;
    },
    getLikes(){
      return this.$store.getters.getLikes;
    },
    getComments(){
      return this.$store.getters.getComments;
    },
    getTaggedFriends(){
      return this.$store.getters.getTaggedFriends;
    },
    updateDeleteDialog:{
      get(){
        return this.$store.getters.getDeleteDialog;
      },
      set(value){
        this.$store.commit('updateDeleteDialog', value);
      }
    }
  },


  mounted() {
    /* uncomment if deployed
    this.$store.dispatch('fetchDiscoveryBasedOnId', this.$route.params.disoveryId);
    this.$store.dispatch('fetchDiscoveryExtraInfo', this.$route.params.disoveryId);
    this.$store.dispatch('fetchLikes', this.$route.params.disoveryId);
    this.$store.dispatch('fetchComments', this.$route.params.disoveryId);
    this.$store.dispatch('fetchTags', this.$route.params.disoveryId);

     */
  },

  watch: {
    $route(to) {
      this.$store.dispatch('fetchDiscoveryBasedOnId', to);
      // react to route changes...
    }
  }
}
</script>

<style scoped>
.img {
  position: relative;
  margin: auto;
  width: 100%;
}

.middleContainer {
  width: 100%;
  max-width: 750px;
  height: 100%;
  margin: auto;
}

.icons1 {
  display: flex;
  justify-content: flex-start;
}

.icons2 {
  display: flex;
  justify-content: flex-end;
}

.iconBox {
  display: flex;
  justify-content: space-between;
}

.commentBox {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.icon {
  margin: 5px 5px -12px;
}

.titleLeafBox_container{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  padding: 5px;
}

.titleLeafBox {
  display: flex;
  justify-content: space-between;
}

.tags {
  color: var(--dark-color);
}

.wrap-text {
  -webkit-line-clamp: unset !important;
}

</style>