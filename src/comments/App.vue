<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1">

      <!-- Arrow back -->
      <v-app-bar-nav-icon>
        <v-icon large color=var(--dark-color)>mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>

      <!-- Title: Comments -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Comments</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
      </v-btn>

    </v-app-bar>

   <v-main id="main">
     <br/>
     <br/>
     <br/>

     <div class="content">
       <div class="middleContainer">
         <!-- Caption from the author -->
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

         <!-- Comments -->
         <!-- NOT IMPLEMENTED YET: you have to refresh to see a new comment -->
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

         <!-- Write a new comment -->
         <div class="newComment">
           <div class="avatarBox">
             <!-- NOT IMPLEMENTED YET: it takes the avatar from the author of the discovery, not the person who is logged in -->
             <v-avatar size="46"><v-img :src="userInfo[0].avatar"></v-img></v-avatar>
           </div>
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
   </v-main>
  </v-app>
</template>

<script>

import axios from "axios";

export default {
  name: "App",

  data: () => ({
    userInfo: null,
    discovery: null,
    comments: null,
    newComment: null,
  }),

  mounted() {
    axios.get('/public/discovery/getUserInfo').then(response => (this.userInfo = response["data"]))
    axios.get('/public/discovery/getDiscoInfo').then(response => (this.discovery = response["data"]))
    axios.get('/public/discovery/getComments').then(response => (this.comments = response["data"]))
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
    }
  }
};
</script>

<style scoped>
@import '../styles.css';

* {
  font-family: 'Lato', sans-serif;
}

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.middleContainer {
  width: 350px;
  height: 100%;
  margin: auto;
}

.commentBox {
  display: flex;
  flex-direction: row;
}

.avatarBox {
  padding: 5px 5px 5px 5px;
}

#Title {
  font-family: 'Merriweather', serif;
  font-size: 35px;
  color: var(--dark-color);
}

.newComment {
  position: fixed;
  bottom: 0;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

p {
  font-size: 13px;
}


</style>