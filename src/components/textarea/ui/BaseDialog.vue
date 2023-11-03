<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="show" @click="$emit('close')"></div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="show">
      <button
        @click="$emit('close')"
        tabindex="0"
        type="button"
        class="exit-button"
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"
          />
        </svg>
      </button>
      <slot></slot>
      <div class="footer">
        <button class="cancel" @click="handleButtonClick">
          {{ leftButtonText || "Poništi" }}
        </button>
        <button
          @click="$emit('click-submit')"
          :disabled="isSubmitDisabled"
          class="insert"
          :class="{
            'disable-button': isDisabledClass,
            apply: isApplyButton,
            insert: isInsertButton,
            delete: isDeleteButton,
          }"
        >
          {{ rightButtonText }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [
    "show",
    "isSubmitDisabled",
    "isDisabledClass",
    "rightButtonText",
    "leftButtonText",
  ],
  emits: ["close", "click-submit", "click-cancel"],
  computed: {
    isApplyButton() {
      return this.rightButtonText.trim().toUpperCase() === "Umetni";
    },
    isInsertButton() {
      return this.rightButtonText.trim().toUpperCase() === "Poništi";
    },
    isDeleteButton() {
      return this.rightButtonText.trim().toUpperCase() === "OBRIŠI";
    },
  },
  methods: {
    handleButtonClick() {
      if (
        this.leftButtonText &&
        this.leftButtonText.trim().toUpperCase() !== "Poništi"
      ) {
        this.$emit("click-cancel");
      } else if (!this.leftButtonText) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: fit-content;
  max-height: 90%;
  overflow: auto;
  margin: auto;
  width: fit-content;
  min-width: 30%;
  max-width: 80%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}

.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

.footer {
  justify-content: flex-end;
  display: flex;
  grid-column: 1/-1;
  grid-row: -1/-1;
  height: 4rem;
  margin-top: auto;
}

.footer button {
  flex: 0 1 50%;
  height: 4rem;
  margin: 0;
  max-width: none;
  padding-bottom: 2rem;
  padding-top: 1rem;
  padding: calc(0.875rem - 3px) 63px calc(0.875rem - 3px) 15px;
  color: white;
}
/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

/*BASE BUTTONS*/
.buttons-container {
  display: flex;
  margin-top: 50px;
}
.cancel {
  background-color: #393939;
}

.insert {
  background-color: var(--main__color);
}

.apply {
  background-color: #1a90ff;
}

.delete {
  background-color: #ff0000;
}

.disable-button {
  background-color: #00336682;
  cursor: default;
}
</style>
