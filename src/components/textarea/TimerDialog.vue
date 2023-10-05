<template>
  <base-dialog
    :show="show"
    @close="$emit('close-dialog')"
    @click-submit="setTimer"
    :buttonText="'Primijeni'"
  >
    <div class="main-content">
      <h3>Add a pause response</h3>
      <p>Insert a pause before sending the next message to the channel</p>
      <div style="display:flex;margin-bottom: 3rem;justify-content: space-around;">
        <div class="form-control">
          <label for="duration">Duration (sec)</label>
          <div class="input-group">
            <input type="button" class="minus" value="-" @click="decrement" />
            <input
              type="number"
              id="duration"
              max="10"
              min="1"
              v-model.number="duration"
              @keydown="checkValidKey"
              @input="checkValue"
            />
            <input type="button" class="plus" value="+" @click="increment" />
          </div>
          <p v-if="!isValid" style="color: red">
            "Too high,maximum duration is 5 seconds."
          </p>
        </div>
        <div class="preview-card">
          <header class="timer-preview-header">
            <h4>Pause preview</h4>
            <button @click="refresh">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2.4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556"
                ></path>
              </svg>
            </button>
          </header>
          <div class="preview-container">
            <p>Hello! This is what a pause will look like.</p>
            <base-typing-indicator v-if="isTyping"></base-typing-indicator>
            <p v-else>Message after pause</p>
          </div>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "insertTimer",],
  emits: ["close-dialog", "get-duration"],
  data() {
    return {
      duration: 1,
      isValid: true,
      isTyping: true,
      timerId: null,
    };
  },
  watch: {
    duration: "startTimer",
    show: "startTimer",
  },
  methods: {
    checkValidKey(event) {
      const invalidKeys = ["e", "E", "+", "-", ".", "0"];
      if (invalidKeys.includes(event.key)) {
        event.preventDefault();
      }
    },
    checkValue() {
      if (this.duration > 10) {
        this.isValid = false;
        this.duration = 10;
      } else {
        this.isValid = true;
      }
    },
    increment() {
      if (this.duration < 10) {
        this.duration++;
      }
    },
    decrement() {
      if (this.duration > 1) {
        this.duration--;
      }
    },
    setTimer() {
      this.$emit("get-duration", this.duration);
      this.insertTimer();
      this.$emit("close-dialog");
    },
    resetTimer() {
      this.duration = 1;
    },
    startTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.isTyping = true;
      this.timerId = setTimeout(() => {
        this.isTyping = false;
      }, this.duration * 1000);
    },
    refresh() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.isTyping = true;
      this.timerId = setTimeout(() => {
        this.isTyping = false;
      }, this.duration * 1000);
    },
  },
};
</script>

<style scoped>
label {
  color: #555353;
  margin-bottom: 10px;
  font-size: 12px;
  display: inline-block;
}

.form-control {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-control > p {
  margin: 0;
}

input[type="number"] {
  padding: 8px 00px;
  font-size: 13px;
  background-color: #f5f7f7;
  text-align: center;
  width: 200px;
}
input[type="button"] {
  color: #fff;
  border-radius: 50%;
  border: 2px solid transparent;
  width: 30px;
  padding: 4px;
  cursor: pointer;
  margin: 4px;
  font-size: 18px;
}

.minus {
  background-color: #fa162d;
}

.minus:hover,
.plus:hover {
  border: 2px solid #000;
}

.minus:active {
  background-color: #f74d5f;
}

.plus {
  background-color: #20e62a;
}

.plus:active {
  background-color: #68f76e;
}

#duration::-webkit-inner-spin-button,
#duration::-webkit-outer-spin-button,
#duration::-moz-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.preview-card {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border: 1px solid;
  background-color: #f5f7f7;
  box-shadow: 1px 2px 5px #777;
  margin-top: 20px;
  height: fit-content;
  min-height: 30vh;
  min-width: 340px;
}

.timer-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 2px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #fff;
  padding: 10px 20px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
}

h4 {
  text-align: center;
  margin: 0;
  flex: 1;
}

button {
  all: unset;
  cursor: pointer;
}
</style>
