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
            <v-icon style="vertical-align: middle" x-large color=var(--main-color)>mdi-account-multiple-plus</v-icon>
          </router-link>
        </v-btn>
        <v-btn
            color=var(--dark-color)
            icon
            window.location.href="/friends"
        >
          <router-link class="router" to="/friends">
            <v-icon style="vertical-align: middle" x-large color=var(--main-color)>mdi-account-multiple</v-icon>
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
          justify="space-around">
       <p class="ml-2">Add Friend</p><p class="ml-5">Friends</p><p>Friend Request</p>
      </v-row>
      <v-divider class="divider"></v-divider>
      <v-list subheader
              class="list"
              v-if="updateFriends!==null">
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
    </v-container>
    

</template>

<script>

export default {
  name: "friends",

  mounted() {
    this.$store.dispatch('fetchFriends');
  },

  methods: {
    postUnFriendId(friend) {
      this.$store.dispatch('postUnfriendId', friend);

    },
  },

  computed: {
    updateFriends() {
      return this.$store.getters.getFriendsData;
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