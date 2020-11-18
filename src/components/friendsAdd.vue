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
        label="Search News"
        single-line
    ></v-text-field>
    <v-list three-line>
      <v-list-item
          v-for="(item, i) in searching"
          :key="i"
          ripple
          @click="() => {}"
      >
        <v-img
            :src="item.image"
            class="mr-4"
            max-width="64"
            min-width="64"
        ></v-img>

        <v-list-item-content>
          <span
              class="text-uppercase font-weight-regular caption"
              v-text="item.category"
          ></span>

          <div v-text="item.title"></div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-container>
</template>

<script>
export default {
  name: "friendsAdd"
}
</script>

<style scoped>

</style>