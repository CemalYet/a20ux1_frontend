<template>
  <svg :viewBox=this.leafSVG.svgSize>
    <defs>
      <clipPath id="leaf">
        <path :d="this.leafSVG.svgData" />
      </clipPath>
    </defs>

    <path :d="this.leafSVG.svgData" />

    <g clip-path="url(#leaf)">
      <image preserveAspectRatio="xMidYMid slice" :xlink:href="this.discoveries.picture" />
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
    leafSVG: Object,
    discoveries: Object
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

svg:hover > path {
  fill: var(--main-color);
  stroke: var(--main-color);
  stroke-width: 20px;
}

svg > circle {
  fill: var(--main-color);
  stroke: var(--main-color);
  stroke-width: 15px;
}
</style>