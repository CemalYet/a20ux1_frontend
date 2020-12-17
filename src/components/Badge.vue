<template>
    <div class="badge">
        <div shaped class="rounded-card mx-auto mt-5">
            <img class="badge_icon" src="../assets/badge_icon.png" >
            <spam class="badgeText">
                <v-card-title class="badgeTitle">{{ title }}</v-card-title>
                <v-card-subtitle class="badgeSubtitle"> {{ $t('badges.noMessage') }} </v-card-subtitle>
            </spam>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },

  },
  
  // created: function() {}
}
</script>

<style>
.badge{
    display: inline-block;
    margin: 1rem;
    margin-top: -1rem;
}

.rounded-card {
    border-radius: 24px;
    border: 2px solid black;
    box-shadow: 0 4px 2px -2px gray;
    background-color: white;
    padding: 1rem;
}

.badge_icon{
    display: inline-block;
    vertical-align:middle;
    width: 20%;
}

.badgeText{
    display: inline-block;
    vertical-align: middle;
    top: 80%;
    line-height: 12pt;
    font-family: 'Lato', sans-serif;
}

.badgeTitle{
    font-size: 24px;
    font-weight: 700;
}

.badgeSubtitle{
    font-size: 16px;
    font-weight: 300;
}

</style>