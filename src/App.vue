<template>
  <router-view name="layout"></router-view>
</template>

<script>
export default {
  name: 'App',

  metaInfo:{
    title: "snAPP nature",
    titleTemplate: "%s | snAPP nature web app",
    meta:[
      {name: 'description', content: 'snaPP nature, an application where you can scan plants and share discoveries with friends and family!'}
    ],
  }
};
</script>

<style>
@import 'styles.css';
</style>