<template>
  <base-dialog
    :show="show"
    @click-submit="insertLink"
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
  props: ["show", "getSelection",],
  emits: ["close-dialog", "click-submit"],
  data() {
    return {
      linkText: "",
      linkUrl: "https://",
      validUrl: false,
    };
  },
  methods: {
    insertLink() {
      const link = document.createElement("a");
      if (this.linkText.length === 0) {
        link.textContent = this.linkUrl;
      } else {
        link.textContent = this.linkText;
      }
      link.href = this.linkUrl;
      link.target = "_blank";
      link.setAttribute("contenteditable", "false");
      if (this.getSelection) {
        this.getSelection.deleteContents();
        this.getSelection.insertNode(link);
      } else {
        const editor = document.getElementById("editorId");
        editor.appendChild(link);
      }
      this.$emit("close-dialog");
      this.resetInput();
      this.validUrl = false;
    },
    resetInput() {
      this.linkText = "";
      this.linkUrl = "";
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

input{
  background-color: #f4f4f4;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  color: #161616;
  font-size: .875rem;
  font-weight: 400;
  height: 2.5rem;
  letter-spacing: .16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding-left: 10px;
  width: calc(100% - 10px);
  transition: background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9);
}
</style>
