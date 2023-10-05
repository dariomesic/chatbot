<template>
  <div class="card" :class="{ selected: isSelected }" @click="$emit('click')">
    <label>{{ card.id }}</label>
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
        <span class="tile-title">{{ card.assistant_answer }}</span>
        <hr />
        <div style="display: flex; justify-content: space-between">
          <span class="ctr">
            <div class="text-style">
              <svg
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
            <button tabindex="0" type="button" aria-label="Duplicate">
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
  },
  methods: {
    handleRemoveClick(event) {
      event.stopPropagation();
      this.$emit("remove", this.card.id);
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
  max-height: 228px;
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
  padding: .25rem .5rem;
}

.conditions {
  overflow-y: auto;
}

.condition {
  display: flex;
  padding-left: 0.3rem;
}

.predicate {
  padding: .25rem .5rem;
  text-align: center;
}

.object {
  padding: .25rem .5rem;
  max-width: 130px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.object-container {
  display: flex;
  flex-wrap: wrap;
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

.tile-title {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;

  overflow: hidden;
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
</style>
