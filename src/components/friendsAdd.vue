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
    <span> </span>
    <v-divider class="divider" ></v-divider>
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search Friends"
        single-line
    ></v-text-field>
    <v-list three-line
            class="list">
      <v-list-item
          v-for="(friends, i) in searching"
          :key="i"
          ripple
          @click="() => {}"
      >
        <v-list-item-avatar>
          <v-img
              :alt="`${friends.userName} avatar`"
              :src="friends.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="friends.userName"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn
              depressed
              color=var(--main-color)
              dark
              class="text-capitalize"
              v-on:click="postFriendId(friend)">
            Add Friend
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "friendsAdd",
  data: () => ({
    friends:null,
    search: '',
  }),
  computed: {
    searching () {
      if (!this.search) return this.friends

      const search = this.search.toLowerCase()

      return this.friends.filter(friends => {
        const text = friends.userName.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
  },
  mounted() {
    axios.get('/public/friends/getFriends').then(response => (this.friends = response["data"]))
    console.log(this.friends)
  },
  methods:{
    postFriendId:function (friend){
      const friendId = JSON.stringify({
      userId_2: friend.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)
  
      axios.post('/public/friends/addFriend', formData).then(function (response) {console.log(response);})
      
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