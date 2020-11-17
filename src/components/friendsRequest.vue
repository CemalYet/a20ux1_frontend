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
      >
        <v-icon x-large color=var(--main-color)>mdi-account-multiple-plus</v-icon>
      </v-btn>

      <v-btn
          icon
      >
        <v-icon style="vertical-align: middle" x-large color=var(--main-color) >mdi-account-question</v-icon>
      </v-btn>

    </v-row>

    <v-row
        align="center"
        justify="space-around" >

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


    <v-list subheader>
      <v-list-item
          v-for="friend in friends"
          :key="friend.title"
      >
        <v-list-item-avatar>
          <v-img
              :alt="`${friend.title} avatar`"
              :src="friend.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="friend.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn
              depressed
              color=var(--main-color)
              dark
              class="text-capitalize">
            Accept
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "addFriends",
  data: () => ({
    friends: [
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
    ],
  }),

}
</script>

<style scoped>
.divider{
  border-color: #39796b;
}
</style>