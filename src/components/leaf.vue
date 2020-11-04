<template>
  <svg viewBox="0 0 600 600">
    <defs>
      <clipPath id="leaf">
        <path :d="leaf_shape" transform="translate(0 50)"/>
      </clipPath>
    </defs>

    <path :d="leaf_shape" transform="translate(0 50)"/>

    <g clip-path="url(#leaf)">
      <image preserveAspectRatio="xMidYMid slice" :xlink:href="picture" transform="translate(0 50)"/>
    </g>

    <defs>
      <clipPath id="profile">
        <circle r=77 cx=450 cy=475></circle>
      </clipPath>
    </defs>

    <circle r=77 cx=450 cy=475></circle>

    <g clip-path="url(#profile)">
      <image preserveAspectRatio="xMidYMid slice" :xlink:href="avatar"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: "leaf",

  data: () => ({
    svg_height: 600,
    svg_width: 600,
    leaf_shape: "M503.141,8.696c-0.016,0-215.215-56.483-390.225,118.511 C-31.579,271.711,96.155,415.69,96.155,415.69s143.979,127.742,288.476-16.775C559.64,223.928,503.156,8.728,503.141,8.696z",
    avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
    picture: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
  }),
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