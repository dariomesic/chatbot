<template>
  <div class="actions">
    <h3>Popis razgovora od strane chatbota i korisnika</h3>
    <div class="filters-container">
      <div class="input-control" style="width: 15vw">
        <label>Odaberite vremenski raspon</label>
        <CustomSelect
          :placeholder="'Odaberite'"
          :options="[
            'Prilagođeni raspon',
            'Danas',
            'Prošli tjedan',
            'Prošli mjesec',
            'Prošla godina',
          ]"
          :value="selectedDateRange"
          @update:value="selectedDateRange = $event"
          style="box-sizing: border-box"
        />
      </div>
      <div class="input-control" style="width: 20vw">
        <div class="input-dates-container">
          <div style="position: relative; width: 45%">
            <label>Početni datum</label>
            <div
              class="custom-input-date"
              @click="showDatePicker('start')"
              tabindex="1"
            >
              <div class="selected-date">
                <span
                  class="date"
                  :innerHTML="formatedSelectedStartDate"
                ></span>
                <input
                  type="date"
                  ref="startDatePicker"
                  v-model="selectedStartDate"
                  :min="startMinDate"
                  :max="startMaxDate"
                />
                <span class="datepicker-toggle-button"
                  ><svg
                    width="12"
                    height="12"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>calendar [#1322]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-60.000000, -2319.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M21.971246,2167 L5.99680511,2167 L5.99680511,2163.971 C5.99680511,2163.435 6.43111022,2163 6.96625399,2163 L7.99361022,2163 L7.99361022,2165 L9.99041534,2165 L9.99041534,2163 L17.9776358,2163 L17.9776358,2165 L19.9744409,2165 L19.9744409,2163 L20.9728435,2163 C21.5239617,2163 21.971246,2163.448 21.971246,2164 L21.971246,2167 Z M21.971246,2176 C21.971246,2176.55 21.5219649,2177 20.9728435,2177 L6.99520767,2177 C6.44408946,2177 5.99680511,2176.552 5.99680511,2176 L5.99680511,2169 L21.971246,2169 L21.971246,2176 Z M4.06389776,2176.761 C4.06389776,2177.865 5.02136581,2179 6.12360224,2179 L22.0980431,2179 C23.201278,2179 24,2177.979 24,2176.761 C24,2176.372 23.9680511,2164.36 23.9680511,2163.708 C23.9680511,2161.626 23.6875,2161 19.9744409,2161 L19.9744409,2159 L17.9776358,2159 L17.9776358,2161 L9.99041534,2161 L9.99041534,2159 L7.99361022,2159 L7.99361022,2161 L5.99680511,2161 C4.8985623,2161 4,2161.9 4,2163 L4.06389776,2176.761 Z"
                              id="calendar-[#1322]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div style="position: relative; width: 45%">
            <label>Završni datum</label>
            <div
              class="custom-input-date"
              @click="showDatePicker('end')"
              tabindex="1"
            >
              <div class="selected-date">
                <span class="date" :innerHTML="formatedSelectedEndDate"></span>
                <input
                  type="date"
                  ref="endDatePicker"
                  v-model="selectedEndDate"
                  :min="endMinDate"
                  :max="endMaxDate"
                />
                <span class="datepicker-toggle-button"
                  ><svg
                    width="12"
                    height="12"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>calendar [#1322]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-60.000000, -2319.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M21.971246,2167 L5.99680511,2167 L5.99680511,2163.971 C5.99680511,2163.435 6.43111022,2163 6.96625399,2163 L7.99361022,2163 L7.99361022,2165 L9.99041534,2165 L9.99041534,2163 L17.9776358,2163 L17.9776358,2165 L19.9744409,2165 L19.9744409,2163 L20.9728435,2163 C21.5239617,2163 21.971246,2163.448 21.971246,2164 L21.971246,2167 Z M21.971246,2176 C21.971246,2176.55 21.5219649,2177 20.9728435,2177 L6.99520767,2177 C6.44408946,2177 5.99680511,2176.552 5.99680511,2176 L5.99680511,2169 L21.971246,2169 L21.971246,2176 Z M4.06389776,2176.761 C4.06389776,2177.865 5.02136581,2179 6.12360224,2179 L22.0980431,2179 C23.201278,2179 24,2177.979 24,2176.761 C24,2176.372 23.9680511,2164.36 23.9680511,2163.708 C23.9680511,2161.626 23.6875,2161 19.9744409,2161 L19.9744409,2159 L17.9776358,2159 L17.9776358,2161 L9.99041534,2161 L9.99041534,2159 L7.99361022,2159 L7.99361022,2161 L5.99680511,2161 C4.8985623,2161 4,2161.9 4,2163 L4.06389776,2176.761 Z"
                              id="calendar-[#1322]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-control" style="width: 20vw">
        <label>Filtriraj prema session ID-u</label>
        <div style="display: flex">
          <span class="search-icon"></span>
          <input
            type="text"
            class="conversation_input"
            v-model="searchBySessionId"
            placeholder="Pretraži"
          />
        </div>
      </div>
      <div class="input-control" style="width: 20vw">
        <label>Filtriraj prema namjerama</label>
        <div class="custom-checkbox-select" tabindex="1">
          <div class="selected-items" @click="toggleDropdown" ref="selectedItemsRef">
            <span
              v-if="selectedIntents.length === 0"
              style="
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #757575;
                min-width: 1rem;
              "
              >Odaberite namjere...</span
            >
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                min-width: 1rem;
              "
              v-else
              >{{ selectedIntents.join(", ") }}</span
            >
            <svg class="dropdown-arrow" viewBox="0 0 16 16">
              <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
              <title>Open menu</title>
            </svg>
          </div>
          <div v-show="isDropdownOpen" class="dropdown" ref="dropdownRef">
            <button
              style="display: block; padding: 8px; color: var(--main__color)"
              @click="removeChosenIntents"
            >
              Ukloni sve...
            </button>
            <label
              v-for="intent in uniqueIntents"
              :key="intent"
              class="checkbox-label"
            >
              <input
                type="checkbox"
                :value="intent"
                v-model="selectedIntents"
              />
              {{ intent }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="thumbs-container">
      <div style="margin-right: 3rem">
        <input
          type="checkbox"
          v-model="filterThumbsUp"
          style="vertical-align: middle"
        />
        <label style="color: #555353; font-size: 12px"
          >Filtriraj prema palac gore</label
        >
      </div>
      <div>
        <input
          type="checkbox"
          v-model="filterThumbsDown"
          style="vertical-align: middle"
        />
        <label style="color: #555353; font-size: 12px"
          >Filtriraj prema palac dolje</label
        >
      </div>
    </div>
  </div>


  <!-- Table with scrollable tbody and pagination -->
  <div class="table-container">
    <table>
      <thead style="position:relative;z-index:1">
        <tr style="width: 70vw">
          <th
            @mouseenter="setSortIcon(0, true)"
            @mouseleave="setSortIcon(0, false)"
            @click="toggleSortIcon(0, 'conversations')"
            :class="{ active: sortIcon[0] === 2 || sortIcon[0] === 3 }"
            style="width: 20vw"
          >
            <div class="span-wrapper">
              <span> Razgovori </span>
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
            @click="toggleSortIcon(1, 'intents')"
            :class="{ active: sortIcon[1] === 2 || sortIcon[1] === 3 }"
            style="width: 15vw"
          >
            <div class="span-wrapper">
              <span>Namjere</span>
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
            @click="toggleSortIcon(2, 'requests')"
            :class="{ active: sortIcon[2] === 2 || sortIcon[2] === 3 }"
            style="width: 25vw"
          >
            <div class="span-wrapper">
              <span>Unosi</span>
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
            @click="toggleSortIcon(3, 'threshold')"
            :class="{ active: sortIcon[3] === 2 || sortIcon[3] === 3 }"
          >
            <div class="span-wrapper">
              <span>Prag</span>
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
        <tr v-for="(conversation, index) in filteredConversations" :key="index">
          <td>
            <div style="display: flex; flex-direction: column">
              <span style="margin-bottom: 0.5rem; color: var(--main__color)">{{
                formatTime(conversation)
              }}</span>
              <span style="font-size: 14px">{{ conversation.session_id }}</span>
            </div>
          </td>
          <td>{{ conversation.intent_name }}</td>
          <td>
            <span>
              <template v-if="conversation.thumbs_up === 1">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M3 10C3 9.44772 3.44772 9 4 9H7V21H4C3.44772 21 3 20.5523 3 20V10Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M7 11V19L8.9923 20.3282C9.64937 20.7662 10.4214 21 11.2111 21H16.4586C17.9251 21 19.1767 19.9398 19.4178 18.4932L20.6119 11.3288C20.815 10.1097 19.875 9 18.6391 9H14"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M14 9L14.6872 5.56415C14.8659 4.67057 14.3512 3.78375 13.4867 3.49558V3.49558C12.6336 3.21122 11.7013 3.59741 11.2992 4.4017L8 11H7"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </template>
              <template v-else-if="conversation.thumbs_down === 1">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M21 14C21 14.5523 20.5523 15 20 15H17V3H20C20.5523 3 21 3.44772 21 4V14Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M17 13V5L15.0077 3.6718C14.3506 3.23375 13.5786 3 12.7889 3H7.54138C6.07486 3 4.82329 4.06024 4.5822 5.5068L3.38813 12.6712C3.18496 13.8903 4.12504 15 5.36092 15H10"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M10 15L9.31283 18.4358C9.13411 19.3294 9.64876 20.2163 10.5133 20.5044V20.5044C11.3664 20.7888 12.2987 20.4026 12.7008 19.5983L16 13H17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </template>
              <template v-else>
                <pre
                  style="
                    overflow-wrap: break-word;
                    display: unset;
                    white-space: pre-wrap;
                  "
                  :innerHTML="formatText(conversation)"
                ></pre>
              </template>
            </span>
          </td>
          <td>{{ formatThreshold(conversation) }}</td>
        </tr>
      </TransitionGroup>
    </table>

    <div class="pagination">
      <!-- Your pagination buttons go here -->
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
            {{ Math.min(currentPage * itemsPerPage, filteredLength) }}
            od {{ filteredLength }} stavki</span
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
              :disabled="currentPage === totalPages || totalPages === 0"
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

  <!-- Grey background at the bottom -->
  <div class="bottom-section"/>
</template>

<script>
import CustomSelect from "../components/CustomSelect.vue";
import DataService from "../services/data.services";
import SortingIcon from "../views/ui/SortingIcon.vue";
export default {
  components: {
    CustomSelect,
    SortingIcon,
  },
  data() {
    return {
      conversations: [],
      initialConversationsOrder: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortIcon: [1, 1, 1, 1],
      isVisible: [false, false, false, false],
      filterThumbsUp: false,
      filterThumbsDown: false,
      searchBySessionId: "",
      uniqueIntents: [],
      isDropdownOpen: false,
      selectedIntents: [],
      selectedDateRange: "Prilagođeni raspon",
      selectedStartDate: "",
      selectedEndDate: "",
      startMinDate: "",
      startMaxDate: "",
      endMinDate: "",
      endMaxDate: "",
      startDateText: "",
      endDateText: "",
      filteredLength: 0,
    };
  },
  async created() {
    await this.getConversations();
    const today = new Date().toISOString().split("T")[0];
    this.startMaxDate = today;
    this.endMaxDate = today;
    this.getStoredData();
  },
  beforeUnmount() {
    sessionStorage.setItem("currentPageCH", this.currentPage.toString());
    sessionStorage.setItem("itemsPerPageCH", this.itemsPerPage.toString());
    sessionStorage.setItem("sortIconCH", JSON.stringify(this.sortIcon));
    sessionStorage.setItem("isVisibleCH", JSON.stringify(this.isVisible));
  },
  watch: {
    selectedDateRange(newVal) {
      const today = new Date();
      const todayFormatted = today.toISOString().split("T")[0];
      const weekAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );
      const formattedWeekAgo = `${weekAgo.getFullYear()}-${(weekAgo.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${weekAgo.getDate().toString().padStart(2, '0')}`;
      const monthAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      const formattedMonthAgo = `${monthAgo.getFullYear()}-${
        monthAgo.getMonth() + 1
      }-${monthAgo.getDate()}`;
      const yearAgo = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
      const formattedYearAgo = `${yearAgo.getFullYear()}-${
        yearAgo.getMonth() + 1
      }-${yearAgo.getDate()}`;
      if (newVal === "Prilagođeni raspon") {
        this.startMinDate = "";
        this.startMaxDate = todayFormatted;
        this.endMinDate = this.selectedStartDate;
      } else if (newVal === "Danas") {
        this.selectedStartDate = todayFormatted;
        this.startMinDate = todayFormatted;
        this.endMinDate = todayFormatted;
      } else if (newVal === "Prošli tjedan") {
        this.selectedStartDate = formattedWeekAgo;
        this.startMinDate = formattedWeekAgo;
        this.endMinDate = formattedWeekAgo;
      } else if (newVal === "Prošli mjesec") {
        this.selectedStartDate = formattedMonthAgo;
        this.startMinDate = formattedMonthAgo;
        this.endMinDate = formattedMonthAgo;
      } else if (newVal === "Prošla godina") {
        this.selectedStartDate = formattedYearAgo;
        this.startMinDate = formattedYearAgo;
        this.endMinDate = formattedYearAgo;
      }
      if (newVal !== "Prilagođeni raspon")
        this.selectedEndDate = todayFormatted;
    },
    selectedStartDate(newVal) {
      this.endMinDate = newVal;
      if (newVal === "" && this.selectedEndDate === "") {
        this.selectedDateRange = "Prilagođeni raspon";
        this.startMaxDate = new Date().toISOString().split("T")[0];
      }
      if (
        newVal === new Date().toISOString().split("T")[0] &&
        this.selectedEndDate === new Date().toISOString().split("T")[0]
      ) {
        this.selectedDateRange = "Danas";
      }
    },
    selectedEndDate(newVal) {
      if (newVal !== "") {
        this.startMaxDate = newVal;
      }
      if (newVal === "" && this.selectedStartDate === "") {
        this.selectedDateRange = "Prilagođeni raspon";
        this.startMaxDate = new Date().toISOString().split("T")[0];
      }
      if (
        newVal === new Date().toISOString().split("T")[0] &&
        this.selectedStartDate === new Date().toISOString().split("T")[0]
      ) {
        this.selectedDateRange = "Danas";
      }
    },
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
    filteredConversations() {
      let filtered = this.conversations;
      if (this.filterThumbsUp && this.filterThumbsDown) {
        filtered = filtered.filter(
          (conversation) =>
            conversation.thumbs_up === 1 || conversation.thumbs_down === 1
        );
      } else if (this.filterThumbsUp) {
        filtered = filtered.filter(
          (conversation) => conversation.thumbs_up === 1
        );
      } else if (this.filterThumbsDown) {
        filtered = filtered.filter(
          (conversation) => conversation.thumbs_down === 1
        );
      }
      if (this.searchBySessionId.trim() !== "") {
        filtered = filtered.filter((conversation) =>
          conversation.session_id
            .toLowerCase()
            .includes(this.searchBySessionId.toLowerCase())
        );
      }
      if (this.selectedIntents.length > 0) {
        filtered = filtered.filter((conversation) => {
          return this.selectedIntents.includes(conversation.intent_name);
        });
      }

      if (this.selectedStartDate && this.selectedEndDate) {
        if (this.selectedStartDate === this.selectedEndDate) {
          filtered = filtered.filter((conversation) => {
            const conversationDate = new Date(conversation.time);
            return (
              conversationDate.toISOString().split("T")[0] ===
              this.selectedStartDate
            );
          });
        } else {
          filtered = filtered.filter((conversation) => {
            const conversationDate = new Date(conversation.time);
            return (
              conversationDate.toISOString().split("T")[0] >=
                this.selectedStartDate &&
              conversationDate.toISOString().split("T")[0] <=
                this.selectedEndDate
            );
          });
        }
      } else if (this.selectedStartDate && !this.selectedEndDate) {
        filtered = filtered.filter((conversation) => {
          const conversationDate = new Date(conversation.time);
          return (
            conversationDate.toISOString().split("T")[0] >=
            this.selectedStartDate
          );
        });
      } else if (!this.selectedStartDate && this.selectedEndDate) {
        filtered = filtered.filter((conversation) => {
          const conversationDate = new Date(conversation.time);
          return (
            conversationDate.toISOString().split("T")[0] <= this.selectedEndDate
          );
        });
      }
      this.getFilteredLength(filtered);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filtered.slice(startIndex, endIndex);
    },
    formatedSelectedStartDate() {
      const options = { year: "numeric", month: "short", day: "numeric" };
      if (this.selectedStartDate) {
        const formatedDate = new Date(
          this.selectedStartDate
        ).toLocaleDateString("hr-HR", options);
        return formatedDate;
      } else {
        return "-";
      }
    },
    formatedSelectedEndDate() {
      const options = { year: "numeric", month: "short", day: "numeric" };
      if (this.selectedEndDate) {
        const formatedDate = new Date(this.selectedEndDate).toLocaleDateString(
          "hr-HR",
          options
        );
        return formatedDate;
      } else {
        return "-";
      }
    },
    totalPages() {
      return Math.ceil(this.filteredLength / this.itemsPerPage);
    },
  },
  methods: {
    getStoredData() {
      const storedCurrentPage = sessionStorage.getItem("currentPageCH");
      const storedItemsPerPage = sessionStorage.getItem("itemsPerPageCH");
      const storedSortIcon = sessionStorage.getItem("sortIconCH");
      const storedIsVisible = sessionStorage.getItem("isVisibleCH");

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
          this.conversations.sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeA - timeB;
          });
          break;
        case "[3,1,1,1]":
          this.conversations.sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeB - timeA;
          });
          break;
        case "[1,2,1,1]":
          this.conversations.sort((a, b) => {
            const intentA = this.uniqueIntents.find(
              (int) => int === a.intent_name
            );
            const intentB = this.uniqueIntents.find(
              (int) => int === b.intent_name
            );
            return intentA.localeCompare(intentB);
          });
          break;
        case "[1,3,1,1]":
          this.conversations.sort((a, b) => {
            const intentA = this.uniqueIntents.find(
              (int) => int === a.intent_name
            );
            const intentB = this.uniqueIntents.find(
              (int) => int === b.intent_name
            );
            return intentB.localeCompare(intentA);
          });
          break;
        case "[1,1,2,1]":
          this.conversations.sort((a, b) => a.text.localeCompare(b.text));
          break;
        case "[1,1,3,1]":
          this.conversations.sort((a, b) => b.text.localeCompare(a.text));
          break;
        case "[1,1,1,2]":
          this.conversations.sort((a, b) => {
            if (a.threshold === "") return 1;
            else if (b.threshold === "") return -1;
            else return a.threshold - b.threshold;
          });
          break;
        case "[1,1,1,3]":
          this.conversations.sort((a, b) => b.threshold - a.threshold);
          break;
        default:
      }
    },
    async getConversations() {
      if (this.$route.query.system_id !== undefined) {
        try {
          this.conversations = await DataService.getConversationsForSystem(
            this.$route.query.system_id
          );
          this.conversations.sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeB - timeA;
          });
          this.conversations.forEach((conversation) => {
            if (!this.uniqueIntents.includes(conversation.intent_name)) {
              this.uniqueIntents.push(conversation.intent_name);
            }
          });
          this.initialConversationsOrder = [...this.conversations];
        } catch (error) {
          console.error(error);
        }
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
        if (sortSubject === "conversations") {
          this.conversations.sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeA - timeB;
          });
        } else if (sortSubject === "intents") {
          this.conversations.sort((a, b) => {
            const intentA = this.uniqueIntents.find(
              (int) => int === a.intent_name
            );
            const intentB = this.uniqueIntents.find(
              (int) => int === b.intent_name
            );
            return intentA.localeCompare(intentB);
          });
        } else if (sortSubject === "requests") {
          this.conversations.sort((a, b) => a.text.localeCompare(b.text));
        } else if (sortSubject === "threshold") {
          this.conversations.sort((a, b) => {
            if (a.threshold === "") return 1;
            else if (b.threshold === "") return -1;
            else return a.threshold - b.threshold;
          });
        }
      } else if (this.sortIcon[index] === 2) {
        this.sortIcon[index] = 3;
        if (sortSubject === "conversations") {
          this.conversations.sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);
            return timeB - timeA;
          });
        } else if (sortSubject === "intents") {
          this.conversations.sort((a, b) => {
            const intentA = this.uniqueIntents.find(
              (int) => int === a.intent_name
            );
            const intentB = this.uniqueIntents.find(
              (int) => int === b.intent_name
            );
            return intentB.localeCompare(intentA);
          });
        } else if (sortSubject === "requests") {
          this.conversations.sort((a, b) => b.text.localeCompare(a.text));
        } else if (sortSubject === "threshold") {
          this.conversations.sort((a, b) => b.threshold - a.threshold);
        }
      } else if (this.sortIcon[index] === 3) {
        this.sortIcon[index] = 1;
        this.conversations = [...this.initialConversationsOrder];
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        document.addEventListener("click", this.closeDropdownOnOutsideClick);
      } else {
        document.removeEventListener("click", this.closeDropdownOnOutsideClick);
      }
    },
    closeDropdownOnOutsideClick(event) {
      const dropdown = this.$refs.dropdownRef;
      const selectedItems = this.$refs.selectedItemsRef;
      if (
        !dropdown.contains(event.target) &&
        !selectedItems.contains(event.target)
      ) {
        this.isDropdownOpen = false;
        document.removeEventListener("click", this.closeDropdownOnOutsideClick);
      }
    },
    removeChosenIntents() {
      this.currentPage = 1;
      this.selectedIntents = [];
      this.isDropdownOpen = false;
    },
    formatTime(conversation) {
      const time = new Date(conversation.time);

      time.setHours(time.getHours() - 1);

      const day = time.toLocaleString("hr-HR", { day: "numeric" });
      const month = time.toLocaleString("hr-HR", { month: "short" });
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      const year = time.getFullYear(); // Get the year
      const hoursAndMinutes = time.toLocaleString("hr-HR", {
        hour: "numeric",
        minute: "numeric",
      });

      const formattedTime = `${day} ${capitalizedMonth} ${year}. u ${hoursAndMinutes}`;
      return formattedTime;
    },
    formatText(conversation) {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = conversation.text;

      tempContainer.querySelectorAll("div,img").forEach((element) => {
        element.parentNode.removeChild(element);
      });

      const formattedText = tempContainer.innerHTML;

      return formattedText;
    },
    formatThreshold(conversation) {
      if (conversation.threshold) {
        const percentage = parseFloat(conversation.threshold) * 100;
        const roundedPercentage = Math.round(percentage);
        return `${roundedPercentage}%`;
      } else {
        return "";
      }
    },
    showDatePicker(datePicker) {
      if (datePicker === "start") {
        this.$refs.startDatePicker.showPicker();
      } else {
        this.$refs.endDatePicker.showPicker();
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
th:hover {
  user-select: none;
  filter: brightness(80%);
  cursor: pointer;
}
.filters-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.input-control > label,
.input-dates-container label {
  display: block;
  font: inherit;
  color: #555353;
  margin-bottom: 6px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-icon {
  padding: 0.8rem;
  background: #f4f4f4
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  border-bottom: 1px solid #161616;
}

input.conversation_input[type="text"] {
  background-color: #f4f4f4;
  padding: 0 1rem 0 0.4rem;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #161616;
  width: -webkit-fill-available;
  height: 2rem;
  max-height: 2rem;
  position: relative;
  box-sizing: border-box;
}

.thumbs-container {
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.span-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.custom-checkbox-select,
.custom-input-date {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox-select:focus {
  outline: 0.125rem solid #0f62fe;
}

.custom-input-date:focus-within {
  outline: 0.125rem solid #0f62fe;
}

.selected-items,
.selected-date {
  width: -webkit-fill-available;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-bottom: 1px solid #161616;
  padding: 0 3rem 0 1rem;
  height: 2rem;
  max-height: 2rem;
  cursor: pointer;
  box-sizing: border-box;
}

.selected-date {
  padding: 0 1rem 0 1rem;
}

.input-dates-container {
  display: flex;
  justify-content: space-between;
}

.date {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.selected-items:hover {
  background: var(--hover__color);
  transition: 0.2s;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 1rem;
}

.dropdown {
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  border: 1px solid #0f62fe;
  border-top: none;
  background-color: #fff;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
}

.checkbox-label {
  display: block;
  padding: 8px;
  user-select: none;
  word-break: break-word;
}

.dropdown .checkbox-label:first-of-type {
  border-top: 1px solid #ccc;
}

.checkbox-label:hover {
  background-color: #f0f0f0;
}

.datepicker-toggle-button {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
}
input[type="date"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
