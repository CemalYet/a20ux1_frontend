<template>

    <v-container
        class="mx-auto"
        max-width="500"
    >
      <v-row
          align="center"
          justify="space-around">
        <v-btn
            icon
            window.location.href="/friendsAdd"
        >
          <router-link class="router" to="/friendsAdd">
          <v-icon x-large color=var(--main-color)>mdi-account-multiple-plus</v-icon>
          </router-link>
        </v-btn>

        <v-btn
            color=var(--dark-color)
            icon
            window.location.href="/friendsRequest"
        >
          <router-link class="router" to="/friendsRequest">
            <v-icon style="vertical-align: middle" x-large color=var(--main-color)>mdi-account-question</v-icon>
          </router-link>
        </v-btn>

      </v-row>
      <v-row
          align="center"
          justify="space-around">

        <v-btn text
               color="var(--dark-color)"
               class="text-capitalize">
          Add Friend
        </v-btn>
        <v-btn text
               :ripple="false"
               color="var(--dark-color)"
               class="text-capitalize"
        >
          Friend Request
        </v-btn>

      </v-row>
      <v-divider class="divider"></v-divider>
      <v-list subheader
              class="list">
        <v-list-item
            v-for="friend in friends"
            :key="friend.userName"
        >
          <v-list-item-avatar>
            <v-img
                :alt="`${friend.userName} avatar`"
                :src="friend.avatar"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="friend.userName"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn depressed
                   class="text-capitalize"
                   v-on:click="postUnFriendId(friend)">
             Unfriend
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-container>

</template>

  <script>
import axios from "axios";

export default {
  name: "friends",
  data: () => ({
    friends: null,

  }),

  mounted() {

    axios.get('/public/friends/getFriends').then(response => (this.friends = response["data"]))
    console.log(this.friends)
  },
  methods:{
    postUnFriendId:function (friend){
      const unFriendId = JSON.stringify({
      userId_2:friend.userId
      });
      const res = axios.post('/public/friends/unfriend', unFriendId,
          {
            headers: {'Content-Type': 'application/json'}
          });
      console.log(friend.userId)
      console.log(unFriendId)
      console.log(res)
    }
  }

}
</script>


<style scoped>

.divider{
  border-color: var(--main-color);
  border-bottom-width:thin;
}
.list{
   background: transparent;
 }

.router{
  text-decoration: none;
}

</style>