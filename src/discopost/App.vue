<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1">

      <!-- Arrow back -->
      <!-- NOT IMPLEMENTED YET: link to other page -->
      <v-app-bar-nav-icon>
        <v-icon large color=var(--dark-color)>mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>

      <!-- Profile picture + name + date/time -->
      <v-spacer></v-spacer>
      <div class="userInfoBox">
        <div class="avatarBox">
          <!-- NOT IMPLEMENTED YET: showing the avatar based on who is logged in, is a default user right now -->
          <v-avatar size="52"><v-img :src="userInfo[0].avatar"></v-img></v-avatar>
        </div>
        <div class="infoBox">
          <v-list-item two-line>
            <v-list-item-content>
              <!-- NOT IMPLEMENTED YET: it's a default user and default discovery right now -->
              <v-list-item-title> {{ userInfo[0].userName }} </v-list-item-title>
              <v-list-item-subtitle> {{ discovery[0].takenDate }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <v-spacer></v-spacer>

      <!-- Menu button -->
      <v-menu
          top
          :close-on-click="closeOnClick"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              color=var(--dark-color)
              @click="overlay = !overlay"
              icon
          >
            <v-icon large color=var(--dark-color)>mdi-menu-down-outline</v-icon>
          </v-btn>
        </template>
        <!-- NOT IMPLEMENTED YET: deleting the discovery from the db and the link to the edit page -->
        <v-list>
          <v-list-item class="options">
            <v-btn>
              <v-list-item-title> Delete </v-list-item-title>
            </v-btn>
            <v-btn>
              <v-list-item-title> Edit </v-list-item-title>
            </v-btn>

          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main id="main">
      <v-overlay :value="overlay"></v-overlay>
      <br/>
      <br/>
      <br/>

      <div class="content">
        <div class="middlecontainer">

          <!-- Image + title and leaf -->
          <div class="img">
            <!-- Title of the discovery + favorite icon (leaf) -->
            <div class="titleLeafBox">
              <v-btn
                  rounded
                  small
                  color=var(--dark-color)
                  class="title_disco"
              > {{ discovery[0].title }} </v-btn>
              <!-- NOT IMPLEMENTED YET: saving to the db that this discovery is favorited -->
              <v-btn class="leaficon" icon v-on:click="favorited = false" v-if="favorited">
                <v-icon large color=var(--dark-color)>mdi-leaf</v-icon>
              </v-btn>
              <v-btn class="leaficon" icon v-on:click="favorited = true" v-else>
                <v-icon large color="#5B5C5C">mdi-leaf</v-icon>
              </v-btn>
            </div>
            <!-- Image from the discovery-->
            <!-- NOT IMPLEMENTED YET: multiple images in a carousel -->
            <v-img height="350" :src="discovery[0].photoPath"></v-img>

          </div>

          <!-- Icons: like, comments, tags, share -->
          <div class="iconbox">
            <div class="icons1">
              <!-- Like button clicked or not clicked, default values get sent to db, NOT IMPLEMENTED: showing the icon based on db information -->
              <v-btn icon v-on:click="likeClicked = false" v-if="likeClicked" class="icon">
                <v-icon large color=var(--dark-color) @click="deleteLikeFromDb">mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-on:click="likeClicked = true" v-else class="icon">
                <v-icon large color=var(--dark-color) @click="sendLikeToDb">mdi-heart-outline</v-icon>
              </v-btn>
              <!-- Comment button clicked or not clicked, NOT IMPLEMENTED YET: link to /comments page -->
              <v-btn icon class="icon">
                <v-icon large color=var(--dark-color)>mdi-comment-multiple-outline</v-icon>
              </v-btn>
              <!-- Tag button clicked or not clicked, with menu for the tags -->
              <v-menu offset-y top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon
                         v-on:click="tagClicked = false"
                         v-if="tagClicked"
                         class="icon"
                         v-bind="attrs"
                         v-on="on"
                  >
                    <v-icon large color=var(--dark-color)>mdi-tag</v-icon>
                  </v-btn>
                  <v-btn icon
                         v-on:click="tagClicked = true"
                         v-else
                         class="icon"
                         v-bind="attrs"
                         v-on="on"
                  >
                    <v-icon large color=var(--dark-color)>mdi-tag-outline</v-icon>
                  </v-btn>
                </template>
                <v-list v-for="tag in tags" :key="tag.taggedByUserIdFk">
                  <v-list-item>
                    <v-list-item-title class="tags"> {{ tag.userName }} </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <!-- Share icon -->
            <!-- NOT IMPLEMENTED YET: link to /sharedisco page -->
            <div class="icons2">
              <v-btn icon class="icon">
                <v-icon large color=var(--dark-color)>mdi-share-variant</v-icon>
              </v-btn>
            </div>
          </div>

          <br>

          <!-- Comments -->
          <div class="comments">
            <!-- Caption from the author-->
            <div class="commentBox">
              <div class="avatarBox">
                <v-avatar size="52"><v-img :src="userInfo[0].avatar"></v-img></v-avatar>
              </div>
              <div class="infoBox">
                <v-list-item>
                  <v-list-item-content>
                    <p> {{ discovery[0].description }} </p>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
            <v-divider></v-divider>
            <!-- For loop to show the comments -->
            <div class="commentBox" v-for="comment in comments" :key="comment.commentedByUserIdFk">
              <div class="avatarBox">
                <v-avatar size="52"><v-img :src="comment.avatar"></v-img></v-avatar>
              </div>
              <div class="infoBox">
                <v-list-item>
                  <v-list-item-content>
                    <p> {{ comment.comment }} </p>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </div>

        </div>
      </div>
    </v-main>

  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',

  data: () => ({
    overlay: false,
    likeClicked: false,
    tagClicked: false,
    favorited: false,
    discovery: null,
    userInfo: null,
    comments: null,
    likedByUserIdFk: '16',
    discoveryIdFk: '2',
    tags: null
  }),

  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false}, 2000)

    }
  },

  mounted() {
    axios.get('/public/discovery/getUserInfo').then(response => (this.userInfo = response["data"]))
    axios.get('/public/discovery/getDiscoInfo').then(response => (this.discovery = response["data"]))
    axios.get('/public/discovery/getComments').then(response => (this.comments = response["data"]))
    axios.get('/public/discovery/getTags').then(response => (this.tags = response["data"]))
  },

  methods: {
    sendLikeToDb: function() {
      const json = JSON.stringify({
        userId: this.likedByUserIdFk,
        discoId: this.discoveryIdFk
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
        userId: this.likedByUserIdFk,
        discoId: this.discoveryIdFk
      });
      axios.post('deletelike', json)
          .then(function (res) {
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });
    }
  }

};
</script>

<style>
@import '../styles.css';

* {
  font-family: 'Lato', sans-serif;
}

.content {

}

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.img {
  margin: auto;
  width: 350px;
}


.middlecontainer {
  width: 350px;
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

.iconbox {
  display: flex;
  justify-content: space-between;
}

.userInfoBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 250px;
}

.commentBox {
  display: flex;
  flex-direction: row;
  width: 350px;
}

.avatarBox {
  padding: 5px 5px 5px 5px;
}

.infoBox {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.icon {
  margin: 5px 5px 5px 5px;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.titleLeafBox {
  display: flex;
  justify-content: space-between;
}

.tags {
  color: #00251a;
}



</style>
