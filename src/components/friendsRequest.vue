<template>
  <v-container
      class="mx-auto"
      max-width="500"
  >
    <v-row
        align="center"
        justify="space-around" >

      <v-btn
          icon
          window.location.href="/friendsAdd"
      >
        <router-link class="router" to="/friendsAdd">
          <v-icon class="icon_vertical" x-large color=var(--main-color)>{{ mdiAccountMultiplePlus }}</v-icon>
        </router-link>
      </v-btn>
      <v-btn
          color=var(--dark-color)
          icon
          window.location.href="/friends"
      >
        <router-link class="router" to="/friends">
          <v-icon class="icon_vertical" x-large color=var(--main-color)>{{ mdiAccountMultiple }}</v-icon>
        </router-link>
      </v-btn>
      <v-btn
          color=var(--dark-color)
          icon
          window.location.href="/friendsRequest"
      >
        <router-link class="router" to="/friendsRequest">
          <v-icon class="icon_vertical" x-large color=var(--main-color)>{{ mdiAccountQuestion }}</v-icon>
        </router-link>
      </v-btn>
    </v-row>
    <v-row
        justify="space-around">
      <p class="ml-2">Add Friend</p><p class="ml-5">Friends</p><p>Friend Request</p>
    </v-row>
    <span> </span>
    <v-divider class="divider" ></v-divider>


    <v-list subheader
    class="list"
            justify="space-around">
      <v-list-item
          v-for="friend in requests"
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
          <v-btn
              depressed
              color="error"
              dark
              class="text-capitalize mr-4"
              @click="declineRequest(friend)">
            Decline
          </v-btn>
          <v-btn
              depressed
              color=var(--main-color)
              dark
              class="text-capitalize"
              @click="acceptRequest(friend)">
            Accept
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";
import {mdiAccountMultiplePlus} from '@mdi/js';
import {mdiAccountMultiple} from '@mdi/js';
import {mdiAccountQuestion} from '@mdi/js';


export default {
  name: "addFriends",

  data: () => ({
    friends:null,
    requests:null,
    mdiAccountMultiplePlus: mdiAccountMultiplePlus,
    mdiAccountMultiple: mdiAccountMultiple,
    mdiAccountQuestion: mdiAccountQuestion
  }),

  mounted() {
  },

  methods: {
    acceptRequest:function (friend){
      const friendId = JSON.stringify({
        userId_1: friend.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/acceptFriendRequest', formData).then(function (response) {console.log(response);})

      this.deleteRequest(friend)
    },
    deleteRequest: function(request) {
      this.requests.splice(this.requests.indexOf(request), 1);
    },
    declineRequest: function (friend) {
      const friendId = JSON.stringify({
        userId: friend.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/unfriend', formData).then(response=>{
        console.log(response["data"])
      });
      this.deleteRequest(friend)
    },
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

.icon_vertical {
  vertical-align: middle;
}
</style>