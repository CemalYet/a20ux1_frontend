<template>
  <v-app>
    <v-app-bar
        hide-on-scroll
        absolute
        color="white"
        scroll-target="#scrolling-techniques-4"
    >
      <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>snAPP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-bottom-navigation
          absolute
          hide-on-scroll
          horizontal
          scroll-target="#hide-on-scroll-example"
      >
        <v-btn
            color="deep-purple accent-4"
            text
        >
          <span>Recents</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn
            color="deep-purple accent-4"
            text
        >
          <span>Favorites</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn
            color="deep-purple accent-4"
            text
        >
          <span>Nearby</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>
