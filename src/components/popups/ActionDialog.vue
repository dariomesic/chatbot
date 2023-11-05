<template>
  <base-dialog
    :show="showDialog"
    @click-submit="$emit('confirm-action')"
    @click-cancel="$emit('click-cancel')"
    @close="$emit('close')"
    :leftButtonText="leftButtonText"
    :rightButtonText="rightButtonText"
  >
    <div class="content-wrapper">
      <h3><slot name="title"></slot></h3>
      <p><slot name="text"></slot></p>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["showDialog", "leftButtonText", "rightButtonText"],
  emits: ["confirm-action", "close","click-cancel"],
};
</script>

<style scoped>
.content-wrapper {
  width: 25vw;
  margin-bottom: 40px;
}
</style>
