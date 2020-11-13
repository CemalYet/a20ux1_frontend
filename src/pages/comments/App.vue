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

      <!-- Title: Comments -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Comments</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
      </v-btn>

    </v-app-bar>

   <v-main>
     <br/>
     <br/>
     <br/>

     <div class="content">
       <div class="middlecontainer">
         <!-- Caption from the author -->
         <div class="commentBox">
           <div class="avatarBox">
             <v-avatar color="primary" size="56" class="avatar"> {{ discovery.initials }} </v-avatar>
           </div>
           <div class="infoBox">
             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title> {{ discovery.userName }} </v-list-item-title>
                 <p> {{ discovery.description }} </p>
               </v-list-item-content>
             </v-list-item>
           </div>
         </div>
         <v-divider></v-divider>

         <!-- Comments -->
         <div class="commentBox" v-for="comment in comments" :key="comment.username">
           <div class="avatarBox">
             <v-avatar color="primary" size="56" class="avatar"> {{ comment.initials }} </v-avatar>
           </div>
           <div class="infoBox">
             <v-list-item two-line>
               <v-list-item-content>
                 <v-list-item-title> {{ comment.username }} </v-list-item-title>
                 <p> {{ comment.comment }} </p>
               </v-list-item-content>
             </v-list-item>
           </div>
         </div>

         <!-- Write a new comment -->
         <div class="newComment">
           <div class="avatarBox">
             <v-avatar color="primary" size="46" class="avatar"> {{ user.initials }} </v-avatar>
           </div>
           <v-text-field
               solo
               label="Write a comment"
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

export default {
  name: "App",

  data: () => ({
    discovery: {userName: 'Marnix Lijnen', initials: 'ML', photoPath: 'src/assets/Flowers.jpg', takenDate: '2020-11-06 11:54:11', title: 'Hydrangea', description: 'Look at these flowers! They are so magnificent and I really like them, just testing the length'},
    comments: [
      {initials: 'SF', username: 'Seppe Fleerackers', comment: 'Cool picture!'},
      {initials: 'HM', username: 'Helena Majoor', comment: 'Wow so pretty'},
      {initials: 'ML', username: 'Marnix Lijnen', comment: 'I know, right?!'}
    ],
    user: {userName: 'Benno Debals', initials: 'BD'}
  }),

  methods: {
    sendCommentToDb() {
      //send the comment to the database
    }
  }
};
</script>

<style scoped>

* {
  font-family: 'Lato', sans-serif;
}

.content {

}

.middlecontainer {
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