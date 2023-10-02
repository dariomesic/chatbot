<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="$emit('close')"></div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="showModal">
      <button @click="$emit('close')" tabindex="0" type="button" style="position:absolute;top:0;right:0;padding: .75rem;width: 3rem;height: 3rem;">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 32 32">
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"/>
        </svg>
      </button>
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
        <div class="footer">
          <button style="background-color: #393939;" @click="$emit('close')">Poništi</button>
          <button style="background: var(--main__color)" @click="applyOptions()">Primijeni</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show_modal', 'options'],
  emits: ['close'],
  data() {
    return {
      showModal: false,
      response_options: [...this.options],
    };
  },
  watch: {
    show_modal: {
      handler(val) {
        this.showModal = val;
      },
      deep: true, // provides initial (not changed yet) state
    },
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
  width: 30%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 999;
  transform: none;
}

.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
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

.footer{
  justify-content: flex-end;
  display: flex;
  grid-column: 1/-1;
  grid-row: -1/-1;
  height: 4rem;
  margin-top: auto;
}

.footer button{
  flex: 0 1 50%;
  height: 4rem;
  margin: 0;
  max-width: none;
  padding-bottom: 2rem;
  padding-top: 1rem;
  padding: calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;
  color: white;
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
  padding: 0 1rem;
  transition: background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9);
  width: 100%;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
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
</style>