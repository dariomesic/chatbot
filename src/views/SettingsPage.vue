<template>
  <div style="padding: 2rem; position: relative">
    <section>
      <h3>Popis sinonima</h3>
      <div
        v-for="(new_value, index) in newValues"
        :key="index"
        class="synonym-group"
      >
        {{ index + 1 + ". " }}
        <div class="synonym-info">
          <div class="input-container">
            <input
              @input="handleInput($event.target.value, index)"
              placeholder="Prazno polje"
              type="text"
              aria-describedby=""
              autocomplete="off"
              maxlength="128"
              :value="new_value"
              class="custom-input"
            />
            <div class="icon-container">
              <svg
                class="bi-pencil"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67"
                    class="cls-1"
                    style="
                      fill: none;
                      fill-opacity: 1;
                      fill-rule: nonzero;
                      stroke: #000000;
                      stroke-width: 12;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-dasharray: none;
                      stroke-opacity: 1;
                    "
                    transform="translate(-77.923 40.646)"
                  ></path>
                  <path
                    d="m195.656 33.271-52.882 52.882"
                    style="
                      fill: none;
                      fill-opacity: 1;
                      fill-rule: nonzero;
                      stroke: #000000;
                      stroke-width: 12;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-miterlimit: 5;
                      stroke-dasharray: none;
                      stroke-opacity: 1;
                    "
                    transform="translate(-77.923 40.646)"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          &larr;
          <div class="old-values">
            <!-- <input v-model="editedOldValues[index]" /> -->
            <div
              contenteditable="true"
              @blur="handleBlur($event, index)"
              style="
                background: var(--background);
                padding-right: 2rem;
                scroll-margin-bottom: 2rem;
                width: 100%;
                padding: 10px;
                line-height: 17px;
                box-sizing: border-box;
                word-wrap: break-word;
              "
            >
              {{ editedOldValues[index] }}
            </div>
          </div>
          <div>
            <button
              @click="deleteSynonyms(index)"
              style="align-items: center; display: inline-flex"
            >
              <svg
                style="margin-top: 6px"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-label="Close"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                role="img"
                class="bx--btn__icon"
              >
                <path
                  d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button class="color-button" @click="addSynonymGroup">
        Dodaj novu grupu sinonima +
      </button>
    </section>
    <section>
      <h3>Pragovi</h3>
      <div>
        <!-- First Part: Odaberite gornji prag > -->
        <div style="align-items: center; display: flex; flex-wrap: wrap">
          <span
            >1. Unesite gornji prag za koji chatbot direktno vraća odgovor:
          </span>
          <div
            contenteditable="true"
            @blur="upperThreshold = $event.target.innerText"
            style="
              background: var(--background);
              padding-right: 2rem;
              scroll-margin-bottom: 2rem;
              padding: 8px 15px 8px 15px;
              line-height: 17px;
              box-sizing: border-box;
              word-wrap: break-word;
              margin: 0px 7px 0px 7px;
            "
          >
            {{ upperThreshold }}
          </div>
          <p style="font-size: 9px">(0.0 - 100.0)</p>
        </div>

        <!-- Third Part: Odaberite donji prag < -->
        <div
          style="
            align-items: center;
            flex-wrap: wrap;
            display: flex;
            flex-wrap: wrap;
          "
        >
          <span
            >2. Unesite donji prag za koji chatbot traži korisnika da ponovno
            pita pitanje:
          </span>
          <div
            contenteditable="true"
            @blur="lowerThreshold = $event.target.innerText"
            style="
              background: var(--background);
              padding-right: 2rem;
              scroll-margin-bottom: 2rem;
              padding: 8px 15px 8px 15px;
              line-height: 17px;
              box-sizing: border-box;
              word-wrap: break-word;
              margin: 0px 7px 0px 7px;
            "
          >
            {{ lowerThreshold }}
          </div>
          <p style="font-size: 9px">(0.0 - 100.0)</p>
        </div>
      </div>
    </section>
    <button
      @click="saveContent"
      class="background-button"
      tabindex="0"
      type="button"
      style="margin-top: 2rem"
    >
      Spremi
      <svg
        class="svg"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        aria-label="Saved"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        role="img"
      >
        <path
          d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"
        ></path>
      </svg>
    </button>

    <section v-if="show">
      <transition name="fade" appear>
        <div
          class="card-header"
          :style="{
            backgroundColor:
              message === 'Uspješno spremljene promjene.'
                ? 'rgb(105, 222, 64)'
                : '#cd5c5c',
          }"
        >
          <span>{{ message }}</span>
          <div @click="show = false" class="cross">✕</div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import DataService from "../services/data.services";
export default {
  data() {
    return {
      editing: false,
      newValues: [],
      oldValuesMap: new Map(),
      editedOldValues: [],
      isEditable: [],
      upperThreshold: null,
      lowerThreshold: null,
      show: false,
      message: "",
    };
  },
  async created() {
    this.filterOldValues();
    try {
      let res = await DataService.getThresholdsBySystemId(
        this.$route.query.system_id
      );
      this.upperThreshold = res[0].percentage_upper;
      this.lowerThreshold = res[0].percentage_lower;
    } catch (error) {
      console.error("Error fetching thresholds:", error);
    }
  },
  methods: {
    async filterOldValues() {
      try {
        let synonyms = await DataService.getSynonyms(
          this.$route.query.system_id
        );

        if (Array.isArray(synonyms) && synonyms.length > 0) {
          const synonymMap = new Map();

          synonyms.forEach((item) => {
            const { new_value, old_value } = item;

            if (!synonymMap.has(new_value)) {
              synonymMap.set(new_value, [old_value]);
            } else {
              synonymMap.get(new_value).push(old_value);
            }
          });

          this.newValues = Array.from(synonymMap.keys());
          this.oldValuesMap = synonymMap;
          this.editedOldValues = this.newValues.map((value) =>
            this.oldValuesMap.get(value).join(", ")
          );
          this.isEditable = new Array(this.newValues.length).fill(false);
        } else {
          this.newValues = [];
          this.oldValuesMap = new Map();
          this.editedOldValues = [];
          this.isEditable = [];
        }
      } catch (error) {
        console.error("Error fetching synonyms:", error);
      }
    },
    deleteSynonyms(index) {
      const newValueToDelete = this.newValues[index];
      this.newValues.splice(index, 1);
      this.oldValuesMap.delete(newValueToDelete);
      this.editedOldValues.splice(index, 1);
      this.isEditable.splice(index, 1);
    },
    addSynonymGroup() {
      this.newValues.push("New Value");
      this.oldValuesMap.set("New Value", ["Old Value"]);
      this.editedOldValues.push("");
      this.isEditable.push(true);
    },
    handleInput(value, index) {
      // Update the oldValuesMap when input changes
      const oldKey = this.newValues[index];
      const oldValueArray = this.oldValuesMap.get(oldKey) || [];

      // Delete the old key
      this.oldValuesMap.delete(oldKey);

      // Set the new key and value
      const newKey = value.trim(); // Ensure that the new key is trimmed
      this.oldValuesMap.set(newKey, oldValueArray);
      this.newValues[index] = value;
    },

    handleBlur(event, index) {
      let [key, values] = Array.from(this.oldValuesMap.entries())[index];
      if (key !== undefined && values !== undefined) {
        this.oldValuesMap.delete(key);
        const newValues = event.target.innerText
          .split(",")
          .map((value) => value.trim());
        this.oldValuesMap.set(key, newValues);
      }
    },
    async saveContent() {
      try {
        const synonymsObject = {};

        this.oldValuesMap.forEach((value, key) => {
          synonymsObject[key] = value;
        });

        await DataService.updateSynonyms(
          this.$route.query.system_id,
          synonymsObject
        );
        await DataService.updateThresholdsBySystemId(
          this.$route.query.system_id,
          this.upperThreshold,
          this.lowerThreshold
        );
        this.show = true;
        this.message = "Uspješno spremljene promjene.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      } catch (error) {
        this.show = true;
        this.message =
          "Pogreška prilikom spremanja promjena. Molim Vas pokušajte ponovno.";
        setTimeout(() => {
          this.show = false;
        }, 4000);
      }
    },
  },
};
</script>

<style scoped>
.synonym-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.synonym-info {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.new-value {
  font-weight: bold;
  cursor: pointer;
}

.editable {
  background-color: #f0f8ff; /* Light blue background for editable state */
}

.old-values {
  flex-grow: 1;
  margin-left: 10px;
}

button {
  margin-left: 10px;
}

.input-container {
  display: flex;
  flex: 0 0 13%;
  margin: 2px;
  align-items: center;
  border-bottom: 1px solid #8d8d8d;
  position: relative;
  height: 4vh;
}

.custom-input {
  height: 90%;
  font-weight: 600;
  flex-grow: 1;
  padding-right: 2rem;
  padding-left: 2.5rem;
  min-width: 100px;
}

.icon-container {
  width: 2.5rem; /* Width of the icon container */
  display: flex;
}

/* Style the SVG icon as needed */
.bi-pencil {
  width: 16px; /* Icon width */
  height: 16px; /* Icon height */
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer; /* Add a cursor pointer for interaction */
}

.svg {
  height: 1rem;
  position: absolute;
  right: 1rem;
  width: 1rem;
  margin-right: 4px;
  margin-top: 2px;
}

/*popup message*/
.card-header {
  height: 20px;
  vertical-align: middle;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  line-height: 20px;
  padding: 15px;
  color: white;
  position: absolute;
  top: 1rem;
  right: 1rem;
  min-width: 420px;
  border-radius: 5px;
  padding-right: 5rem;
  box-shadow: 0 0 15px 5px #ccc;
}

.cross {
  position: absolute;
  top: 16px;
  right: 15px;
  font-size: 25px;
  font-weight: 100;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
