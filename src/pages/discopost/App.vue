<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1">

      <!-- Arrow back -->
      <v-app-bar-nav-icon>
        <v-icon large color="#00251A">mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>

      <!-- Profile picture + name + date/time -->
      <v-spacer></v-spacer>
      <div class="userInfoBox">
        <div class="avatarBox">
          <v-avatar size="52"><v-img :src="userInfo[0].avatar"></v-img></v-avatar>
        </div>
        <div class="infoBox">
          <v-list-item two-line>
            <v-list-item-content>
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
              color="#00251A"
              @click="overlay = !overlay"
              icon
          >
            <v-icon large color="#00251A">mdi-menu-down-outline</v-icon>
          </v-btn>

        </template>

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

          <!-- Image and leaf button -->
          <div class="img">
            <v-img height="350" :src="discovery[0].photoPath"></v-img>
            <v-btn icon>
            </v-btn>
            <v-btn
              rounded
              small
              color="#39796B"
              class="white--text"
            > Title </v-btn>
            <v-btn class="leaficon" icon v-on:click="favorited = false" v-if="favorited">
              <v-icon large color="#00251A">mdi-leaf</v-icon>
            </v-btn>
            <v-btn class="leaficon" icon v-on:click="favorited = true" v-else>
              <v-icon large color="#5B5C5C">mdi-leaf</v-icon>
            </v-btn>
          </div>

          <!-- Icons: like, comments, tags, share -->
          <div class="iconbox">
            <div class="icons1">
              <!-- Like button clicked or not clicked -->
              <v-btn icon v-on:click="likeClicked = false" v-if="likeClicked" class="icon">
                <v-icon large color="#00251A">mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-on:click="likeClicked = true" v-else class="icon">
                <v-icon large color="#00251A">mdi-heart-outline</v-icon>
              </v-btn>
              <!-- Comment button clicked or not clicked -->
              <v-btn icon class="icon">
                <v-icon large color="#00251A">mdi-comment-multiple-outline</v-icon>
              </v-btn>
              <!-- Tag button clicked or not clicked -->
              <v-btn icon v-on:click="tagClicked = false" v-if="tagClicked" class="icon">
                <v-icon large color="#00251A">mdi-tag</v-icon>
              </v-btn>
              <v-btn icon v-on:click="tagClicked = true" v-else class="icon">
                <v-icon large color="#00251A">mdi-tag-outline</v-icon>
              </v-btn>
            </div>
            <div class="icons2">
              <v-btn icon class="icon">
                <v-icon large color="#00251A">mdi-share-variant</v-icon>
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
    //titles: null,
    overlay: false,
    likeClicked: false,
    tagClicked: false,
    favorited: false,
    discovery: null,
    userInfo: null,
    comments: null
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
  },

};
</script>

<style>

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

</style>
