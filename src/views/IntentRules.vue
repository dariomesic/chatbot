<template>
  <div class="app-container">
    <div class="fixed-container">
      <Navbar />
      <ActionEditor
        :text="intentTextCopy"
        @updateText="intentTextCopy = $event"
        @save="onSaveButtonClicked"
        :disableSaveButton="isSaveButtonDisabled"
      />
    </div>
    <div class="content-container">
      <div :class="['left-panel', { collapsed: isLeftPanelCollapsed }]">
        <button
          style="position: absolute; bottom: 10px; left: 10px"
          @click="toggleLeftPanel"
        >
          {{ "<< Sakrij" }}
        </button>
        <transition name="card-slide" mode="out-in">
          <section class="left-cards-container" v-show="!isLeftPanelCollapsed">
            <div class="left-cards">
              <!--CUSTOMER CARD-->
              <div class="start-editor">
                <div class="trigger">
                  <label class="text-style"
                    >Korisnik bi mogao postaviti sljedeće pitanje:</label
                  >
                  <p class="text-style">
                    {{
                      questions[0] !== undefined ? questions[0].question : ""
                    }}
                  </p>
                </div>
              </div>
              <div class="conversation-steps">
                <p
                  class="text-style"
                  style="font-weight: 600; margin-left: 2%; font-style: initial"
                >
                  Slijed konverzacije
                </p>
                <TransitionGroup name="list" tag="ul">
                  <div v-for="(card, index) in rules_copy" :key="card.id">
                    <Card
                      :card="card"
                      :index="index"
                      @click="scrollToCard(index)"
                      @remove="removeRule"
                      @duplicate="duplicateRule"
                      :isSelected="selectedCardIndex === index"
                      :style="{
                        backgroundColor:
                          selectedCardIndex === index
                            ? 'rgb(188, 218, 238)'
                            : 'transparent',
                      }"
                    />
                  </div>
                </TransitionGroup>
              </div>
            </div>
            <hr />
          </section>
        </transition>
      </div>

      <div class="right-side" ref="rightSide">
        <!--CUSTOMER QUESTIONS-->
        <div class="content">
          <div
            style="
              background-color: #f4f4f4;
              display: flex;
              flex-direction: column;
              flex-wrap: nowrap;
              margin-bottom: 2rem;
              max-height: 100%;
              padding: 1.5rem 2rem;
            "
          >
            <h4 class="TriggerEditor__title">
              <span class="TriggerEditor__title-text"
                >Korisnik bi mogao postaviti sljedeća pitanja:</span
              >
            </h4>
            <div
              style="
                letter-spacing: 0.2px;
                line-height: 1.28572;
                margin: 0.25rem 0 0.5rem;
              "
            >
              <p>
                U ovom dijelu se unose pitanja kakva korisnici obično
                postavljaju, a vezani su uz odabrano područje (intent).
              </p>
              <p>
                Što se više pitanja unese, to će chatbot moći bolje prepoznavati
                s čim korisnik treba pomoć.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <label
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 0.25rem;
                      align-items: flex-start;
                      margin-bottom: 0.25rem;
                      margin-right: 3rem;
                      letter-spacing: 0.2px;
                      line-height: 1.28572;
                      margin: 0.25rem 0 0.5rem;
                    "
                  >
                    <span
                      >Unesite pitanje u obliku u kojem bi ga unio
                      korisnik:</span
                    >
                    <span>Ukupno: {{ questions.length }}</span>
                  </label>
                </li>
                <li
                  style="
                    border-bottom: 1px solid #e0e0e0;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    padding-right: 3rem;
                  "
                >
                  <div
                    style="
                      align-items: flex-start;
                      display: flex;
                      flex-direction: column;
                      width: 100%;
                    "
                  >
                    <div style="display: flex; position: relative; width: 100%">
                      <input
                        v-model="newPhrase"
                        @input="onInput"
                        @keyup.enter="addPhrase"
                        style="
                          min-height: 48px;
                          padding-right: 3rem;
                          scroll-margin-bottom: 2rem;
                          width: 100%;
                          padding: 0 1rem;
                        "
                        placeholder="Unesite pitanje"
                        type="text"
                        title="Unesite frazu"
                        aria-describedby=""
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </li>
                <TransitionGroup name="list" tag="ul">
                  <li
                    v-for="(question, index) in questions"
                    :key="question.question_id"
                    style="
                      align-items: center;
                      display: flex;
                      margin-top: 0.5rem;
                    "
                  >
                    <div
                      style="
                        align-items: flex-start;
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                      "
                    >
                      <div
                        style="display: flex; position: relative; width: 100%"
                      >
                        <div
                          class="custom-input"
                          contenteditable="true"
                          style="
                            padding-right: 3rem;
                            scroll-margin-bottom: 2rem;
                            width: 100%;
                            padding: 1rem 1rem;
                            line-height: 17px;
                          "
                          @blur="handleBlur($event, index)"
                        >
                          {{ questions[index].question }}
                        </div>
                      </div>
                    </div>
                    <button
                      @click="deletePhrase(index)"
                      tabindex="0"
                      type="button"
                      style="
                        align-items: center;
                        cursor: pointer;
                        display: inline-flex;
                        overflow: visible;
                        position: relative;
                        padding-left: 0.9375rem;
                        padding-right: 0.9375rem;
                        padding: calc(0.875rem - 3px) 16px;
                      "
                    >
                      <svg
                        focusable="false"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-label="Delete"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                        role="img"
                        class="bx--btn__icon"
                      >
                        <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                        <path
                          d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </TransitionGroup>
              </ul>
            </div>
          </div>
        </div>

        <TransitionGroup name="list" tag="ul">
          <div v-for="(rule, index) in rules_copy" :key="rule.id">
            <div :ref="'scrollableCard_' + index">
              <Rule
                :rule="rule"
                :index="index"
                :rules_answers="distinctAnswers"
                :rules="rules_copy"
                :triggerDeleteOptions="triggerDeleteOptions"
                @add="addRule"
                @updateRule="updateRule(index, $event)"
                @updateShowDeleteRule="updateShowDeleteRule"
                @updateShowDeleteOptions="updateShowDeleteOptions"
              />
            </div>
          </div>
        </TransitionGroup>
        <button
          class="expand-button"
          v-if="isLeftPanelCollapsed"
          @click="toggleLeftPanel"
        >
          {{ ">> Prikaži" }}
        </button>
        <div class="chat" @click="toggleChatbot">
          <svg
            height="50px"
            width="50px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xml:space="preserve"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  style="fill: #3ba58b"
                  d="M25,9.586C11.193,9.586,0,19.621,0,32c0,4.562,1.524,8.803,4.135,12.343 C3.792,48.433,2.805,54.194,0,57c0,0,8.571-1.203,14.377-4.709c3.225,1.359,6.824,2.123,10.623,2.123c13.807,0,25-10.035,25-22.414 S38.807,9.586,25,9.586z"
                ></path>
                <path
                  style="fill: #226bac"
                  d="M58,23.414C58,11.035,46.807,1,33,1c-9.97,0-18.575,5.234-22.589,12.804 C14.518,11.153,19.553,9.586,25,9.586c13.807,0,25,10.035,25,22.414c0,4.735-1.642,9.124-4.437,12.743 C51.162,47.448,58,48.414,58,48.414c-2.805-2.805-3.792-8.566-4.135-12.657C56.476,32.217,58,27.976,58,23.414z"
                ></path>
                <circle style="fill: #ffffff" cx="12" cy="32" r="3"></circle>
                <circle style="fill: #ffffff" cx="25" cy="32" r="3"></circle>
                <circle style="fill: #ffffff" cx="38" cy="32" r="3"></circle>
              </g>
            </g>
          </svg>
        </div>
        <Transition name="fade">
          <div v-if="showChatbot" class="chatbot-container">
            <Chatbot @exit="showChatbot = false" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <loading v-if="loading" />
  </Teleport>
  <Teleport to="body">
    <action-dialog
      :showDialog="showSaveDialog"
      :leftButtonText="'Odbaci izmjene'"
      :rightButtonText="'Spremi'"
      @click-cancel="discardChanges"
      @close="showSaveDialog = false"
      @confirm-action="saveUnsavedChanges"
    >
      <template #title>Nespremljene izmjene</template>
      <template #text
        >Želite li spremiti svoje izmjene u "<strong>{{
          intentTextCopy
        }}</strong
        >" prije nego što proslijedite dalje?</template
      >
    </action-dialog>
  </Teleport>
  <Teleport to="body">
    <action-dialog
      :showDialog="showDeleteRuleDialog"
      :rightButtonText="'Obriši'"
      @close="showDeleteRuleDialog = false"
      @confirm-action="removeRule"
    >
      <template #title>Obriši Korak {{ selectedRuleIndex }}?</template>
      <template #text
        >Jeste li sigurni da želite obrisati
        <span style="text-decoration: underline"
          >Korak {{ selectedRuleIndex }}</span
        >?
        <br />
        <br />
        Svi koraci koji ovise o ovom koraku će biti pogođeni.</template
      >
    </action-dialog>
  </Teleport>
  <Teleport to="body">
    <action-dialog
      :showDialog="showDeleteOptionsDialog"
      :rightButtonText="'Obriši'"
      @close="showDeleteOptionsDialog = false"
      @confirm-action="removeOptions"
    >
      <template #title
        >Obriši odgovor korisnika za Korak {{ selectedRuleIndex }}?</template
      >
      <template #text
        >Izgubljeni sadržaj i postavke neće biti moguće povratiti. Brisanje
        odgovora ne briše odgovor asistenta.</template
      >
    </action-dialog>
  </Teleport>
</template>
<script>
import Navbar from "../components/AppNavbar.vue";
import Card from "../components/CardItem.vue";
import Rule from "../components/RuleItem.vue";
import ActionEditor from "../components/ActionEditor.vue";
import { windowScrollPosition } from "../utils/window-scroll-position";
import Chatbot from "../components/ChatBot.vue";
import DataService from "../services/data.services";
import Loading from "../components/popups/LoadingModal.vue";

export default {
  mixins: [windowScrollPosition("position")],
  components: {
    Card,
    Rule,
    Navbar,
    ActionEditor,
    Chatbot,
    Loading,
  },
  data() {
    return {
      rules: [],
      rules_copy: [],
      questions: [],
      originalQuestions: [],
      newPhrase: "",
      selectedCardIndex: 0,
      isLeftPanelCollapsed: false,
      openingChatBot: false,
      showChatbot: false,
      intentTextCopy: "",
      intentText: "",
      loading: false,
      showSaveDialog: false,
      showDeleteRuleDialog: false,
      showDeleteOptionsDialog: false,
      navigationAllowed: false,
      intendedRoute: null,
      selectedRuleIndex: 0,
      rule_copy: null,
    };
  },
  watch: {
    position: {
      handler(val) {
        this.$nextTick(() => {
          for (let i = 0; i < this.rules_copy.length; i++) {
            const refName = "scrollableCard_" + i;
            if (this.$refs[refName]) {
              const element = this.$refs[refName][0];
              if (val[1] >= element.offsetTop - 450) {
                this.selectedCardIndex = i;
              }
            }
          }
        });
      },
    },
  },
  computed: {
    addedQuestions() {
      return this.questions.filter(
        (q) =>
          !this.originalQuestions.some((oq) => oq.question_id === q.question_id)
      );
    },
    deletedQuestions() {
      return this.originalQuestions.filter(
        (oq) => !this.questions.some((q) => q.question_id === oq.question_id)
      );
    },
    updatedQuestions() {
      return this.questions.filter((q) =>
        this.originalQuestions.some(
          (oq) => oq.question_id === q.question_id && oq.question !== q.question
        )
      );
    },
    isSaveButtonDisabled() {
      return (
        this.addedQuestions.length > 0 ||
        this.deletedQuestions.length > 0 ||
        this.updatedQuestions.length > 0 ||
        this.intentTextCopy !== this.intentText ||
        !(JSON.stringify(this.rules_copy) === JSON.stringify(this.rules))
      );
    },
    distinctAnswers() {
      const distinctAnswersWithResponses = [];

      this.rules_copy.forEach((rule, index) => {
        if (rule.customer_response && rule.customer_response.length > 0) {
          const distinctResponses = [...new Set(rule.customer_response)]; // Get distinct customer responses

          let responsesToAdd;

          // Check if response_type is "Regularni izraz" or "Slobodni tekst"
          if (
            rule.response_type === "Regularni izraz" ||
            rule.response_type === "Slobodni tekst"
          ) {
            // Save "defined" and "undefined" as responsesToAdd
            responsesToAdd = ["defined"];
          } else {
            // Use the actual responses
            responsesToAdd = distinctResponses;
          }

          responsesToAdd.forEach((response) => {
            distinctAnswersWithResponses.push({
              index: index + 1,
              answer: rule.assistant_answer,
              responses: [response],
            });
          });
        }
      });

      // Combine answers with the same text and merge their customer responses
      const mergedAnswers = [];
      distinctAnswersWithResponses.forEach((item) => {
        const existingAnswer = mergedAnswers.find(
          (a) => a.answer === item.answer
        );
        if (existingAnswer) {
          existingAnswer.responses.push(...item.responses);
        } else {
          mergedAnswers.push(item);
        }
      });
      return mergedAnswers;
    },
  },
  async mounted() {
    window.addEventListener("beforeunload", this.showConfirmationDialog);
    let intentId = this.$route.query.intent_id;
    if (this.$route.query.system_id !== undefined) {
      await this.loadQuestionsAndRules(
        await DataService.getNameForIntent(intentId),
        intentId
      );
    }
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.showConfirmationDialog);
  },
  beforeRouteLeave(to, __, next) {
    this.intendedRoute = to;
    if (this.isSaveButtonDisabled && !this.navigationAllowed) {
      next(false);
      this.showSaveDialog = true;
    } else {
      this.navigationAllowed = false;
      next();
    }
  },
  methods: {
    async loadQuestionsAndRules(text, intentID) {
      this.loading = false;
      try {
        this.intentText = text;
        this.intentTextCopy = JSON.parse(JSON.stringify(this.intentText));
        this.originalQuestions = await DataService.getQuestionsForIntent(
          intentID
        );
        this.questions = JSON.parse(JSON.stringify(this.originalQuestions));
        this.rules = JSON.parse(await DataService.getRulesForIntent(intentID));
        this.rules_copy = JSON.parse(JSON.stringify(this.rules));
      } catch (error) {
        console.error(error);
      }
    },
    scrollToCard(index) {
      const element = this.$refs[`scrollableCard_${index}`][0];
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    },
    toggleLeftPanel() {
      this.isLeftPanelCollapsed = !this.isLeftPanelCollapsed;
    },
    addRule(id) {
      this.rules_copy.splice(id, 0, {
        id: this.rules_copy.length + 1,
        conditions: {},
        assistant_answer: "",
        response_type: "",
        customer_response: [],
        continuation: "Nastavite na idući korak",
      });
    },
    removeRule(id) {
      if (this.rules_copy.length !== 1) {
        if (this.showDeleteRuleDialog) {
          this.rules_copy.splice(this.selectedRuleIndex - 1, 1);
          this.showDeleteRuleDialog = false;
        } else {
          this.rules_copy.splice(id, 1);
        }
      }
    },
    duplicateRule(id) {
      // Find the index of the rule to duplicate based on its id
      const indexToDuplicate = this.rules_copy.findIndex(
        (rule) => rule.id === id
      );
      // Make sure we found the rule to duplicate
      if (indexToDuplicate !== -1) {
        const duplicatedRule = JSON.parse(
          JSON.stringify(this.rules_copy[indexToDuplicate])
        );
        duplicatedRule.id = this.rules_copy[this.rules_copy.length - 1].id + 1;
        this.rules_copy.splice(indexToDuplicate + 1, 0, duplicatedRule);
        for (let i = 0; i < this.rules_copy.length; i++) {
          this.rules_copy[i].id = i + 1;
        }
      }
    },
    updateRule(index, updatedRule) {
      this.rules_copy[index] = updatedRule;
    },
    onInput() {
      this.newPhrase = event.target.value;
    },
    async addPhrase() {
      if (this.newPhrase.trim() !== "") {
        const maxQuestionId = Math.max(
          ...this.questions.map((question) => question.question_id)
        );
        this.questions.push({
          question_id: maxQuestionId + 1,
          question: this.newPhrase,
        });
        this.newPhrase = "";
      }
    },
    async handleBlur(event, index) {
      this.questions[index].question = event.target.textContent;
    },
    async deletePhrase(index) {
      this.questions.splice(index, 1);
    },
    onSaveButtonClicked() {
      this.loading = true;
      const intentId = this.$route.query.intent_id;
      if (this.intentTextCopy !== this.intentText) {
        DataService.updateIntent(this.intentTextCopy, intentId)
          .then(() => {
            this.intentText = this.intentTextCopy;
          })
          .catch((error) => {
            console.error("Failed to update intent in the database:", error);
          });
      }
      this.performAPIRequests(intentId);
    },
    toggleChatbot() {
      if (!this.showChatbot && this.isSaveButtonDisabled) {
        this.onSaveButtonClicked();
      }
      this.showChatbot = !this.showChatbot;
    },
    saveUnsavedChanges() {
      this.onSaveButtonClicked();
      this.navigationAllowed = true;
      this.showSaveDialog = false;
      this.$router.push(this.intendedRoute);
    },
    showConfirmationDialog(event) {
      if (this.isSaveButtonDisabled) {
        event.preventDefault();
        event.returnValue = "";
      }
    },
    discardChanges() {
      this.navigationAllowed = true;
      this.$router.push(this.intendedRoute);
    },
    performAPIRequests(intentId) {
      try {
        // Perform batch operations for added, deleted, and updated questions
        const apiRequests = [];

        if (this.addedQuestions.length > 0) {
          apiRequests.push(
            ...this.addedQuestions.map((question) =>
              DataService.postQuestion(question.question, intentId, this.$route.query.system_id)
            )
          );
        }

        if (this.deletedQuestions.length > 0) {
          apiRequests.push(
            ...this.deletedQuestions.map((question) =>
              DataService.deleteQuestion(question.question_id)
            )
          );
        }

        if (this.updatedQuestions.length > 0) {
          apiRequests.push(
            ...this.updatedQuestions.map((question) =>
              DataService.updateQuestion(
                question.question,
                question.question_id
              )
            )
          );
        }
        if (apiRequests.length) {
          apiRequests.push(
            DataService.sendQuestions(
              this.questions.length,
              intentId,
              this.$route.query.system_id
            )
          );
        }

        if (!(JSON.stringify(this.rules_copy) === JSON.stringify(this.rules))) {
          apiRequests.push(DataService.updateRule(this.rules_copy, intentId));
        }

        // Execute all API requests in parallel
        Promise.all(apiRequests)
          .then(() => {
            // Reload questions and rules after the batch operations
            this.loadQuestionsAndRules(this.intentTextCopy, intentId);
          })
          .catch((error) => {
            console.error("API request failed:", error);
          });
      } catch (error) {
        console.error(error);
      }
    },
    updateShowDeleteRule(val, index) {
      this.showDeleteRuleDialog = val;
      this.selectedRuleIndex = index;
    },
    updateShowDeleteOptions(val, ruleCopy, index) {
      this.showDeleteOptionsDialog = val;
      this.selectedRuleIndex = index;
      this.rule_copy = ruleCopy;
    },
    removeOptions() {
      this.rule_copy.customer_response = [];
      this.rule_copy.response_type = "";
      this.$emit("updateRule", this.rule_copy);
      this.showDeleteOptionsDialog = false;
    },
  },
};
</script>
<style>
.app-container {
  display: flex;
  flex-direction: column;
}

.content-container {
  display: flex;
  flex-direction: row;
}

.fixed-container {
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
}

.left-panel {
  background-color: var(--background);
  flex: 0 0 25%;
  transition: flex 0.2s ease-in-out;
  position: sticky;
  top: calc(3rem + 60px); /* Keep the left panel fixed at the top */
  overflow-y: auto;
  /*max-height: calc(100vh - 72px - (3rem + 60px));  Adjust to fit the viewport height minus header height */
  max-height: calc(100vh - 60px - 3rem);
}

.left-panel.collapsed {
  flex: 0 0 0;
}

.right-side {
  position: relative;
  flex: 1;
}

.expand-button {
  z-index: 3;
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.chat {
  z-index: 2;
  position: fixed;
  right: 1rem;
  color: #b4bcc1;
  bottom: 1rem;
  cursor: pointer;
}

.start-editor {
  border: 1px solid transparent;
  border-bottom-color: #e0e0e0;
  position: relative;
  padding: 0.5rem;
}

.trigger {
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.24s cubic-bezier(0.2, 0, 0.38, 0.9);
}

.trigger label {
  font-style: initial;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 0.75rem 0.75rem 0.25rem;
}

.trigger p {
  color: #525252;
  font-style: italic;
  padding: 0 0 0.5rem 0.75rem;
}

.left-cards-container {
  display: flex;
  flex-direction: column;
  max-height: calc(
    100vh - 72px - (3rem + 60px)
  ); /* Adjust to fit the viewport height minus header height */
  overflow-y: auto;
}

.divider {
  display: initial;
  align-self: stretch;
  border-left: 1px solid #e0e0e0;
  width: 0;
}

/* Left-to-right animation */
.card-slide-enter-active,
.card-slide-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.card-slide-enter-from,
.card-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Right-to-left animation */
.card-slide-reverse-enter-active,
.card-slide-reverse-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.card-slide-reverse-enter-from,
.card-slide-reverse-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
/* Transition classes appear */
/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

/*TRANSITION FOR CARDS*/
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
