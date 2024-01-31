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
      <button @click="toggleLeftPanel" class="show-hide-button">
        <span>
          {{ isLeftPanelCollapsed ? "Prikaži" : "Sakrij" }}
        </span>
        <span v-if="!isLeftPanelCollapsed">
          <svg
            width="22"
            height="22"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            fill="#F4F4F4"
            transform="translate(0, 1)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M0 0h48v48H0z" fill="none"></path>
              <g id="Shopicon">
                <path
                  d="M11.957,33.214L7.171,38L10,40.828l5.305-5.305C17.867,36.992,20.788,38,24,38c12,0,20-14,20-14s-2.953-5.159-7.957-9.214 L40.829,10L38,7.172l-5.305,5.305C30.133,11.008,27.212,10,24,10C12,10,4,24,4,24S6.953,29.159,11.957,33.214z M16,24 c0-4.418,3.582-8,8-8c1.483,0,2.867,0.411,4.058,1.114l-3.035,3.035C24.694,20.062,24.356,20,24,20c-2.206,0-4,1.794-4,4 c0,0.356,0.062,0.694,0.149,1.023l-3.035,3.035C16.411,26.867,16,25.483,16,24z M32,24c0,4.418-3.582,8-8,8 c-1.483,0-2.867-0.411-4.058-1.114l3.035-3.035C23.306,27.938,23.644,28,24,28c2.206,0,4-1.794,4-4 c0-0.356-0.062-0.694-0.149-1.023l3.035-3.035C31.589,21.133,32,22.517,32,24z"
                ></path>
              </g>
            </g>
          </svg>
        </span>
        <span v-else>
          <svg
            width="22"
            height="22"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            fill="#F4F4F4"
            transform="translate(0, 1)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M0 0h48v48H0z" fill="none"></path>
              <g id="Shopicon">
                <circle cx="24" cy="24" r="4"></circle>
                <path
                  d="M24,38c12,0,20-14,20-14s-8-14-20-14S4,24,4,24S12,38,24,38z M24,16c4.418,0,8,3.582,8,8s-3.582,8-8,8s-8-3.582-8-8 S19.582,16,24,16z"
                ></path>
              </g>
            </g>
          </svg>
        </span>
      </button>
      <div class="left-panel" :class="{ collapsed: isLeftPanelCollapsed }">
        <transition name="card-slide">
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
                <draggable v-model="rules_copy" v-bind="dragOptions">
                  <transition-group name="slide-fade">
                    <div v-for="(card, index) in rules_copy" :key="card.id">
                      <Card
                        :card="card"
                        :index="index"
                        @click="scrollToCard(index)"
                        @remove="removeRule"
                        @duplicate="duplicateRule"
                        @cardCopy="fillWithCopies"
                        :isSelected="selectedCardIndex === index"
                        :style="{
                          backgroundColor: selectedCardIndex === index ? 'rgb(188, 218, 238)' : 'transparent',
                        }"
                      />
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </div>
            <hr />
          </section>
        </transition>
      </div>

      <div class="right-side" ref="rightSide">
        <!--CUSTOMER QUESTIONS-->
        <div
          class="content"
          :class="{ 'content-collapsed': isLeftPanelCollapsed }"
          :style="{ transition: isZooming ? 'none' : 'width 0.3s ease' }"
        >
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
            <div style="position: relative; width: 100%">
              <ul style="width: 100%">
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
                      korisnik te stisnite enter:</span
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
                <section style="max-height:250px; overflow:scroll">
                  <transition-group name="slide-fade">
                    <div
                      v-for="(question, index) in questions"
                      :key="question.question_id"
                    >
                      <li
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
                                box-sizing: border-box;
                                word-wrap: break-word;
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
                    </div>
                  </transition-group>
                </section>
              </ul>
            </div>
          </div>
        </div>

        <TransitionGroup>
          <div v-for="(rule, index) in rules_copy" :key="rule.id">
            <div :ref="'scrollableCard_' + index">
              <Rule
                :rule="rule"
                :index="index"
                :rules_answers="distinctAnswers"
                :rules="rules_copy"
                :isLeftPanelCollapsed="isLeftPanelCollapsed"
                :isZooming="isZooming"
                @add="addRule"
                @updateRule="updateRule(index, $event)"
                @updateShowDeleteRule="updateShowDeleteRule"
                @updateShowDeleteOptions="updateShowDeleteOptions"
              />
            </div>
          </div>
        </TransitionGroup>
        <div class="chat-section">
          <img src="../assets/eu.png" height="35" style="margin-right:1rem">
          <div class="chat" @click="toggleChatbot">
            <transition name="fade" mode="out-in">
              <svg
                style="fill: white; margin-top: 3px"
                v-if="!showChatbot"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <!-- Chat SVG -->
                <path d="M3 3h18v12H7l-4 4z" />
              </svg>
              <svg
                style="fill: white"
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <!-- Exit SVG -->
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </transition>
          </div>
        </div>
        <Transition name="fade">
          <div v-if="showChatbot" class="chatbot-container">
            <Chatbot @exit="showChatbot = false" />
          </div>
        </Transition>
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
  </div>
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
import { VueDraggableNext as Draggable } from 'vue-draggable-next';

export default {
  mixins: [windowScrollPosition("position")],
  components: {
    Card,
    Rule,
    Navbar,
    ActionEditor,
    Chatbot,
    Loading,
    Draggable
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
      cards_copy: [],
      isZooming: false,
      componentKey: 0,
      dragOptions: {
        animation: 200,
        group: "options",
        disabled: false,
        ghostClass: "ghost",
      },
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
    window.addEventListener("resize", this.handleResize);
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
    window.removeEventListener("resize", this.handleResize);
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
    handleResize() {
      this.isZooming = true;
      setTimeout(() => {
        this.isZooming = false;
      }, 500);
    },
    toggleLeftPanel() {
      this.isLeftPanelCollapsed = !this.isLeftPanelCollapsed;
    },
    addRule(id) {
      this.rules_copy.splice(id, 0, {
        id: this.rules_copy.reduce((max, obj) => (obj.id > max ? obj.id : max), this.rules_copy[0].id) + 1,
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
    duplicateRule(id, card) {
      this.rules_copy.splice(id, 0, {
        id: this.rules_copy.length + 1,
        conditions: card.conditions,
        assistant_answer: card.assistant_answer,
        response_type: card.response_type,
        customer_response: card.customer_response,
        continuation: card.continuation,
      });
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
        // Capitalize the first letter of newPhrase
        const capitalizedPhrase = this.newPhrase.charAt(0).toUpperCase() + this.newPhrase.slice(1);
        this.questions.unshift({
          question_id: maxQuestionId + 1,
          question: capitalizedPhrase,
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
    async onSaveButtonClicked() {
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
      setTimeout(() => {
        this.cards_copy = [];
        this.componentKey++;
      }, 2000);
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
    async performAPIRequests(intentId) {
      try {
        // Perform batch operations for added, deleted, and updated questions
        const apiRequests = [];
        const ml_questions = [{
          "SystemID": this.$route.query.system_id,
          "AddedItems":[],
          "EditedItems": [],
          "DeletedItems": [],
        }]

        if (this.addedQuestions.length > 0) {
          apiRequests.push(
            ...this.addedQuestions.map(async (question) => {
              const response = await DataService.postQuestion(
                question.question,
                intentId,
                this.$route.query.system_id
              );
              ml_questions[0]['AddedItems'].push({
                  "IntentID": this.$route.query.intent_id,
                  "QuestionID": response.question_id.toString(),
                  "QuestionText": question.question,
              });
            })
          );
        }

        if (this.deletedQuestions.length > 0) {
          apiRequests.push(
            ...this.deletedQuestions.map(async (question) =>{
              await DataService.deleteQuestion(
                question.question_id
              );
              ml_questions[0]['DeletedItems'].push({
                  "IntentID": this.$route.query.intent_id,
                  "QuestionID": question.question_id.toString(),
                  "QuestionText": question.question,
              });
            })
          );
        }

        if (this.updatedQuestions.length > 0) {
          apiRequests.push(
            ...this.updatedQuestions.map(async (question) => {
              await DataService.updateQuestion(
                question.question,
                question.question_id
              );
              ml_questions[0]['EditedItems'].push({
                "IntentID": intentId,
                "QuestionID": question.question_id.toString(),
                "QuestionText": question.question,
              });
            })
          );
        }

        if (
          !(JSON.stringify(this.rules_copy) === JSON.stringify(this.rules))
        ) {
          apiRequests.push(DataService.updateRule(this.rules_copy, intentId));
        }

        // Execute parallel processes and wait for them to complete
        await Promise.all(apiRequests);

        // Send ml_questions array to your API endpoint
        if (this.addedQuestions.length > 0 || this.deletedQuestions.length > 0 || this.updatedQuestions.length > 0) {
          console.log(ml_questions)
          await DataService.sendQuestions(ml_questions, this.$route.query.intent_id, this.questions.length);
        }

        // Reload questions and rules after the batch operations
        await this.loadQuestionsAndRules(this.intentTextCopy, intentId);
      } catch (error) {
        console.error("API request failed:", error);
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
    fillWithCopies(card) {
      this.cards_copy.push(card);
    },
    removeOptions() {
      this.rule_copy.customer_response = [];
      this.rule_copy.response_type = "";
      // Check if savedCard is defined before accessing its properties
      const savedCard = this.cards_copy.find((card) => card.id === this.rule_copy.id);
      if (savedCard) {
        savedCard.customer_response = [];
        savedCard.response_type = "";
      }

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
  transition: flex 0.2s, opacity 0.4s linear;
  opacity: 1;
  position: sticky;
  top: calc(3rem + 60px); /* Keep the left panel fixed at the top */
  overflow-y: auto;

  /*max-height: calc(100vh - 72px - (3rem + 60px));  Adjust to fit the viewport height minus header height */
  max-height: calc(100vh - 60px - 3rem);
}

.left-panel.collapsed {
  transition: flex 0.3s linear, opacity 0.4s ease-out 0.4s;
  flex: 0 0 0;
  opacity: 0;
}

.right-side {
  position: relative;
  flex: 1;
}

.show-hide-button {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background-color: var(--main__color);
  border: 1px solid #000;
  outline: 1px solid #fff;
  outline-offset: -3px;
  padding: 0.4rem 1rem;
  color: #f4f4f4;
  width: 90px;
}

.show-hide-button span:last-child {
  padding: 0.1rem;
}

.chat-section{
  z-index: 2;
  position: fixed;
  right: 1rem;
  display: flex;
  align-items: center;
  bottom: 1rem;
}

.chat {
  width: 50px;
  height: 50px;
  background-color: var(--main__color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  bottom: 1rem;
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

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

/* Left-to-right animation */
.card-slide-enter-active {
  transition: transform 0.3s, opacity 0.6s ease-in;
}
.card-slide-leave-active {
  transition: transform 0.3s ease-in, opacity 0.2s ease-out;
}
.card-slide-enter-from,
.card-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.card-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.card-slide-leave-from {
  opacity: 0.4;
  transform: translateX(0);
}

/* Right-to-left animation */
.card-slide-reverse-enter-active,
.card-slide-reverse-leave-active {
  transition: transform 0.5s, opacity 0.5s linear;
}

.card-slide-reverse-enter-from,
.card-slide-reverse-leave-to {
  opacity: 1;
  transform: translateX(0);
}

.card-slide-reverse-enter-to,
.card-slide-reverse-leave-from {
  opacity: 0;
  transform: translateX(-100%);
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
.slide-fade-enter-active {
  transition: opacity 0.4s, transform 0.4s;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
