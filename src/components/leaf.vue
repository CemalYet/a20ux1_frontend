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

svg:hover > path {
  fill: var(--light-color);
  stroke: var(--light-color);
  stroke-width: 10px;
}
</style>