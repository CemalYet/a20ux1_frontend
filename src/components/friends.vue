<template>

  <v-container
      class="friend_page_container">
    <v-tabs
        v-model="tab"
        centered
        icons-and-text
        background-color="transparent"
        color=var(--dark-color)
        fixed-tabs
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        My friends
        <v-icon color=var(--dark-color)>mdi-account-multiple-outline</v-icon>
        <v-badge
            color="red"
            :content="friendRequestNotifications"
            v-if="friendRequestNotifications !== 0"
            offset-x="-3"
            offset-y="30"
        ></v-badge>
      </v-tab>
      <v-tab>
        Add friend
        <v-icon color=var(--dark-color)>mdi-account-plus-outline</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items
        v-model="tab"
    >
      <v-tab-item>
        <v-list subheader
                class="list">
          <v-subheader>Friend requests</v-subheader>
          <v-list-item
              v-if="updateFriendRequests === null">
            <v-list-item-content>
              <v-list-item-subtitle>New friend requests will show up here</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              v-for="request in updateFriendRequests"
              :key="request">
            <v-list-item-avatar>
              <v-img
                  :alt="`${request.userName} avatar`"
                  :src="request.avatar"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="request.userName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn
                  depressed
                  icon
                  color="error"
                  dark
                  class="mr-4"
                  @click="declineRequest(request)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn
                  depressed
                  color=var(--main-color)
                  dark
                  icon
                  @click="acceptRequest(request)">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>
          <v-subheader>My friends</v-subheader>

          <v-list-item
              v-for="friend in updateFriends"
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
      </v-tab-item>
      <v-tab-item>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Friends"
            single-line
            @keyup.enter="postQuery()"
        ></v-text-field>
        <v-list>
          <v-list-item
              v-for="(friend, i) in searching"
              :key="i"
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
                  v-if="friend.state==='1'"
                  disabled
                  class="text-capitalize">
                <!--@click="acceptRequest(friends)" -->
                Friends
              </v-btn>
              <v-btn
                  v-else-if="friend.state==='0'"
                  depressed
                  color=var(--main-color)
                  outlined
                  class="text-capitalize">
                <!--@click="acceptRequest(friends)" -->
                Pending
              </v-btn>
              <v-btn
                  v-else
                  depressed
                  color=var(--main-color)
                  dark
                  class="text-capitalize"
                  @click="postFriendId(friend); postQuery()"
              >
                Add Friend
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>

  </v-container>

    

</template>

<script>

import axios from "axios";

export default {
  name: "friends",

  data: () => ({
    search: '',
    searchResult: null,
    tab: null
  }),

  mounted() {
    //uncomment these lines when deploying
    //this.$store.dispatch('fetchFriends');
    //this.$store.dispatch('fetchFriendRequests');
  },

  methods: {
    postUnFriendId(friend) {
      const unFriendId = JSON.stringify({
        userId :friend.userId
      });
      let formData = new FormData()
      formData.append('data', unFriendId)
      axios.post('/public/friends/unfriend', formData).then(function (response) {console.log(response);})

      this.$store.commit('removeFriend', friend);
    },

    postFriendId: function (friends) {
      const friendId = JSON.stringify({
        userId_2: friends.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/addFriend', formData).then(response=>{
        console.log(response["data"])
      });
    },

    postQuery: function () {
      const search_string = JSON.stringify({
        search_string: this.search
      });
      console.log(search_string)
      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', search_string)

      axios.post('/public/friends/search', formData).then(response=>{
        this.searchResult=response["data"];
      });

      //this is dummy data. Take out when deploying
      this.searchResult = [
        {
          userId: '1',
          state: '1',
          avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
          photoPath: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
          leafId: '0',
          userName: "Seppe Fleerackers",
          takenDate: "Yesterday 11:43",
          title: "Mushroom I spotted this morning!"
        },
        {
          userId: '2',
          state: null,
          avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598",
          photoPath: "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
          leafId: '1',
          userName: "Marnix Lijnen",
          takenDate: "Yesterday 12:43",
          title: "Walking with the boys"
        },
      ];
    },

    acceptRequest:function (request){
      const friendId = JSON.stringify({
        userId_1: request.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/acceptFriendRequest', formData).then(function (response) {console.log(response);})
      this.$store.commit('acceptFriendRequest', request);
      this.$store.commit('deleteFriendRequest', request);
    },

    declineRequest: function (request) {
      const friendId = JSON.stringify({
        userId: request.userId
      });

      // let currentObj = this;
      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/unfriend', formData).then(response=>{
        console.log(response["data"])
      });
      this.$store.commit('deleteFriendRequest', request);
    },
  },

  computed: {
    updateFriends() {
      return this.$store.getters.getFriendsData;
    },
    updateFriendRequests(){
      return this.$store.getters.getFriendsRequests;
    },
    friendRequestNotifications(){
      return this.$store.getters.getFriendRequestNotifications;
    },

    searching () {
      if (!this.search) return this.searchResult

      const search = this.search.toLowerCase()
      return this.searchResult.filter(result => {
        const text = result.userName.toLowerCase()

        return text.indexOf(search) > -1

      })
    }
  }

}
</script>


<style scoped>

.friend_page_container{
  width: 100%;
  max-width: 750px;
}

</style>