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
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search Friends"
        single-line
    ></v-text-field>
    <v-list three-line>
      <v-list-item
          v-for="(friends, i) in searching"
          :key="i"
          ripple
          @click="() => {}"
      >
        <v-list-item-avatar>
          <v-img
              :alt="`${friends.title} avatar`"
              :src="friends.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="friends.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn
              depressed
              color=var(--main-color)
              dark
              class="text-capitalize">
            Add Friend
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    </v-container>
</template>

<script>
export default {
  name: "friendsAdd",
  data: () => ({
    friends: [
      {

        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {

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
    search: '',
  }),
  computed: {
    searching () {
      if (!this.search) return this.friends

      const search = this.search.toLowerCase()

      return this.friends.filter(friends => {
        const text = friends.title.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
  },
}

</script>

<style scoped>

</style>