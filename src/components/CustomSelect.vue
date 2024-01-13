<template>
  <div class="custom-select-wrapper" tabindex="1">
    <div class="custom-select" @click="toggleOptions">
      <div class="selected-option">
        <span class="option-text" :innerHTML="selectedOption" />
        <svg class="arrow-icon" viewBox="0 0 16 16">
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          <title>Open menu</title>
        </svg>
      </div>
      <div v-show="optionsVisible" class="options" :style="position === 'up' ? { bottom: '100%', top: 'unset', borderTop: '1px solid #0f62fe' } : {}">
        <div
          class="option"
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          tabindex="1"
          :innerHTML="option"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: [Number, String], // The value prop for v-model
    placeholder: String,
    position: String,
  },
  emits: ["update:value"], // Event for v-model
  data() {
    return {
      optionsVisible: false,
    };
  },
  computed: {
    selectedOption: {
      get() {
        return this.value || this.placeholder; // Get the value from the prop
      },
      set(newValue) {
        this.$emit("update:value", newValue); // Emit the event to update the prop
      },
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option; // Set the selected option
      this.optionsVisible = false; // Close the options
      event.stopPropagation();
    },
    toggleOptions() {
      this.optionsVisible = !this.optionsVisible;
      if (this.optionsVisible) {
        document.addEventListener("click", this.closeOptionsOnOutsideClick);
      } else {
        document.removeEventListener("click", this.closeOptionsOnOutsideClick);
      }
    },

    closeOptionsOnOutsideClick(event) {
      const customSelect = this.$el.querySelector(".custom-select");
      if (!customSelect.contains(event.target)) {
        this.optionsVisible = false;
        document.removeEventListener("click", this.closeOptionsOnOutsideClick);
      }
    },
  },
};
</script>

<style scoped>
.custom-select-wrapper {
  display: flex;
  align-items: center;
  max-width: 100%;
}

.custom-select:hover {
  background: var(--hover__color);
  transition: 0.2s;
}

.custom-select-wrapper:focus {
  outline: 0.125rem solid #0f62fe;
}

.custom-select {
  width: -webkit-fill-available;
  width: -moz-available;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-bottom: 1px solid #161616;
  padding: 0 3rem 0 1rem;
  height: 2rem;
  max-height: 2rem;
  cursor: pointer;
}

.selected-option {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  min-width: 1rem;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 1rem;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: 100%;
  background-color: #fff;
  border: 1px solid #0f62fe;
  border-top: none;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  background: white;
  display: block;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s;
  cursor: pointer;
  word-break: break-word;
}

.option-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  max-height: 1.1rem;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  background-color: #f5f5f5;
  transition: 0.2s;
}
</style>
