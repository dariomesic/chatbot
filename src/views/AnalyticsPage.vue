<template>
  <div class="filters-container">
    <div class="input-control" style="width: 15vw">
      <label>Odaberite vremenski raspon</label>
      <CustomSelect
        :options="['4 tjedna', '2 mjeseca', '4 mjeseca', '6 mjeseca', 'godina']"
        :value="selectedDateRange || '4 tjedna'"
        @update:value="selectedDateRange = $event"
        style="box-sizing: border-box"
      />
    </div>
  </div>
  <div style="flex-grow: 1;overflow: auto;position: relative;">
    <div class="graphs-container">
      <div class="graph-container">
        <div class="left-part">
          <span>Pristupi</span>
          <p>{{ uniqueSessionIdsNum }}</p>
        </div>
        <div id="session-graph" class="graph"></div>
      </div>
      <div class="graph-container">
        <div class="left-part">
          <span>Zahtjevi</span>
          <p>{{ uniqueRequestsNum }}</p>
        </div>
        <div id="requests-graph" class="graph"></div>
      </div>
      <div class="graph-container">
        <div class="left-part">
          <span>Neprepoznati zahtjevi</span>
          <p>{{ uniqueUnregisteredRequestsNum }}</p>
        </div>
        <div id="unregistered-requests-graph" class="graph"></div>
      </div>
    </div>
    <div class="tabs">
      <span
        :class="{ 'active-tab': activeTab === 'Prepoznavanje' }"
        @click="setActiveTab('Prepoznavanje')"
        >Prepoznavanje</span
      >
      <span
        :class="{ 'active-tab': activeTab === 'Elektronička pošta' }"
        @click="setActiveTab('Elektronička pošta')"
        >Elektronička pošta</span
      >
    </div>
    <div class="main-graph-container">
      <div v-show="activeTab === 'Prepoznavanje'">
          <h4 style="position:absolute;top:20px;left:20px;margin:unset">Koliko dobro virtualni asistent prepoznaje odgovore?</h4>
          <CustomSelect
            :placeholder="'Odaberite namjeru...'"
            :options="uniqueIntentsList"
            :value="selectedIntent"
            @update:value="selectedIntent = $event"
            style="
              position:absolute;
              top:20px;
              right: 20px;
              width: 20vw;
              border: 1px solid #161616;
            "
          />
        <div class="main-graph"></div>
      </div>
      <div v-show="activeTab === 'Elektronička pošta'">
        <div style="position: absolute; top: 20px; right: 20px">
          <button
            class="graph-type-button"
            :class="{ 'active-graph': activeGraph === 'Line' }"
            @click="activeGraph = 'Line'"
          >
            <svg
              height="16px"
              width="16px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
              :fill="activeGraph === 'Line' ? '#ffffff' : '#000000'"
            >
              <title>Line Graph</title>
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <polygon
                    class="st0"
                    points="55.924,451.681 55.924,20.681 55.924,4.393 0,4.393 0,20.681 0,451.681 0,491.314 0,507.607 16.289,507.607 55.924,507.607 486.922,507.607 503.211,507.607 503.211,451.681 486.922,451.681 "
                  ></polygon>
                  <path
                    class="st0"
                    d="M133.422,338.877l81.482-133.914c2.705,0.426,5.453,0.711,8.277,0.711c9.066,0,17.592-2.289,25.053-6.305 l84.476,71.426c-1.551,4.98-2.386,10.269-2.386,15.762c0,29.215,23.682,52.894,52.896,52.894c29.215,0,52.896-23.68,52.896-52.894 c0-12.387-4.289-23.754-11.42-32.766L512,105.838l-33.303-20.887l-86.953,149.457c-2.783-0.453-5.615-0.75-8.523-0.75 c-9.32,0-18.064,2.43-25.668,6.66l-84.104-71.121c1.688-5.172,2.631-10.684,2.631-16.422c0-29.215-23.686-52.898-52.898-52.898 c-29.215,0-52.896,23.684-52.896,52.898c0,12.054,4.078,23.133,10.867,32.027L99.838,318.435L133.422,338.877z"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
          <button
            class="graph-type-button"
            :class="{ 'active-graph': activeGraph === 'Bar' }"
            @click="activeGraph = 'Bar'"
          >
            <svg
              height="16px"
              width="16px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
              :fill="activeGraph === 'Bar' ? '#ffffff' : '#000000'"
            >
              <title>Bar Graph</title>
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path
                    class="st0"
                    d="M70.697,395.352h80.633c5.658,0,10.246-4.252,10.246-9.498v-143.72c0-5.246-4.588-9.499-10.246-9.499H70.697 c-5.658,0-10.246,4.253-10.246,9.499v143.72C60.451,391.1,65.039,395.352,70.697,395.352z"
                  ></path>
                  <path
                    class="st0"
                    d="M215.684,395.352h80.631c5.658,0,10.248-4.252,10.248-9.498V141.117c0-5.246-4.59-9.498-10.248-9.498h-80.631 c-5.66,0-10.248,4.252-10.248,9.498v244.736C205.436,391.1,210.024,395.352,215.684,395.352z"
                  ></path>
                  <path
                    class="st0"
                    d="M360.668,395.352h80.631c5.66,0,10.248-4.252,10.248-9.498V25.964c0-5.246-4.588-9.499-10.248-9.499h-80.631 c-5.66,0-10.248,4.253-10.248,9.499v359.89C350.42,391.1,355.008,395.352,360.668,395.352z"
                  ></path>
                  <polygon
                    class="st0"
                    points="495.426,438.633 16.574,438.633 0,438.633 0,495.535 16.574,495.535 495.426,495.535 512,495.535 512,438.633 "
                  ></polygon>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div class="the-graph"></div>
      </div>
    </div>
    <div class="frequencies-container">
      <div class="frequency">
        <span>Najčešće namjere</span>
        <div class="column-title">
          <p>Namjera</p>
          <p>Broj</p>
        </div>
        <div class="intent-row" v-for="intent in topFive" :key="intent">
          <p class="intent-name">{{ intent.name }}</p>
          <p class="intent-occurances">{{ intent.occurrences }}</p>
        </div>
      </div>
      <div class="frequency">
        <span>Najrjeđe namjere</span>
        <div class="column-title">
          <p>Namjera</p>
          <p>Broj</p>
        </div>
        <div class="intent-row" v-for="intent in bottomFive" :key="intent">
          <p class="intent-name">{{ intent.name }}</p>
          <p class="intent-occurances">{{ intent.occurrences }}</p>
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
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
export default {
  components: {
    CustomSelect,
  },
  data() {
    return {
      conversations: [],
      uniqueIntentsList: [],
      activeTab: "Prepoznavanje",
      activeGraph: "Line",
      selectedDateRange: "",
      selectedIntent: "",
      uniqueSessionIdsNum: 0,
      uniqueRequestsNum: 0,
      uniqueUnregisteredRequestsNum: 0,
      topFive: [],
      bottomFive: [],
    };
  },
  async mounted() {
    await this.getConversations();
    this.selectedDateRange = "4 tjedna";
  },
  watch: {
    selectedDateRange(newVal) {
      this.triggerDateStoring(undefined, undefined, newVal);
    },
    selectedIntent(newVal, oldVal) {
      this.triggerDateStoring(newVal, oldVal);
      this.toggleSvg(newVal, oldVal);
    },
    activeGraph(newVal) {
      this.triggerDateStoring(undefined, undefined, undefined, newVal);
    },
  },
  methods: {
    triggerDateStoring(
      selectedIntent,
      previousSelectedIntent,
      selectedDate,
      selectedGraphType
    ) {
      const today = new Date();
      let dateRange;
      // const todayFormatted = today.toISOString().split("T")[0];
      if (this.selectedDateRange === "4 tjedna") {
        const fourWeeksAgo = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 28
        );
        // const formattedfourWeeksAgo = `${fourWeeksAgo.getFullYear()}-${
        //   fourWeeksAgo.getMonth() + 1
        // }-${fourWeeksAgo.getDate()}`;
        dateRange = fourWeeksAgo;
      } else if (this.selectedDateRange === "2 mjeseca") {
        const twoMonthsAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 2,
          today.getDate()
        );
        // const formattedTwoMonthsAgo = `${twoMonthsAgo.getFullYear()}-${
        //   twoMonthsAgo.getMonth() + 1
        // }-${twoMonthsAgo.getDate()}`;
        dateRange = twoMonthsAgo;
      } else if (this.selectedDateRange === "4 mjeseca") {
        const fourMonthsAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 4,
          today.getDate()
        );
        // const formattedFourMonthsAgo = `${fourMonthsAgo.getFullYear()}-${
        //   fourMonthsAgo.getMonth() + 1
        // }-${fourMonthsAgo.getDate()}`;
        dateRange = fourMonthsAgo;
      } else if (this.selectedDateRange === "6 mjeseca") {
        const sixMonthsAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
        // const formattedSixMonthsAgo = `${sixMonthsAgo.getFullYear()}-${
        //   sixMonthsAgo.getMonth() + 1
        // }-${sixMonthsAgo.getDate()}`;
        dateRange = sixMonthsAgo;
      } else if (this.selectedDateRange === "godina") {
        const yearAgo = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        // const formattedYearAgo = `${yearAgo.getFullYear()}-${
        //   yearAgo.getMonth() + 1
        // }-${yearAgo.getDate()}`;
        dateRange = yearAgo;
      }
      if (selectedIntent && previousSelectedIntent) {
        if (selectedIntent !== previousSelectedIntent) {
          this.showData(
            new Date(dateRange),
            today,
            selectedIntent,
            selectedDate
          );
        }
      } else if (
        this.selectedIntent !== "" &&
        selectedGraphType === undefined
      ) {
        this.showData(
          new Date(dateRange),
          today,
          this.selectedIntent,
          selectedDate
        );
      } else {
        this.showData(new Date(dateRange), today, undefined, selectedDate);
      }
    },
    displayGraph(type, filteredConversations, startDate) {
      if (type === "Line") {
        this.activeGraph = "Line";
      } else {
        this.activeGraph = "Bar";
      }

      const today = new Date();

      const dates = [];

      for (
        let date = startDate;
        date <= today;
        date.setDate(date.getDate() + 1)
      ) {
        dates.push(
          new Date(Math.min(date, today)).toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        );
        if (date > today) {
          break;
        }
      }

      if (
        !dates.includes(
          today.toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        )
      ) {
        dates.push(
          new Date(today).toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        );
      }
      const monthMap = {
        "sij": "01", "velj": "02", "ožu": "03", "tra": "04",
        "svi": "05", "lip": "06", "srp": "07", "kol": "08",
        "ruj": "09", "lis": "10", "stu": "11", "pro": "12"
      };
      const occurrences = [];

      dates.forEach((day) => {
        const [dayMonth1, monthAbbrev1] = day.split('. ');
        const wantedDay = filteredConversations
          .filter((conversation) => {
            const [, month2, dayMonth2] = conversation.time.split(/-| /);
            const numericMonth1 = monthMap[monthAbbrev1.toLowerCase()];
            return (dayMonth1 === dayMonth2 && numericMonth1 === month2)
          })
          .filter((conversation) => {
            return conversation.text.startsWith("KORISNIK ŠALJE MAIL:");
          });

        occurrences.push(wantedDay.length);
      });

      const displayGraphData = dates.map((date, index) => ({
        x: date,
        y: occurrences[index],
      }));

      new Chart(".the-graph", {
        data: {
          labels: displayGraphData.map((data) => data.x),
          datasets: [
            {
              values: displayGraphData.map((data) => data.y),
            },
          ],
        },
        type: type.toLowerCase(),
        height: 250,
        colors: ["#0f62fe"],
        axisOptions: {
          xIsSeries: 1,
        },
        lineOptions: {
          hideDots: 0,
          spline: 0,
        },
      });
    },
    drawSlopeChart(
      dateRangesFormatted,
      uniqueSessionIdsSum,
      graphWidth,
      selectedGraph,
      dataset_name
    ) {
      const slopeChartData = dateRangesFormatted.map((item, index) => ({
        x: item,
        y: uniqueSessionIdsSum[index],
      }));

      new Chart(selectedGraph, {
        data: {
          labels: slopeChartData.map((data) => data.x),
          datasets: [
            {
              name: dataset_name,
              values: slopeChartData.map((data) => data.y),
            },
          ],
        },
        type: "line",
        height: 170,
        colors: ["#0f62fe"],
        axisOptions: {
          xAxisMode: "span",
          xIsSeries: true,
          yAxisMode: "tick",
        },
      });

      const selector = selectedGraph + " .chart-container";
      const graph = document.querySelector(selector);
      graph.style.width = graphWidth;
    },
    slopeChart(filteredConversations, startDate, selectedDate) {
      if (selectedDate) {
        const dateRanges = [];
        const today = new Date();
        const totalDays = Math.ceil(
          (today - startDate) / (1000 * 60 * 60 * 24) - 1
        );
        let cut;
        let graphWidth;

        const graphContainerElements =
          document.querySelectorAll(".graph-container");
        const graphElements = document.querySelectorAll(".graph");

        const newStyles = () => {
          graphContainerElements.forEach((element) => {
            element.style.flexWrap = "unset";
            element.style.flexDirection = "column";
          });
          graphElements.forEach((element) => {
            element.style.justifyContent = "unset";
          });
        };
        const originalStyles = () => {
          graphContainerElements.forEach((element) => {
            element.style.flexWrap = "wrap";
            element.style.flexDirection = "unset";
          });
          graphElements.forEach((element) => {
            element.style.justifyContent = "center";
          });
        };

        if (this.selectedDateRange === "4 tjedna") {
          cut = 5;
          graphWidth = "15vw";
          originalStyles();
        } else if (this.selectedDateRange === "2 mjeseca") {
          cut = 10;
          graphWidth = "15vw";
          originalStyles();
        } else if (this.selectedDateRange === "4 mjeseca") {
          cut = 20;
          newStyles();
          graphWidth = "25vw";
        } else if (this.selectedDateRange === "6 mjeseca") {
          cut = 30;
          newStyles();
          graphWidth = "25vw";
        } else {
          cut = 30;
          newStyles();
          graphWidth = "25vw";
        }

        let dateRangeSection = Math.ceil(totalDays / cut);

        for (let i = 0; i < cut; i++) {
          let sectionStart = new Date(
            startDate.getTime() + i * dateRangeSection * (1000 * 60 * 60 * 24)
          );
          let sectionEnd = new Date(
            startDate.getTime() +
              (i + 1) * dateRangeSection * (1000 * 60 * 60 * 24) -
              1
          );
          if (sectionEnd > today) {
            sectionEnd = today;
            dateRanges.push({ start: sectionStart, end: sectionEnd });

            break;
          }
          if (sectionStart > today) {
            sectionStart = today;
          }

          dateRanges.push({ start: sectionStart, end: sectionEnd });
        }

        const dateRangesFormatted = [];
        const uniqueSessionIdsSum = [];
        const uniqueRequestsSum = [];
        const uniqueUnregisteredRequestsSum = [];

        dateRanges.forEach((range) => {
          const uniqueSessionIds = new Set();
          const conversationForRange = filteredConversations.filter(
            (conversation) => {
              const conversationDate = new Date(conversation.time);
              return (
                conversationDate <= range.end && conversationDate >= range.start
              );
            }
          );
          conversationForRange.filter((conversation) => {
            if (!uniqueSessionIds.has(conversation.session_id)) {
              uniqueSessionIds.add(conversation.session_id);
              return true;
            } else {
              return false;
            }
          });
          dateRangesFormatted.push(
            `${range.start
              .toLocaleDateString("hr-HR", {
                day: "numeric",
                month: "short",
              })
              .trim()}-${range.end
              .toLocaleDateString("hr-HR", {
                day: "numeric",
                month: "short",
              })
              .trim()}`
          );
          uniqueSessionIdsSum.push(uniqueSessionIds.size);

          const uniqueRequests = conversationForRange.filter((conversation) => {
            return conversation.threshold !== "";
          });
          uniqueRequestsSum.push(uniqueRequests.length);

          const uniqueUnregisteredRequests = conversationForRange.filter(
            (conversation) => {
              return conversation.intent_name === "nedefinirano";
            }
          );
          uniqueUnregisteredRequestsSum.push(uniqueUnregisteredRequests.length);
        });
        this.drawSlopeChart(
          dateRangesFormatted,
          uniqueSessionIdsSum,
          graphWidth,
          "#session-graph",
          "Pristupi"
        );
        this.drawSlopeChart(
          dateRangesFormatted,
          uniqueRequestsSum,
          graphWidth,
          "#requests-graph",
          "Zahtjevi"
        );
        this.drawSlopeChart(
          dateRangesFormatted,
          uniqueUnregisteredRequestsSum,
          graphWidth,
          "#unregistered-requests-graph",
          "Neprepoznati zahtjevi"
        );
      }
    },
    distributionChart(uniqueRequests, startDate) {
      const sortedByThreshold = uniqueRequests
        .map((conversation) => ({
          ...conversation,
          threshold: Math.floor(conversation.threshold * 100),
        }))
        .sort((a, b) => a.threshold - b.threshold);

      let totalCount = 0;
      const countArray = [];
      for (let i = 0; i < sortedByThreshold.length; i++) {
        if (
          sortedByThreshold[i].threshold !==
            sortedByThreshold[i + 1]?.threshold ||
          sortedByThreshold[i + 1] === undefined
        ) {
          totalCount++;
          countArray.push(totalCount);
        } else {
          totalCount++;
        }
      }

      const today = new Date();

      const dates = [];

      for (
        let date = startDate;
        date <= today;
        date.setDate(date.getDate() + 7)
      ) {
        dates.push(
          new Date(Math.min(date, today)).toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        );
        if (date > today) {
          break;
        }
      }
      if (
        !dates.includes(
          today.toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        )
      ) {
        dates.push(
          new Date(today).toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "short",
          })
        );
      }

      const distributionChartData = dates.map((date, index) => ({
        x: date,
        y: sortedByThreshold[index]?.threshold,
      }));

      const filteredData = distributionChartData.filter(
        (data) => data.y !== undefined
      );

      if (filteredData.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.style.margin = "1rem";
        errorDiv.style.fontWeight = "bold";
        errorDiv.innerHTML = `Ne postoji prag za "${this.selectedIntent}" namjeru u zadanom vremenskom pragu.`;
        document.querySelector(".main-graph").innerHTML = errorDiv.outerHTML;
      } else {
        const allValuesSame = filteredData.every((data) => data.y === 100);

        if (allValuesSame) {
          filteredData.forEach((data) => (data.y = 99.99));
        }

        const hideDots = filteredData.length === 1 ? 0 : 1;

        new Chart(".main-graph", {
          data: {
            labels: filteredData.map((data) => data.x),
            datasets: [
              {
                values: filteredData.map((data) => data.y),
              },
            ],
          },
          type: "line",
          height: 250,
          colors: ["#0f62fe"],
          axisOptions: {
            xIsSeries: 1,
          },
          lineOptions: {
            hideDots: hideDots,
            spline: 1,
          },
        });
      }
    },
    showData(dateRange, today, selectedIntent, selectedDate) {
      const uniqueSessionIds = new Set();
      const filteredConversations = this.conversations.filter(
        (conversation) => {
          const conversationDate = new Date(conversation.time);
          return conversationDate <= today && conversationDate >= dateRange;
        }
      );

      filteredConversations.filter((conversation) => {
        if (!uniqueSessionIds.has(conversation.session_id)) {
          uniqueSessionIds.add(conversation.session_id);
          return true;
        } else {
          return false;
        }
      });
      this.uniqueSessionIdsNum = uniqueSessionIds.size;

      const uniqueRequests = filteredConversations.filter((conversation) => {
        return conversation.threshold !== "";
      });
      this.uniqueRequestsNum = uniqueRequests.length;

      const uniqueUnregisteredRequests = filteredConversations.filter(
        (conversation) => {
          return conversation.intent_name === "nedefinirano";
        }
      );

      this.uniqueUnregisteredRequestsNum = uniqueUnregisteredRequests.length;

      const intentOccurrences = {};

      filteredConversations.forEach((conversation) => {
        const intent = conversation.intent_name;
        if (conversation.threshold !== "") {
          intentOccurrences[intent] = (intentOccurrences[intent] || 0) + 1;
        }
      });

      const intentsArray = Object.keys(intentOccurrences).map((intent) => ({
        name: intent,
        occurrences: intentOccurrences[intent],
      }));

      this.topFive = intentsArray
        .sort((a, b) => b.occurrences - a.occurrences)
        .slice(0, 5);
      this.bottomFive = intentsArray
        .sort((a, b) => a.occurrences - b.occurrences)
        .slice(0, 5);

      let flag = 0;

      if (selectedIntent === undefined || selectedDate) {
        this.slopeChart(filteredConversations, dateRange, selectedDate);
        this.displayGraph(
          this.activeGraph,
          filteredConversations,
          new Date(dateRange)
        );
        flag++;
      }

      if (selectedIntent !== undefined) {
        const selectedIntentUniqueRequests = filteredConversations
          .filter((conversation) => {
            return conversation.threshold !== "";
          })
          .filter((conversation) => {
            return conversation.intent_name === selectedIntent;
          });
        this.distributionChart(selectedIntentUniqueRequests, dateRange);
      } else {
        this.distributionChart(uniqueRequests, new Date(dateRange));
        if (flag !== 1) {
          this.displayGraph(
            this.activeGraph,
            filteredConversations,
            new Date(dateRange)
          );
        }
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
            if (!this.uniqueIntentsList.includes(conversation.intent_name)) {
              this.uniqueIntentsList.push(conversation.intent_name);
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    toggleSvg(newVal, oldVal) {
      if (newVal !== "" && oldVal === "") {
        const targetArrowSvg = document.querySelector(
          ".main-graph-container .selected-option .arrow-icon"
        );
        const exitSvg = `<svg
      style="fill: #161616"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>`;
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = exitSvg;
        const exitSvgElement = tempContainer.firstChild;
        targetArrowSvg.replaceWith(exitSvgElement);
        exitSvgElement.addEventListener("click", this.removeSelectedIntent, {
          once: true,
        });
        exitSvgElement.classList.add("exit-svg");
      } else if (this.selectedIntent === "") {
        const targetExitSvg = document.querySelector(
          ".main-graph-container .selected-option .exit-svg"
        );
        const arrowSvg = `<svg class="arrow-icon" viewBox="0 0 16 16">
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          <title>Open menu</title>
        </svg>`;
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = arrowSvg;
        const arrowSvgElement = tempContainer.firstChild;
        targetExitSvg.replaceWith(arrowSvgElement);
      } else {
        return;
      }
    },
    removeSelectedIntent() {
      this.selectedIntent = "";
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.analytics-main-block {
  padding: 4rem 2rem;
}
.filters-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 3rem 0.7rem 0 0.7rem;
}

.input-control {
  margin-right: 1rem;
}
.input-control > label {
  display: block;
  font: inherit;
  color: #555353;
  margin-bottom: 6px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-input-date {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.custom-input-date:focus-within {
  outline: 0.125rem solid #0f62fe;
}

.selected-date {
  width: -webkit-fill-available;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-bottom: 1px solid #161616;
  padding: 0 1rem 0 1rem;
  height: 2rem;
  max-height: 2rem;
  cursor: pointer;
  box-sizing: border-box;
}
.date {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
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

.graphs-container {
  display: flex;
  flex-wrap: wrap;
  margin: 3rem 0.7rem 2rem 0.7rem;
}

.graph-container {
  display: flex;
  flex-wrap: wrap;
  background: var(--background);
  width: 22vw;
  padding: 1rem;
  margin-bottom: 1rem;
}

.graph-container:not(:last-child) {
  margin-right: 1rem;
}

.left-part {
  flex-basis: 20%;
  text-align: center;
}

.left-part span {
  display: inline-block;
  height: 2rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.left-part p {
  text-align: center;
  font-size: 2rem;
}

.graph-container .graph {
  flex-basis: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs {
  display: flex;
  margin: 0 0.7rem;
}

.tabs span {
  cursor: pointer;
  padding: 0.5rem 3rem 0.8rem 3rem;
  background: var(--background);
  border-top: 3px solid transparent;
}

.tabs .active-tab {
  text-decoration: underline;
  font-weight: bold;
  filter: brightness(85%);
  border-top: 3px solid #0f62fe;
}

.main-graph-container {
  background: var(--background);
  width: 72vw;
  margin: 0 0.7rem 2rem 0.7rem;
  position: relative;
}

.main-graph,
.the-graph {
  padding-top: 3rem;
}

.graph-type-button {
  padding: 0.1rem 0.2rem;
  border: 1px solid gray;
  background: var(--background);
}

.active-graph {
  background: #3c3b3b;
}

.frequencies-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 0.7rem 2rem 0.7rem;
}

.frequency {
  background: var(--background);
  width: 20vw;
  margin-right: 1rem;
  padding: 1rem;
}

.frequency span {
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 1rem;
}

.column-title,
.intent-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0.9rem;
}

.intent-row {
  margin: 0.6rem 0;
  position: relative;
}

.intent-name {
  color: #0f62fe;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* x axis */
.frappe-chart .x.axis .line-vertical,
.frappe-chart .x.axis text {
  display: none;
}

/* y axis */
.frappe-chart .y.axis .line-horizontal,
.frappe-chart .y.axis text {
  display: none;
}
</style>
