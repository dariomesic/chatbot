<template>
  <base-dialog
    :show="show"
    @click-submit="triggerInsertLink"
    @close="$emit('close-dialog')"
    :rightButtonText="'Umetni'"
    :isSubmitDisabled="!validUrl"
    :isDisabledClass="!validUrl"
  >
    <div class="main-content">
      <div class="form-control">
        <h3>Unesi link</h3>
        <label for="link-text">Oznaka (opcionalno)</label>
        <input
          type="text"
          id="link-text"
          placeholder="Link text"
          v-model.trim="linkText"
        />
      </div>
      <div class="form-control">
        <label for="link-url">URL</label>
        <input
          type="url"
          id="link-url"
          pattern="https://.*"
          placeholder="https://example.com"
          v-model.trim="linkUrl"
          @paste="validateUrl"
          @input="validateUrl"
        />
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "insertLink"],
  emits: ["close-dialog", "click-submit"],
  data() {
    return {
      linkText: "",
      linkUrl: "https://",
      validUrl: false,
    };
  },
  methods: {
    triggerInsertLink() {
      this.$emit("get-data", this.linkText, this.linkUrl);
      this.insertLink();
      this.resetInput();
      this.$emit("close-dialog");
    },
    resetInput() {
      this.linkText = "";
      this.linkUrl = "";
      this.validUrl = false;
    },
    validateUrl() {
      try {
        new URL(this.linkUrl);
        this.validUrl = true;
      } catch (error) {
        this.validUrl = false;
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 10px 0;
}

input,
label {
  display: block;
  font: inherit;
}

label {
  color: #555353;
  margin-bottom: 6px;
  font-size: 16px;
}

input {
  background-color: #f4f4f4;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  color: #161616;
  font-size: 0.875rem;
  font-weight: 400;
  height: 2.5rem;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding-left: 10px;
  width: calc(100% - 10px);
  transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
    outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
</style>
