<template>
  <div class="actions">
    <h3>Namjera korisnika u komunikaciji s virtualnim asistentom</h3>
    <section>
      <div style="display: flex; width: 100%">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            style="width: 100%"
            placeholder="Filtriraj po imenu..."
          />
          <button class="search-button" type="submit" :disabled="true">
            Pretraži
          </button>
        </div>
        <transition name="fade_main" mode="out-in">
          <button
            v-if="!selectedIntents.length"
            @click="newAction"
            class="background-button"
            tabindex="0"
            type="button"
          >
            Nova namjera
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              aria-label="New action"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              role="img"
              class="svg"
            >
              <path
                d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"
              ></path>
            </svg>
          </button>
          <button
            v-else
            @click="deleteSelectedIntents"
            class="background-button"
            style="background: #ff0404"
          >
            Izbriši odabrane
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
              class="svg"
            >
              <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
              <path
                d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
              ></path>
            </svg>
          </button>
        </transition>
      </div>
    </section>
  </div>

  <!-- Table with scrollable tbody and pagination -->
  <div class="table-container">
    <table>
      <thead style="position:relative;z-index:1">
        <tr style="width: 70vw">
          <th scope="col">
            <input type="checkbox" v-model="selectAll" />
          </th>
          <th
            @mouseenter="setSortIcon(0, true)"
            @mouseleave="setSortIcon(0, false)"
            @click="toggleSortIcon(0, 'name')"
            :class="{ active: sortIcon[0] === 2 || sortIcon[0] === 3 }"
            style="width: 30vw"
          >
            <div class="span-wrapper">
              <span> Naziv </span>
              <span>
                <SortingIcon
                  :sortIcon="sortIcon[0]"
                  :isVisible="isVisible[0]"
                />
              </span>
            </div>
          </th>
          <th
            @mouseenter="setSortIcon(1, true)"
            @mouseleave="setSortIcon(1, false)"
            @click="toggleSortIcon(1, 'lastEdit')"
            :class="{ active: sortIcon[1] === 2 || sortIcon[1] === 3 }"
            style="width: 15vw"
          >
            <div class="span-wrapper">
              <span> Zadnje uređivanje</span>
              <span>
                <SortingIcon
                  :sortIcon="sortIcon[1]"
                  :isVisible="isVisible[1]"
                />
              </span>
            </div>
          </th>
          <th
            @mouseenter="setSortIcon(2, true)"
            @mouseleave="setSortIcon(2, false)"
            @click="toggleSortIcon(2, 'numOfQuestions')"
            :class="{ active: sortIcon[2] === 2 || sortIcon[2] === 3 }"
            style="width: 15vw"
          >
            <div class="span-wrapper">
              <span> Broj pitanja </span>
              <span>
                <SortingIcon
                  :sortIcon="sortIcon[2]"
                  :isVisible="isVisible[2]"
                />
              </span>
            </div>
          </th>
          <th
            @mouseenter="setSortIcon(3, true)"
            @mouseleave="setSortIcon(3, false)"
            @click="toggleSortIcon(3, 'numOfRules')"
            :class="{ active: sortIcon[3] === 2 || sortIcon[3] === 3 }"
          >
            <div class="span-wrapper">
              <span> Broj pravila </span>
              <span>
                <SortingIcon
                  :sortIcon="sortIcon[3]"
                  :isVisible="isVisible[3]"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <TransitionGroup name="table-list" tag="tbody" mode="out-in">
        <tr v-for="(intent, index) in filteredIntents" :key="index">
          <td>
            <input
              type="checkbox"
              v-model="selectedIntents"
              :value="intent.id"
              number
            />
          </td>
          <td>
            <div>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
                style="
                  float: left;
                  margin-right: 0.25rem;
                  position: relative;
                  top: 0.125rem;
                "
              >
                <path
                  d="M25.7,9.3l-7-7C18.5,2.1,18.3,2,18,2H8C6.9,2,6,2.9,6,4v24c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V10C26,9.7,25.9,9.5,25.7,9.3	z M18,4.4l5.6,5.6H18V4.4z M24,28H8V4h8v6c0,1.1,0.9,2,2,2h6V28z"
                ></path>
                <path d="M10 22H22V24H10zM10 16H22V18H10z"></path>
              </svg>
              <a style="margin-top: 2px" @click="navigateToDetail(intent)">{{
                intent.name ? intent.name : "Bez naslova"
              }}</a>
            </div>
          </td>
          <td>{{ intent.last_edited_formatted }}</td>
          <td>
            <span>{{ intent.examples_count }}</span>
          </td>
          <td>
            <span>{{ intent.steps_count }}</span>
          </td>
        </tr>
      </TransitionGroup>
    </table>

    <!-- Fixed pagination navigation -->
    <div class="pagination">
      <div
        style="
          width:100%;
          border: 1px solid #e0e0e0;
          display: flex;
          flex-wrap: wrap;
          font-weight: 400;
          justify-content: space-between;
          letter-spacing: 0.16px;
          line-height: 1.28572;
          min-height: 2.5rem;
          align-items: center;
        "
      >
        <div
          style="
            padding: 0 1rem;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            height: 100%;
          "
        >
          <div>
            <div
              class="items-per-page"
              style="display: flex; align-items: center; flex-wrap: wrap"
            >
              <label for="itemsPerPage">Stavki po stranici:</label>
              <CustomSelect
                :options="[2, 5, 10, 25, 100]"
                :value="itemsPerPage"
                :position="'up'"
                @update:value="itemsPerPage = $event"
              />
            </div>
          </div>
          <span style="margin-left: 1.235rem; word-break: break-all"
            >Prikazivanje {{ (currentPage - 1) * itemsPerPage + 1 }} -
            {{ Math.min(currentPage * itemsPerPage, filteredLength) }} od
            {{ filteredLength }} stavki</span
          >
        </div>
        <div
          style="
            align-items: center;
            display: flex;
            height: 100%;
            flex-wrap: wrap;
          "
        >
          <span style="margin-left: 0.0625rem; margin-right: 1rem"
            >{{ currentPage }} od {{ totalPages }} stranica</span
          >
          <div style="display: flex; flex-wrap: wrap">
            <button
              @click="currentPage > 1 ? currentPage-- : null"
              :disabled="currentPage === 1"
              style="
                border-left: 1px solid #e0e0e0;
                height: 2.5rem;
                margin: 0;
                min-height: 2rem;
                transition: outline 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
                  background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
                width: 2.5rem;
              "
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-label="Previous page"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                role="img"
                style="margin-top: 5px"
              >
                <path d="M20 24L10 16 20 8z"></path>
              </svg>
            </button>
            <button
              @click="currentPage < totalPages ? currentPage++ : null"
              :disabled="currentPage === totalPages"
              style="
                border-left: 1px solid #e0e0e0;
                height: 2.5rem;
                margin: 0;
                min-height: 2rem;
                transition: outline 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
                  background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
                width: 2.5rem;
              "
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-label="Next page"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                role="img"
                style="margin-top: 5px"
              >
                <path d="M12 8L22 16 12 24z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Grey background at the bottom with a chatbot -->
  <div class="bottom-section">
    <section>
      <img src="../assets/eu.png" height="35" style="margin-right:1rem">
      <div class="chat" @click="showChatbot = !showChatbot">
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
    </section>
    <Teleport to="body">
      <loading v-if="loading" />
    </Teleport>
    <Transition name="fade">
      <div v-if="showChatbot" class="chatbot-container">
        <Chatbot />
      </div>
    </Transition>
  </div>
</template>

<script>
import CustomSelect from "../components/CustomSelect.vue";
import DataService from "../services/data.services";
import SortingIcon from "../views/ui/SortingIcon.vue";
import Chatbot from "../components/ChatBot.vue";
import Loading from "../components/popups/LoadingModal.vue";
export default {
  components: { CustomSelect, SortingIcon, Chatbot, Loading },
  data() {
    return {
      intents: [],
      initialIntents: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      selectedIntents: [],
      sortIcon: [1, 1, 1, 1],
      isVisible: [false, false, false, false],
      showChatbot: false,
      loading: false,
      filteredLength: 0,
    };
  },
  async created() {
    await this.getIntents();
    sessionStorage.setItem("systemId", this.$route.query.system_id);
    this.getStoredData();
  },
  beforeUnmount() {
    sessionStorage.setItem("currentPage", this.currentPage.toString());
    sessionStorage.setItem("itemsPerPage", this.itemsPerPage.toString());
    sessionStorage.setItem("sortIcon", JSON.stringify(this.sortIcon));
    sessionStorage.setItem("isVisible", JSON.stringify(this.isVisible));
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
    totalPages(newValue, oldValue) {
      if (newValue < this.currentPage || oldValue < this.currentPage) {
        this.currentPage = 1;
      }
    },
  },
  computed: {
    filteredIntents() {
      // Filter intents based on the search query
      const filtered = this.intents.filter((intent) =>
        intent.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.getFilteredLength(filtered);
      // Calculate the start and end indexes for the current page
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Return a slice of the filtered intents for the current page
      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredLength / this.itemsPerPage);
    },
    selectAll: {
      get: function () {
        return this.intents
          ? this.selectedIntents.length == this.intents.length
          : false;
      },
      set: function (value) {
        var selectedIntents = [];

        if (value) {
          this.intents.forEach(function (intent) {
            selectedIntents.push(intent.id.toString());
          });
        }

        this.selectedIntents = selectedIntents;
      },
    },
  },
  methods: {
    getStoredData() {
      const storedCurrentPage = sessionStorage.getItem("currentPage");
      const storedItemsPerPage = sessionStorage.getItem("itemsPerPage");
      const storedSortIcon = sessionStorage.getItem("sortIcon");
      const storedIsVisible = sessionStorage.getItem("isVisible");

      this.currentPage = storedCurrentPage
        ? parseInt(storedCurrentPage, 10)
        : this.currentPage;
      this.itemsPerPage = storedItemsPerPage
        ? parseInt(storedItemsPerPage, 10)
        : this.itemsPerPage;
      this.sortIcon = storedSortIcon
        ? JSON.parse(storedSortIcon)
        : this.sortIcon;
      this.isVisible = storedIsVisible
        ? JSON.parse(storedIsVisible)
        : this.isVisible;

      switch (storedSortIcon) {
        case "[1,1,1,1]":
          break;
        case "[2,1,1,1]":
          this.intents.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "[3,1,1,1]":
          this.intents.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "[1,2,1,1]":
          this.intents.sort((a, b) => {
            const timestampA = this.parseFormattedTime(a.last_edited_formatted);
            const timestampB = this.parseFormattedTime(b.last_edited_formatted);
            return timestampA - timestampB;
          });
          break;
        case "[1,3,1,1]":
          this.intents.sort((a, b) => {
            const timestampA = this.parseFormattedTime(a.last_edited_formatted);
            const timestampB = this.parseFormattedTime(b.last_edited_formatted);
            return timestampB - timestampA;
          });
          break;
        case "[1,1,2,1]":
          this.intents.sort((a, b) => a.examples_count - b.examples_count);
          break;
        case "[1,1,3,1]":
          this.intents.sort((a, b) => b.examples_count - a.examples_count);
          break;
        case "[1,1,1,2]":
          this.intents.sort((a, b) => a.steps_count - b.steps_count);
          break;
        case "[1,1,1,3]":
          this.intents.sort((a, b) => b.steps_count - a.steps_count);
          break;
        default:
      }
    },
    navigateToDetail(intent) {
      // Navigate to intentDetail component with the selected intent
      this.$router.push({
        name: "IntentRules",
        query: { system_id: this.$route.query.system_id, intent_id: intent.id },
      });
    },
    async newAction() {
      let id = JSON.parse(
        JSON.stringify(
          await DataService.addIntentForSystem(this.$route.query.system_id)
        )
      ).intent_id;
      console.log(id);
      await DataService.addRuleForIntent(id);
      this.$router.push({
        name: "IntentRules",
        query: { system_id: this.$route.query.system_id, intent_id: id },
      });
    },
    async deleteIntent(id) {
      try {
        this.loading = true;
        await DataService.deleteStep(id);
        await DataService.deleteQuestionsById(id, this.$route.query.system_id);
        await DataService.deleteIntent(id, this.$route.query.system_id);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSelectedIntents() {
      this.loading = true;
      // Loop through selectedIntents and call deleteIntent for each
      for (const intent of this.selectedIntents) {
        await this.deleteIntent(intent, this.$route.query.system_id);
      }
      this.loading = false;
      this.getIntents();
      // Clear the selectedIntents array after deleting
      this.selectedIntents = [];
    },
    async getIntents() {
      if (this.$route.query.system_id !== undefined) {
        try {
          let tmp = await DataService.getIntentsForSystem(
            this.$route.query.system_id
          );

          // Sort by the original date objects
          tmp = tmp.sort(
            (objA, objB) =>
              new Date(objB.last_edited) - new Date(objA.last_edited)
          );

          // Format the date strings
          const formattedIntents = tmp.map((obj) => {
            const lastEditedDate = new Date(obj.last_edited);
            const formattedTimeDifference =
              this.formatTimeDifference(lastEditedDate);
            return { ...obj, last_edited_formatted: formattedTimeDifference };
          });

          // Assign the sorted and formatted intents to the data property
          this.intents = formattedIntents;
          this.initialIntents = [...this.intents];
        } catch (error) {
          console.error(error);
        }
      }
    },
    formatTimeDifference(lastEditedDate) {
      // Assuming lastEditedDate is provided in a specific time zone (e.g., UTC)
      // Create a new Date object for the current time in the CET time zone
      const currentDate = new Date();
      const offsetCET = -60; // CET is UTC+1, accounting for daylight saving time
      currentDate.setMinutes(currentDate.getMinutes() - offsetCET);
      const timeDifference = currentDate - new Date(lastEditedDate);

      // Define time intervals in milliseconds
      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;

      if (timeDifference < minute) {
        const seconds = Math.floor(timeDifference / 1000);
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
      } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else {
        const days = Math.floor(timeDifference / day);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
      }
    },
    parseFormattedTime(timeString) {
      const currentTime = new Date();

      if (timeString.includes("second" || "seconds")) {
        const seconds = parseInt(timeString);
        return currentTime - new Date(currentTime - seconds * 1000);
      } else if (timeString.includes("minute" || "minutes")) {
        const minutes = parseInt(timeString);
        return currentTime - new Date(currentTime - minutes * 60 * 1000);
      } else if (timeString.includes("hour" || "hours")) {
        const hours = parseInt(timeString);
        return currentTime - new Date(currentTime - hours * 60 * 60 * 1000);
      } else if (timeString.includes("day" || "days")) {
        const days = parseInt(timeString);
        return currentTime - new Date(currentTime - days * 24 * 60 * 60 * 1000);
      } else if (timeString.includes("year" || "years")) {
        const years = parseInt(timeString);
        return (
          currentTime -
          new Date(currentTime - years * 365 * 24 * 60 * 60 * 1000)
        );
      }
    },
    setSortIcon(index, isHovered) {
      if (isHovered && this.sortIcon[index] === 1) {
        this.sortIcon[index] = 1;
        this.isVisible[index] = true;
      } else if (!isHovered && this.sortIcon[index] === 1) {
        this.isVisible[index] = false;
      }
    },
    toggleSortIcon(index, sortSubject) {
      if (this.sortIcon[index] === 1) {
        this.sortIcon[index] = 2;
        for (let i = 0; i < this.sortIcon.length; i++) {
          if (i !== index && this.sortIcon[i] > 1) {
            this.sortIcon[i] = 1;
            this.isVisible[i] = false;
          }
        }
        if (sortSubject === "name") {
          this.intents.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortSubject === "lastEdit") {
          this.intents.sort((a, b) => {
            const timestampA = this.parseFormattedTime(a.last_edited_formatted);
            const timestampB = this.parseFormattedTime(b.last_edited_formatted);
            return timestampA - timestampB;
          });
        } else if (sortSubject === "numOfQuestions") {
          this.intents.sort((a, b) => a.examples_count - b.examples_count);
        } else if (sortSubject === "numOfRules") {
          this.intents.sort((a, b) => a.steps_count - b.steps_count);
        }
      } else if (this.sortIcon[index] === 2) {
        this.sortIcon[index] = 3;
        if (sortSubject === "name") {
          this.intents.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortSubject === "lastEdit") {
          this.intents.sort((a, b) => {
            const timestampA = this.parseFormattedTime(a.last_edited_formatted);
            const timestampB = this.parseFormattedTime(b.last_edited_formatted);
            return timestampB - timestampA;
          });
        } else if (sortSubject === "numOfQuestions") {
          this.intents.sort((a, b) => b.examples_count - a.examples_count);
        } else if (sortSubject === "numOfRules") {
          this.intents.sort((a, b) => b.steps_count - a.steps_count);
        }
      } else if (this.sortIcon[index] === 3) {
        this.sortIcon[index] = 1;
        this.intents = [...this.initialIntents];
      }
    },
    getFilteredLength(filtered) {
      this.filteredLength = filtered.length;
    },
    refreshPagination() {
      this.currentPage = 1;
    },
  },
};
</script>
<style>
.actions{
  padding-top: 20px;
  margin: 0 0.7rem 0 0.7rem;
}
.actions section {
  background-color: #fff;
  display: flex;
  min-height: 3rem;
  position: relative;
  width: 100%;
}

.search-container {
  width: 100%;
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.search-button {
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
  opacity: 0.7;
}

.table-container {
  margin: 0 0.7rem 0 0.7rem;
  flex-grow: 1;
  overflow: auto;
  position: relative;
}

table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  background: white;
  color: #212529;
  word-break: break-word;
}
tr,
th {
  border-top: none;
  border-bottom: none !important;
}

.span-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

thead th {
  position: sticky;
  top: 0;
  background: #e0e0e0;
  vertical-align: bottom;
  text-align: left;
  z-index: 2; /* Ensure it's above the tbody while scrolling */
  text-align: left;
}

th,
td {
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

.control__indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 2px solid #ccc;
  background: transparent;
}

table tbody tr th,
table tbody tr td {
  vertical-align: middle;
  position: relative;
  transition: 0.3s all ease;
}

table tbody tr th::before,
table tbody tr td::before {
  top: -1px;
}

table tbody tr th::before,
table tbody tr th::after,
table tbody tr td::before,
table tbody tr td::after {
  transition: 0.3s all ease;
  content: "";
  left: 0;
  right: 0;
  position: absolute;
  height: 1px;
  background: #bfbfbf;
  width: 100%;
  opacity: 0;
  visibility: hidden;
}

table input {
  height: 20px;
  width: 20px;
}

th:not(:first-child):not(:nth-child(6)):hover {
  user-select: none;
  filter: brightness(80%);
  cursor: pointer;
}

.pagination {
  position: sticky;
  z-index: 1;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
}

.bottom-section {
  background-color: var(--background);
  min-height: 120px;
  position: relative;
  z-index: 2;
}

.bottom-section section{
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
</style>
