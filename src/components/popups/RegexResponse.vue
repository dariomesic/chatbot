<template>
  <base-dialog
    :show="isRegexOpen"
    @click-submit="applyRegex"
    @close="$emit('close')"
    :rightButtonText="'Primijeni'"
    :isSubmitDisabled="isSubmitButtonDisabled"
  >
    <div class="content-wrapper">
      <h3>Uredi opcije</h3>
      <div class="subtitle-wrapper">
        <p>Unesite regularni izraz</p>
        <!-- <button class="color-button">Dodaj regularni izraz +</button> -->
      </div>
      <hr />
      <div class="main-wrapper">
        <div class="form-control">
          <label for="regex-options">Regularni izraz</label>
          <template v-if="selectedRegex !== customRegexButton">
            <CustomSelect
              :options="regexOptions"
              :placeholder="'Odaberite regularni izraz'"
              :value="selectedRegex"
              @update:value="selectedRegex = $event"
            />
          </template>
          <template v-else>
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Unesite regularni izraz"
                v-model.trim="customRegex"
              />
              <button class="remove-input" @click="toggleCustomInput">X</button>
            </div>
          </template>
        </div>
        <hr />
        <div class="form-control">
          <label for="test">Test</label>
          <textarea
            id="test"
            placeholder="Ovdje isprobajte svoj regularni izraz"
            :disabled="selectedRegex === 'Odaberite regularni izraz'"
            v-model="textareaContent"
            @input="checkMatches"
          />
        </div>
        <div class="form-control">
          <label>Asistent prepoznaje:</label>
          <hr />
          <div class="matches">
            <p v-for="(match, index) in matches" :key="index">
              Podudaranje {{ index + 1 }}:
              <span style="border-bottom: 2px solid #8bd1f9">{{ match }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
import CustomSelect from "../CustomSelect.vue";
export default {
  components: { CustomSelect },
  props: ["isRegexOpen", "ruleCopy"],
  emits: ["close", "addRegex"],
  data() {
    return {
      regexOptions: [
        "Email: \\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b",
        "Broj mobitela: \\b\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}\\b",
        "URL: \\b[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)\\b",
        "<button style='all:unset;color:var(--main__color);text-decoration:underline;'>Definiraj svoj regularni izraz</button>",
      ],
      customRegex: "",
      selectedRegex: "",
      customRegexButton:
        "<button style='all:unset;color:var(--main__color);text-decoration:underline;'>Definiraj svoj regularni izraz</button>",
      showCustomInput: false,
      textareaContent: "",
      matches: [],
    };
  },
  watch: {
    selectedRegex: "handleRegexChange",
    customRegex: "handleRegexChange",
    isRegexOpen(newIsOpen) {
      if (newIsOpen) {
        if (this.ruleCopy.response_type !== "Regularni izraz") {
          this.selectedRegex = "Odaberite regularni izraz";
        } else if (
          this.ruleCopy.response_type === "Regularni izraz" &&
          this.regexOptions.includes(this.ruleCopy.customer_response)
        ) {
          this.selectedRegex = this.ruleCopy.customer_response;
        } else if (
          this.ruleCopy.response_type === "Regularni izraz" &&
          !this.regexOptions.includes(this.ruleCopy.customer_response)
        ) {
          this.selectedRegex = this.customRegexButton;
          this.customRegex = this.ruleCopy.customer_response;
        }
      }
    },
  },
  computed: {
    isSubmitButtonDisabled() {
      return (
        !this.selectedRegex ||
        this.selectedRegex === "Odaberite regularni izraz" ||
        (this.selectedRegex === this.customRegexButton &&
          this.customRegex === "")
      );
    },
  },

  methods: {
    toggleCustomInput() {
      this.customRegex = "";
      this.selectedRegex = "Odaberite regularni izraz";
    },
    handleRegexChange(newRegex) {
      this.matches = [];
      if (newRegex) {
        this.checkMatches();
      }
    },
    removePrefix(regex) {
      const regexPattern = regex.replace(/^[^:]*:\s*/, "");
      const pattern = new RegExp(regexPattern, "g");

      return pattern;
    },
    checkMatches() {
      let pattern;
      try {
        if (!this.customRegex) {
          pattern = this.removePrefix(this.selectedRegex);
        } else {
          pattern = this.removePrefix(this.customRegex);
        }

        const text = this.textareaContent;
        const foundMatches = text.match(pattern);

        if (foundMatches) {
          this.matches = foundMatches;
        } else {
          this.matches = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    applyRegex() {
      if (!this.customRegex) {
        this.$emit("addRegex", this.selectedRegex);
      } else {
        this.$emit("addRegex", this.customRegex);
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 50vw;
}
.subtitle-wrapper {
  display: flex;
  justify-content: space-between;
}

.main-wrapper {
  width: 100%;
}

.form-control {
  margin: 16px 0;
}

label {
  display: block;
  font: inherit;
  color: #555353;
  margin-bottom: 6px;
  font-size: 16px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.input-wrapper .remove-input {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
}

input {
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
}

textarea {
  resize: none;
  background-color: #f4f4f4;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  color: #161616;
  font-size: 0.875rem;
  font-weight: 400;
  height: 60px;
  overflow-y: auto;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding: 1rem;
  width: calc(100% - 2rem);
  transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
    outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
}

textarea:disabled {
  cursor: not-allowed;
}
.matches {
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
}

.matches > p {
  margin-top: 0.3rem;

  margin-right: 0.3rem;
}
</style>
