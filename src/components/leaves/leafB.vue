<template>
  <svg class="svg_leaf" viewBox="0 0 640 480"
       xmlns="http://www.w3.org/2000/svg"
       >
    <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
    <title>leaf</title>
    <g>
      <title>Layer 1</title>
      <path id="svg_1" d="m595.223816,392.677551c-387.070389,163.258362 -545.501865,-257.993881 -522.358368,-295.871704c23.143494,-37.877827 480.03891,-87.727917 522.358368,295.871704z" stroke-width="5"   />
      <text id="text" x="270" y="60" font-family="'Lato', sans-serif" font-size="50" fill="white" :xlink:href="this.text">
        {{this.text}}
      </text>
      <text id="text2" x="-550" y="-40" font-family="'Lato', sans-serif" font-size="50" fill="white" :xlink:href="this.text2">
        {{this.text2}}
      </text>


    </g>
  </svg>
</template>

<script>
export default {
  name: "leafB",
  props: {
    text:String,
    text2:String,

  },
}
</script>

<style scoped>
#text{
  -webkit-transform:rotate(30deg);
  -moz-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  -o-transform: rotate(30deg);
  transform: rotate(30deg);
}
#text2{
  -webkit-transform:rotate(30deg);
  -moz-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  -o-transform: rotate(210deg);
  transform: rotate(210deg);
}


</style>