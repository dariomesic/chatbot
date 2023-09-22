<template>
  <div class="custom-select-wrapper" tabindex="1">
    <div class="custom-select" @click="optionsVisible = !optionsVisible">
      <div class="selected-option">
        <span class="option-text">{{ selectedOption }}</span>
        <svg class="arrow-icon" viewBox="0 0 16 16">
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          <title>Open menu</title>
        </svg>
      </div>
      <div v-show="optionsVisible" class="options">
        <div class="option" v-for="option in options" :key="option" @click="selectOption(option)" tabindex="1">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: Number, // The value prop for v-model
  },
  emits: ['update:value'], // Event for v-model
  data() {
    return {
      optionsVisible: false,
    };
  },
  computed: {
    selectedOption: {
      get() {
        return this.value; // Get the value from the prop
      },
      set(newValue) {
        this.$emit('update:value', newValue); // Emit the event to update the prop
      },
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option; // Set the selected option
      this.optionsVisible = false; // Close the options
      event.stopPropagation();
    },
  },
};
</script>
<style scoped>
.custom-select-wrapper {
  display: flex;
  align-items: center;
}

.custom-select:hover {
  background: var(--hover__color);
  transition: .2s;
}

.custom-select-wrapper:focus {
  outline:.125rem solid #0f62fe
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
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selected-option {
  display: flex;
  align-items: center;
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
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 2;
}

.option {
  background: white;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s;
  cursor: pointer;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  background-color: #f5f5f5;
  transition: .2s;
}

.option:focus {
  border: 1px solid #0f62fe
}
</style>