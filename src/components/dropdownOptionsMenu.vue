<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon large color=var(--dark-color)>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <router-link to="profile/edit">
        <v-list-item>
          <v-icon
              color=var(--dark-color)
              left>
            mdi-account-edit-outline
          </v-icon>
          <v-list-item-title>Edit profile</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="camera">
        <v-list-item>
          <v-icon
              color=var(--dark-color)
              left>
            mdi-logout
          </v-icon>
          <v-list-item-title>logout</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "dropdownOptionsMenu"
}
</script>

<style scoped>

</style>