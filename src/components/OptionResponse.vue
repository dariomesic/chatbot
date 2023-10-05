<template>
  <base-dialog
    :show="show_modal"
    @click-submit="applyOptions"
    @close="$emit('close')"
    :buttonText="'Primijeni'">
      <div>
        <h3>Uredi opcije</h3>
        <p>Unesite popis opcija</p>
        <button class="color-button" style="align-self: flex-end;margin-left: auto;display:block" @click="addNewOption()">Dodaj novu opciju +</button>
        <hr/>
        <transition-group name="list" tag="ul">
          <li v-for="(option, index) in response_options" :key="index" style="align-items: center;display: flex;margin-top: .5rem;">
            <div style="align-items: flex-start;display: flex;flex-direction: column;width: 100%;">
              <div style="display: flex;position: relative;width: 100%;">
                <input style="min-height: 48px;padding-right: 3rem;scroll-margin-bottom: 2rem;width: 100%;" type="text" @blur="handleBlur($event, index)" :value="response_options[index]" aria-describedby="" autocomplete="off">
              </div>
            </div>
            <button @click="removeOption(index)" tabindex="0" type="button" style="align-items: center;cursor: pointer;display: inline-flex;overflow: visible;position: relative;padding-left: .9375rem;padding-right: .9375rem;padding: calc(.875rem - 3px) 16px;">
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                <path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
              </svg>
            </button>
          </li>
        </transition-group>
      </div>
  </base-dialog>
</template>

<script>
export default {
  props: ['show_modal', 'options'],
  emits: ['close'],
  data() {
    return {
      response_options: [...this.options],
    };
  },
  methods: {
    addNewOption() {
      this.response_options.push('');
    },
    removeOption(index) {
      this.response_options.splice(index, 1);
    },
    handleBlur(event, index) {
      this.response_options[index] = event.target.value;
    },
    applyOptions() {
      this.$emit('addOptions', this.response_options); // Emit options to parent component
      this.$emit('close');
    },
  },
};
</script>
<style scoped>
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
  padding: 0 1rem;
  transition: background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9);
  width: 100%;
}
</style>