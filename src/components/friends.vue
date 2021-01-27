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
        {{ $t('friendsPage.myFriend') }}
        <v-icon color=var(--dark-color)>mdi-account-multiple-outline</v-icon>
        <v-badge
            color="red"
            :content="updateFriendRequests.length"
            :value="updateFriendRequests.length"
            offset-x="-3"
            offset-y="30"
        ></v-badge>
      </v-tab>
      <v-tab>
        {{ $t('friendsPage.addFriend') }}
        <v-icon color=var(--dark-color)>mdi-account-plus-outline</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items
        v-model="tab"
    >
      <v-tab-item>
        <v-list subheader
                class="list">
          <v-header> {{ $t('friendsPage.friendReq') }}</v-header>
          <v-list-item
              v-if="updateFriendRequests.length === 0">
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('friendsPage.friendReqMes') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              v-else
              v-for="request in updateFriendRequests"
              :key="request">
            <avatar :size="52" :user-name="request.userName" :picture="request.avatar"
                    @click.native="goToUser(request.userId)">
                   </avatar>


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
          <v-header> {{ $t('friendsPage.myFriend') }}</v-header>

          <loader v-if="updateFriends.length === 0 && updateFriendsDataLoading"></loader>
          <div  v-if="updateFriends.length === 0 && !updateFriendsDataLoading" style="padding-top: 16px; text-align: center">
            <div class="text-h4"> {{ $t('friendsPage.noFriends') }}  </div>
            <div class="text-subtitle-1"> {{ $t('friendsPage.inviteSomeFriends') }} </div> 
          </div>

          <v-list-item
              v-for="friend in updateFriends"
              :key="friend.userName"
          >
            <avatar :size="52" :user-name="friend.userName" :picture="friend.avatar"
                    @click.native="goToUser(friend.userId)"></avatar>


            <v-list-item-content @click="goToUser(friend.userId)">
              <v-list-item-title v-text="friend.userName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn depressed
                     class="text-capitalize"
                     v-on:click="postUnFriendId(friend)">
                {{ $t('buttons.unFriend') }}
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            color="var(--dark-color)"
            :label="$t('friendsPage.searchField')"
            single-line
            @keyup.enter="postQuery()"
        ></v-text-field>
        <v-list>
          <v-list-item
              v-for="friend in searchResult"
              :key="friend.userName"
          >
            <avatar :size="52" :user-name="friend.userName" :picture="friend.avatar"
                    @click.native="goToUser(friend.userId)"></avatar>

            <v-list-item-content @click="goToUser(friend.userId)">
              <v-list-item-title v-text="friend.userName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn
                  v-if="parseInt(friend.state)===1"
                  disabled
                  class="text-capitalize">
                <!--@click="acceptRequest(friends)" -->
                {{ $t('buttons.friends') }}
              </v-btn>
              <v-btn
                  v-else-if="parseInt(friend.state)===0"
                  depressed
                  color=var(--main-color)
                  outlined
                  class="text-capitalize">
                <!--@click="acceptRequest(friends)" -->
                {{ $t('buttons.pending') }}
              </v-btn>
              <v-btn
                  v-else
                  depressed
                  color=var(--main-color)
                  dark
                  class="friend_request_button text-capitalize"
                  @click="postFriendId(friend)"
              >
                {{ $t('friendsPage.addFriend') }}
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>

  </v-container>

    

</template>

<script>
import avatar from "@/components/avatar";
import loader from "@/components/loader";
import axios from "axios";
import {mdiAccountMultipleOutline} from '@mdi/js';
import {mdiAccountPlusOutline} from '@mdi/js';
import {mdiClose} from '@mdi/js';
import {mdiCheck} from '@mdi/js';

export default {
  name: "friends",

  metaInfo:{
    title: "Your friends",
  },

  data: () => ({
    search: '',
    searchResult: null,
    tab: null,
    mdiAccountMultipleOutline: mdiAccountMultipleOutline,
    mdiAccountPlusOutline: mdiAccountPlusOutline,
    mdiClose: mdiClose,
    mdiCheck: mdiCheck
  }),

  components: {
    avatar,
    loader
  },

  mounted() {
    this.$store.dispatch('fetchFriendRequests');
    this.$store.dispatch('fetchFriends');
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

    postFriendId: function (user) {
      const userId = JSON.stringify({
        userId_2: user.userId
      });

      let formData = new FormData()
      formData.append('data', userId)

      axios.post('/public/friends/addFriend', formData).then(function (response) {console.log(response);})

      for(let result of this.searchResult){
        console.log(result.state)
        if(user.userId === result.userId){
          console.log(user.userId + " changed state to 0")
          result.state = 0;
          break;
        }
      }
    },

    postQuery: function () {
      const search_string = JSON.stringify({
        search_string: this.search
      });
      console.log(search_string)
      let formData = new FormData()
      formData.append('data', search_string)

      axios.post('/public/friends/search', formData).then(response=>{
        this.searchResult=response["data"];
      });
    },

    acceptRequest:function (request){
      const friendId = JSON.stringify({
        userId_1: request.userId
      });

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

      let formData = new FormData()
      formData.append('data', friendId)

      axios.post('/public/friends/unfriend', formData).then(response=>{
        console.log(response["data"])
      });
      this.$store.commit('deleteFriendRequest', request);
    },
    goToUser(user_id){
      console.log(user_id);
      if(typeof(user_id)!=='undefined'){
        this.$router.push({path: `/profile/${user_id}`})
      }
    }

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
    updateFriendsDataLoading:{
      get(){
        return this.$store.getters.getFriendsDataLoading;
      },
      set(value){
        this.$store.commit('updateFriendsDataLoading', value);
      }
    }

  }

}
</script>


<style scoped>

.friend_page_container{
  width: 100%;
  max-width: 750px;
}
.list{
  background: transparent;
}

.friend_request_button {
  width: 115px;
}

</style>