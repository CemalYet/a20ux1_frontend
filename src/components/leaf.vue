<template>
  <svg :viewBox=this.leafSVG[0].svgSize>
    <defs>
      <clipPath id="leaf">
        <path :d="this.leafSVG[0].svgData" transform="translate(0 50)"/>
      </clipPath>
    </defs>

    <path :d="this.leafSVG[0].svgData" transform="translate(0 50)"/>

    <g clip-path="url(#leaf)">
      <image preserveAspectRatio="xMidYMid slice" :xlink:href="this.userData[0].picture" transform="translate(0 50)"/>
    </g>

    <defs>
      <clipPath id="profile">
        <circle r=77 cx=450 cy=475></circle>
      </clipPath>
    </defs>

    <circle r=77 cx=450 cy=475></circle>

    <g clip-path="url(#profile)">
      <image preserveAspectRatio="xMidYMid slice" :xlink:href="this.userData[0].avatar"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: "leaf",

  data: () => ({

  }),

  //props: ['leafSVG', 'userData'],
  props: {
    leafSVG: Array,
    userData: Array
  }
}
</script>

<style scoped>
svg {
  max-height: 300px;
  max-width: 300px;
}

image {
  width: 100%;
  height: 100%;
}

svg:active > circle {
  stroke: var(--dark-color);
}

svg > path {
  fill: var(--main-color);
  stroke: var(--main-color);
  stroke-width: 20px;
}

svg > circle {
  fill: var(--main-color);
  stroke: var(--main-color);
  stroke-width: 15px;
}

svg:hover > path {
  stroke: none;
}
</style>