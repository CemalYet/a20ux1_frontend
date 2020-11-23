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
        <v-list-item @click="goToEdit">
          <v-icon
              color=var(--dark-color)
              left>
            mdi-pencil-outline
          </v-icon>
          <v-list-item-title>Edit post</v-list-item-title>
        </v-list-item>
        <v-list-item @click.stop="deletePost">
          <v-icon
              color=var(--dark-color)
              left>
            mdi-delete-outline
          </v-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "dropDownMenuED",

  methods:{
    goToEdit(){
      this.$router.push({path:`${this.$route.params.discovery_id}/edit`});
    },
    deletePost(){
      this.$store.commit("updateDeleteDialog", true);
    }
  }
}
</script>

<style scoped>

</style>