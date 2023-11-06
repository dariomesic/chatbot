<template>
  <svg
    :class="{ visible: isVisible, hidden: !isVisible }"
    v-if="sortIcon === 1"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="22"
    height="22"
    viewBox="0 0 32 32"
    aria-hidden="true"
    class="bx--table-sort__icon-unsorted"
  >
    <path
      d="M27.6 20.6L24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22zM9 4L3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"
    ></path>
  </svg>
  <svg
    v-else-if="sortIcon === 2"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enable-background="new 0 0 32 32"
    xml:space="preserve"
    width="22"
    height="22"
    fill="currentColor"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <line
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        x1="16"
        y1="6"
        x2="16"
        y2="28"
      ></line>
      <polyline
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        points="7.5,14 16,5.5 24.5,14 "
      ></polyline>
    </g>
  </svg>
  <svg
    v-else-if="sortIcon === 3"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enable-background="new 0 0 32 32"
    xml:space="preserve"
    width="22"
    height="22"
    fill="currentColor"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <line
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        x1="16"
        y1="26"
        x2="16"
        y2="4"
      ></line>
      <polyline
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
        points="24.5,18 16,26.5 7.5,18 "
      ></polyline>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    sortIcon: Number,
    isVisible: Boolean,
  },
};
</script>

<style scoped>
.visible {
  visibility: visible;
}
.hidden {
  visibility: hidden;
}
</style>
