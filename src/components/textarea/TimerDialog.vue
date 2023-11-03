<template>
  <base-dialog
    :show="show"
    @close="$emit('close-dialog')"
    @click-submit="setTimer"
    :rightButtonText="'Primijeni'"
  >
    <div class="main-content">
      <h3>Dodajte odgovor s pauzom</h3>
      <p>Umetnite pauzu prije slanja sljedeće poruke na kanal</p>
      <div
        style="
          display: flex;
          margin-bottom: 3rem;
          justify-content: space-around;
          gap: 2rem;
        "
      >
        <div class="form-control">
          <label for="duration">Trajanje (sekunde)</label>
          <div class="input-group">
            <input
              type="number"
              id="duration"
              max="10"
              min="1"
              v-model.number="duration"
              @keydown="checkValidKey"
              @input="checkValue"
            />
            <input type="button" value="-" @click="decrement" />
            <input type="button" value="+" @click="increment" />
          </div>
          <p v-if="!isValid" style="color: red">
            "Too high,maximum duration is 5 seconds."
          </p>
        </div>
        <div class="preview-card">
          <header class="timer-preview-header">
            <h4>Pregled pauze</h4>
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
            <section style="display: flex; margin-bottom: 8px">
              <div
                style="
                  width: 3px;
                  border-radius: 2px;
                  background-color: var(--main__color);
                  height: 16px;
                  margin-right: 8px;
                "
              />
              <p>Pozdrav! Ovako će izgledati pauza.</p>
            </section>
            <base-typing-indicator v-if="isTyping"></base-typing-indicator>
            <p style="margin-left: 12px" v-else>Poruka nakon pauze</p>
          </div>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "insertTimer"],
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
}

.form-control > p {
  margin: 0;
}

.input-group {
  border-bottom: 1px solid #161616;
}

input[type="button"] {
  margin-left: 3px;
  height: 100%;
  color: #161616;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
}

input[type="number"] {
  background-color: #f4f4f4;
  border-bottom: 1px solid #161616;
  padding: 0 3rem 0 1rem;
  height: 2rem;
  max-height: 2rem;
  text-align: center;
  min-width: 9.375rem;
  border: none;
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  background-color: #f5f7f7;
  margin-top: 20px;
  height: fit-content;
  min-height: 30vh;
  min-width: 340px;
}

.timer-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 9.5px 12.7px 0 rgba(0, 0, 0, 0.05);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #fff;
  padding: 10px 20px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
}

h4 {
  text-align: center;
  margin: 0;
  flex: 1;
  font-weight: 400;
}

button {
  all: unset;
  cursor: pointer;
}
</style>
