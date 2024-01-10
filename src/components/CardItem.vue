<template>
  <div class="card" :class="{ selected: isSelected }" @click="$emit('click')">
    <label>{{ index + 1 }}</label>
    <div class="right-part">
      <div class="conditions">
        <div
          class="condition-container"
          v-for="(group, key) in groupedConditions"
          :key="key"
        >
          <div class="step-number">{{ group[0].subject }}</div>
          <div class="condition">
            <div class="predicate">{{ group[0].predicate }}</div>
            <div class="object-container">
              <template v-for="(condition, index) in group" :key="index">
                <div
                  class="object"
                  :style="{
                    backgroundColor: getObjectColors(condition.subject)
                      .backgroundColor,
                    color: getObjectColors(condition.subject).textColor,
                  }"
                >
                  {{ condition.object }}
                </div>
                <span v-if="index < group.length - 1" class="comma">,</span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="tile">
        <pre class="tile-title" :innerHTML="formatAssistantAnswer()" />
        <div class="selected-options">
          <template v-if="card.response_type === 'Opcije'">
            <div
              class="tag"
              v-for="(response, index) in card.customer_response"
              :key="index"
              :style="{
                backgroundColor: getObjectColors(card.id).backgroundColor,
                color: getObjectColors(card.id).textColor,
              }"
            >
              {{ response }}
            </div>
          </template>
          <template v-else-if="card.response_type === 'Regularni izraz'">
            <div
              class="tag"
              :style="{
                backgroundColor: getObjectColors(card.id).backgroundColor,
                color: getObjectColors(card.id).textColor,
              }"
            >
              <span>
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  transform="translate(0, 3)"
                >
                  <path
                    d="M27,22.14V9.86A4,4,0,1,0,22.14,5H9.86A4,4,0,1,0,5,9.86V22.14A4,4,0,1,0,9.86,27H22.14A4,4,0,1,0,27,22.14ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2,2,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm16.14-3H9.86A4,4,0,0,0,7,22.14V9.86A4,4,0,0,0,9.86,7H22.14A4,4,0,0,0,25,9.86V22.14A4,4,0,0,0,22.14,25ZM26,28a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z"
                  ></path>
                  <path
                    d="M21 11L11 11 11 13 15 13 15 22 17 22 17 13 21 13 21 11z"
                  ></path>
                </svg>
                Regularni Izraz
              </span>
            </div>
          </template>
          <template v-else-if="card.response_type === 'Slobodni tekst'">
            <div
              class="tag"
              :style="{
                backgroundColor: getObjectColors(card.id).backgroundColor,
                color: getObjectColors(card.id).textColor,
              }"
            >
              <span>
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  transform="translate(0, 3)"
                >
                  <path
                    d="M23 27L23 15 18 15 18 13 30 13 30 15 25 15 25 27 23 27z"
                  ></path>
                  <path
                    d="M11 27L11 8 2 8 2 6 22 6 22 8 13 8 13 27 11 27z"
                  ></path>
                </svg>
                Slobodni tekst
              </span>
            </div>
          </template>
        </div>
        <hr />
        <div style="display: flex; justify-content: space-between">
          <span class="ctr">
            <div class="text-style">
              <svg
                v-if="card.continuation === 'Nastavite na idući korak'"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
                style="margin-bottom: -0.25rem; margin-right: 0.5rem"
              >
                <path
                  d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"
                ></path>
              </svg>
              <svg
                style="margin-bottom: -0.25rem; margin-right: 0.5rem"
                v-else-if="card.continuation === 'Završetak radnje'"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M14 21.414L9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414z"
                ></path>
                <path
                  d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
                ></path>
              </svg>
              <svg
                style="margin-bottom: -0.25rem; margin-right: 0.5rem"
                v-else
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M27,8H6.83l3.58-3.59L9,3,3,9l6,6,1.41-1.41L6.83,10H27V26H7V19H5v7a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V10A2,2,0,0,0,27,8Z"
                ></path>
              </svg>
              {{ card.continuation }}
              <span></span>
            </div>
          </span>
          <div
            style="
              display: flex;
              position: absolute;
              align-items: center;
              right: 1rem;
            "
          >
            <div
              style="background-color: #f4f4f4; height: 1.5rem; width: 1px"
            ></div>
            <button
              @click="handleRemoveClick"
              tabindex="0"
              type="button"
              aria-label="Delete"
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
          </div>
          <div style="position: absolute; right: 3.5rem">
            <button
              tabindex="0"
              type="button"
              aria-label="Duplicate"
              @click="handleDuplicateClick"
            >
              <img
                src="../assets/duplicate.png"
                height="16"
                width="16"
                alt="Duplicate"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    isSelected: Boolean,
    index: Number,
  },

  created() {
    this.$emit("cardCopy", this.card);
  },
  methods: {
    handleRemoveClick(event) {
      event.stopPropagation();
      this.$emit("remove", this.index);
    },
    getObjectColors(subject) {
      const colorMap = {
        1: { backgroundColor: "#bae6ff", textColor: "#00539a" },
        2: { backgroundColor: "#a7f0ba", textColor: "#0e6027" },
        3: { backgroundColor: "#9ef0f0", textColor: "#005d5d" },
        4: { backgroundColor: "#d4bbff", textColor: "#491d8b" },
        5: { backgroundColor: "#f0c49e", textColor: "#704a21" },
      };
      const calculatedSubject = ((subject - 1) % 5) + 1;
      return (
        colorMap[calculatedSubject] || {
          backgroundColor: "transparent",
          textColor: "black",
        }
      );
    },
    formatAssistantAnswer() {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = this.card.assistant_answer;

      tempContainer.querySelectorAll("div,img").forEach((element) => {
        element.parentNode.removeChild(element);
      });

      const formattedAssistantAnswer = tempContainer.innerHTML;

      return formattedAssistantAnswer;
    },
    handleDuplicateClick(event) {
      event.stopPropagation();
      this.$emit("duplicate", this.index + 1, this.card);
    },
  },
  computed: {
    groupedConditions() {
      const conditionGroups = new Map();

      if (this.card.conditions?.conditionsList) {
        // Iterate through the conditions and group them
        this.card.conditions.conditionsList.forEach((condition) => {
          const key = `${condition.subject}-${condition.predicate}`;
          if (!conditionGroups.has(key)) {
            conditionGroups.set(key, []);
          }
          conditionGroups.get(key).push(condition);
        });
      }

      // Convert the map to an array of groups
      return Array.from(conditionGroups.values());
    },
  },
};
</script>

<style scoped>
.card {
  align-items: stretch;
  border: 1px solid transparent;
  display: flex;
  list-style: none;
  max-height: 235px;

  min-height: 3rem;
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.selected {
  border: 1px solid darkblue;
  background-color: #f0f0f0;
}

.card {
  transition: background-color 0.2s ease-in-out;
}

/* Apply hover effect when not selected GREAT THING */
.card:not(.selected):hover .right-part,
.card:not(.selected):hover label {
  background: var(--hover__color);
  transition: 0.2s;
}

.selected .right-part,
.selected label {
  box-shadow: 0 0 0 2px #161616;
}

label {
  align-items: center;
  background-color: #fff;
  cursor: inherit;
  display: flex;
  font-size: 0.875rem;
  font-weight: 400;
  justify-content: center;
  left: 0;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  margin-right: 0.125rem;
  padding: 0.25rem 0.5rem;
  position: relative;
}

.right-part {
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  line-height: 1.67;
}

.condition-container {
  display: flex;
  border-bottom: 2px solid #f4f4f4;
}

.step-number {
  border-right: 2px solid #f4f4f4;
  padding: 0.25rem 0.5rem;
}

.conditions {
  max-height: 80px;
  overflow-y: auto;
}

.condition {
  display: flex;
  padding-left: 0.3rem;
}

.predicate {
  padding: 0.25rem 0.5rem;
  text-align: center;
}

.object {
  padding: 0.25rem 0.5rem;
  max-width: 130px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.object-container {
  display: flex;
  flex-wrap: wrap;
}

.selected-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-height: 80px;
  overflow-y: auto;
}

.tag {
  max-width: 130px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  margin-left: 0.25rem;
  margin-top: 0.55rem;
}

.comma {
  padding-top: 0.3rem;
  padding-left: 0.2rem;
  padding-right: 0.4rem;
}

.tile {
  flex-direction: column;
  min-height: 4.5rem;
  padding: 0.75rem;
  position: relative;
}

/* .tile-title {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;

  overflow: hidden;
  word-break: break-word;
} */

.tile-title {
  display: -webkit-box;
  max-width: 100%;
  white-space: pre-line; /* Use pre-line to preserve line breaks */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; /* This might not work with <pre> */
  -webkit-line-clamp: 2; /* This might not work with <pre> */
  word-break: break-word;
}

.ctr {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 75%;
}

.tile button {
  padding-left: 0.6875rem;
  padding-right: 0.6875rem;
  min-height: 2.5rem;
}

.tile button:hover {
  background-color: var(--hover__color);
  transition: 0.2s;
}

.card:not(.selected) .tile button:hover {
  background-color: #c6c6c6;
}
</style>
