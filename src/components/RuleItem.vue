<template>
  <div class="content">
    <h4 style="margin-top: unset">Korak {{ index + 1 }}</h4>
    <div style="align-items: center; display: flex; margin-bottom: 1.5rem">
      <div style="min-width: 7rem">Ako je odabran</div>
      <CustomSelect
        :options="options"
        :value="selected_option"
        @update:value="conditionTypeChanged"
      />
    </div>
    <CustomCondition
      v-if="selected_option == 's uvjetom'"
      @update:conditions="updateConditions"
      :conditions="ruleCopy.conditions"
      :rules_answers="rules_answers"
    />
    <hr />
    <section>
      <h5>Odgovor asistenta</h5>
      <TextEditor
        :text="ruleCopy.assistant_answer"
        @updateText="updateAssistantAnswer"
      />

      <!--RESPONSE PART-->
      <div class="main-container">
        <div
          v-if="
            !['Regularni izraz', 'OPCIJE', 'Slobodni tekst'].includes(
              ruleCopy.response_type
            )
          "
          class="clickable-div"
          ref="clientResponse"
          tabindex="1"
          @click="toggleOptions('clientResponse')"
        >
          <span style="align-items: center; display: flex; color: #0f62fe">
            <svg
              style="margin-right: 0.75rem; fill: #0f62fe"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M8 2c1.4 0 2.5 1.1 2.5 2.5S9.4 7 8 7 5.5 5.9 5.5 4.5 6.6 2 8 2M8 1C6.1 1 4.5 2.6 4.5 4.5S6.1 8 8 8s3.5-1.6 3.5-3.5S9.9 1 8 1zM13 15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1 10 4 11.1 4 12.5V15H3v-2.5C3 10.6 4.6 9 6.5 9h3c1.9 0 3.5 1.6 3.5 3.5V15z"
              ></path>
            </svg>
            Definirajte odgovor korisnika
          </span>
          <svg
            style="fill: #0f62fe"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          </svg>
        </div>

        <div
          v-else
          style="background-color: #f4f4f4; margin-top: 2%; position: relative"
        >
          <div
            style="
              align-items: center;
              display: flex;
              flex-wrap: wrap;
              min-height: 3.5rem;
              padding: 0.75rem;
            "
          >
            <div
              v-if="
                ['Regularni izraz', 'Slobodni tekst'].includes(
                  ruleCopy.response_type
                )
              "
            >
              <div class="response-option">
                <span>{{ ruleCopy.response_type }}</span>
              </div>
            </div>

            <div
              v-else
              v-for="response in ruleCopy.customer_response"
              :key="response"
              class="response-option"
            >
              <span>{{ response }}</span>
            </div>
          </div>
          <div
            style="
              border-top: 1px solid #e0e0e0;
              display: flex;
              flex-wrap: wrap;
            "
          >
            <button
              @click="show_modal = true"
              class="color-button"
              style="padding: calc(0.375rem - 3px) 16px"
              tabindex="0"
              type="button"
            >
              Uredi odgovor
            </button>
            <button
              @click="toggleOptions('changeResponse')"
              class="color-button"
              ref="changeResponse"
              style="padding-left: 0.4375rem; padding-right: 0.4375rem"
              tabindex="0"
              type="button"
            >
              Promijeni tip odgovora
            </button>
            <div style="flex: 1 1"></div>
            <button
              @click="deleteOptions"
              class="color-button"
              style="padding-left: 0.4375rem; padding-right: 0.4375rem"
              tabindex="0"
              type="button"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                <path
                  d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          class="options-details-container"
          v-if="optionsResponseVisible"
          @click.stop
        >
          <div class="options-container">
            <div
              class="option"
              tabindex="1"
              v-for="(option, index) in response_options"
              :key="index"
              @mouseenter="showDetails(index)"
              @mouseleave="hideDetails"
              @click="
                option === 'Opcije'
                  ? ((show_modal = true), (ruleCopy.response_type = 'OPCIJE'))
                  : (ruleCopy.response_type = option);
                optionsResponseVisible = false;
              "
            >
              {{ option }}
            </div>
          </div>
          <div class="details-container">
            <div class="details" v-if="activeIndex !== null">
              <h5 style="margin: 0.75rem">
                {{ response_options[activeIndex] }}
              </h5>
              <div style="margin: 0.75rem; font-size: 0.875rem">
                {{ response_details[activeIndex] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr />

    <!--NEXT STEP-->
    <h5 style="margin-bottom: unset">Zatim</h5>
    <div class="main-container">
      <div
        class="clickable-div"
        ref="continuationRef"
        @click="toggleOptions('continuationRef')"
        tabindex="1"
      >
        <span style="align-items: center; display: flex; color: #0f62fe">
          <svg
            style="margin-right: 0.75rem; fill: #0f62fe"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"
            ></path>
          </svg>
          {{ step_selected }}
        </span>
        <svg
          style="fill: #0f62fe"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
        </svg>
      </div>
      <div class="options-details-container" v-if="optionsContinuationVisible">
        <div class="options-container">
          <div
            class="option"
            tabindex="1"
            v-for="(option, index) in step_options"
            :key="index"
            @mouseenter="showDetails(index)"
            @click="
              step_selected = option;
              updateContinuation(option);
            "
          >
            {{ option }}
          </div>
        </div>
        <div class="details-container">
          <div class="details" v-if="activeIndex !== null">
            <h5 style="margin: 0.75rem">{{ step_options[activeIndex] }}</h5>
            <div style="margin: 0.75rem; font-size: 0.875rem">
              {{ step_details[activeIndex] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="$emit('remove', index)"
      tabindex="0"
      type="button"
      class="exit-button"
    >
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
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
  </div>
  <h2 class="plus-separator">
    <button @click="$emit('add', this.index + 1)" class="line-center">+</button>
  </h2>
  <Teleport to="body">
    <Popup
      :show_modal="show_modal"
      @addOptions="updateOptions"
      @close="show_modal = false"
      :options="ruleCopy.customer_response"
    />
  </Teleport>
</template>
<script>
import TextEditor from "./textarea/TextEditor.vue";
import CustomCondition from "./CustomCondition.vue";
import CustomSelect from "./CustomSelect.vue";
import Popup from "./OptionResponse.vue";
export default {
  components: { TextEditor, CustomCondition, CustomSelect, Popup },
  props: {
    rule: Object,
    rules_answers: Array,
    index: Number,
  },
  data() {
    return {
      options: ["bez uvjeta", "s uvjetom"],
      selected_option:
        Object.keys(this.rule.conditions).length === 0
          ? "bez uvjeta"
          : "s uvjetom",
      optionsResponseVisible: false,
      optionsContinuationVisible: false,
      activeIndex: null,
      response_options: ["Opcije", "Regularni izraz", "Slobodni tekst"],
      response_details: [
        "Omogućite korisnicima odabir iz skupa izbora.",
        "Detalji za regularni izraz",
        "Detalji za slobodni tekst",
      ],
      step_options: [
        "Nastavite na idući korak",
        "Ponovite prethodne korake",
        "Odlazak na pod-akciju",
        "Kontaktiranje agenta",
        "Završetak radnje",
      ], // 'Search for the answer',
      step_details: [
        "Slijedite tijek radnji do bilo kojeg koraka koji je sljedeći.",
        "Ponovite jedan ili više koraka koji su ranije navedeni u trenutnoj radnji.",
        "Prebaci tijek razgovora na drugu radnju za obavljanje određenog zadatka.",
        /*'Detalji za searching for the answer',*/
        "Prenesi korisnika nekome iz svog tima za podršku.",
        "Neka ovo bude posljednji korak koji dovršava radnju.",
      ],
      step_selected: this.rule.continuation,
      show_modal: false,
      ruleCopy: { ...this.rule },
    };
  },
  methods: {
    conditionTypeChanged(event) {
      this.selected_option = event;
      event == "s uvjetom"
        ? (this.ruleCopy.conditions = {
            allConditionsMustBeTrue: true,
            conditionsList: [
              {
                subject: "",
                predicate: "",
                object: "",
              },
            ],
          })
        : (this.ruleCopy.conditions = {});
      this.$emit("updateRule", this.ruleCopy);
    },
    updateOptions(options) {
      this.ruleCopy.customer_response = options;
      this.$emit("updateRule", this.ruleCopy);
    },
    deleteOptions() {
      this.ruleCopy.customer_response = [];
      this.ruleCopy.response_type = "";
      this.$emit("updateRule", this.ruleCopy);
    },
    updateConditions(conditions) {
      this.ruleCopy.conditions = conditions;
      this.$emit("updateRule", this.ruleCopy);
    },
    updateAssistantAnswer(text) {
      this.ruleCopy.assistant_answer = text;
      this.$emit("updateRule", this.ruleCopy);
      console.log(this.ruleCopy);
    },
    updateContinuation(option) {
      this.ruleCopy.continuation = option;
      this.$emit("updateRule", this.ruleCopy);
    },
    showDetails(index) {
      this.activeIndex = index;
    },
    hideDetails() {
      this.activeIndex = null;
    },
    toggleOptions(elementRef) {
      let isVisible;
      if (elementRef === "clientResponse" || elementRef === "changeResponse") {
        this.optionsResponseVisible = !this.optionsResponseVisible;
        isVisible = this.optionsResponseVisible;
      } else {
        this.optionsContinuationVisible = !this.optionsContinuationVisible;
        isVisible = this.optionsContinuationVisible;
      }
      if (isVisible) {
        document.addEventListener("click", (event) =>
          this.closeOptionsOnOutsideClick(event, elementRef)
        );
      } else {
        document.removeEventListener("click", (event) =>
          this.closeOptionsOnOutsideClick(event, elementRef)
        );
      }
    },
    closeOptionsOnOutsideClick(event, elementRef) {
      const targetContainer = this.$refs[elementRef];
      if (!targetContainer.contains(event.target)) {
        if (
          elementRef === "clientResponse" ||
          elementRef === "changeResponse"
        ) {
          this.optionsResponseVisible = false;
        } else {
          this.optionsContinuationVisible = false;
        }
        document.removeEventListener("click", (event) =>
          this.closeOptionsOnOutsideClick(event, elementRef)
        );
      }
    },
  },
};
</script>
<style>
.content {
  margin: 25px 100px 25px 100px;
  padding: 2%;
  border: 1px solid #d3d3d3;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border-radius: 3px;
  position: relative;
}
.res-val {
  margin-top: 2%;
  background: var(--background);
}
.res-val section {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 3.5rem;
  padding: 0.75rem;
}
.res-val div {
  height: 2rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-wrap: wrap;
}
.res-val li {
  border-radius: 0.9375rem;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  margin: 0.25rem;
  background-color: #e0e0e0;
  padding: 0.375rem 0.5rem;
  word-break: break-word;
}

.exit-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem;
  width: 3rem;
  height: 3rem;
  transition: all 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
}

.exit-button:hover {
  background: var(--hover__color);
  transition: 0.2s;
}

.line-center {
  content: "\002B";
  display: inline-block;
  position: relative;
  font-size: 1.3rem;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  background: var(--border__color);
  border-radius: 10%;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  cursor: pointer;
  color: white;
}

.line-center:hover {
  background: var(--hover__color);
  transition: 0.2s;
}

h2 {
  text-align: center;
  position: relative;
}

h2[class="plus-separator"]:after {
  margin: 0px 100px 25px 100px;
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: medium double var(--border__color);
  z-index: -1;
}

/*CUSTOM SELECT */
.main-container {
  margin-top: 1%;
  width: 100%;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.clickable-div {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.clickable-div:focus {
  border: 0.135rem solid #0f62fe;
}

.options-details-container {
  display: flex;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.options-container {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.details-container {
  flex: 3;
}

.option {
  background: #f5f5f5;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s;
  cursor: pointer;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  outline: 0.135rem solid #0f62fe;
}

.details {
  background-color: #f5f5f5;
  text-align: left;
}

.option:hover + .details {
  display: block;
}

.response-option {
  color: #161616;
  padding: 0.475rem 0.5rem;
  word-break: break-word;
  background-color: #e0e0e0;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  margin: 0.25rem;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 0.9375rem;
}
</style>
