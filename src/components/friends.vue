<template>

    <v-container
        class="mx-auto"
        max-width="500"
    >
      <v-row
          align="center"
          justify="space-around">
        <v-btn icon>
          <v-icon x-large color=var(--main-color)>mdi-account-multiple-plus</v-icon>
        </v-btn>

        <v-btn
            color=var(--dark-color)
            icon
            window.location.href="/friendsrequest"
        >
          <router-link to="/friendsrequest">
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
      <v-list subheader>
        <v-list-item
            v-for="friend in ali"
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
                   class="text-capitalize">
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
    ali: null,
    drawer: false,
    group: null,
    notifications: 2,
    userData: null,
  }),

  mounted() {
    //axios.defaults.baseURL='http://localhost:8080/';
    axios.get('/public/sharecontroller/getFriends').then(response => (this.ali = response["data"]))

    //axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    console.log(this.ali)
  },

}
</script>


<style scoped>

</style>