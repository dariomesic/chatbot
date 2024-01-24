<template>
  <div class="main-block">
    <Navbar style="position: sticky; top: 0; z-index: 2" />
    <div class="content-container">
      <div class="left-part">
        <ul>
          <li
            :class="{ active: activeTab === 'Namjere' }"
            @click="setActiveTab('Namjere')"
          >
            Namjere
          </li>
          <li
            :class="{ active: activeTab === 'Razgovori' }"
            @click="setActiveTab('Razgovori')"
          >
            Razgovori
          </li>
          <li
            :class="{ active: activeTab === 'Postavke' }"
            @click="setActiveTab('Postavke')"
          >
            Postavke
          </li>
          <li
            :class="{ active: activeTab === 'Analitika' }"
            @click="setActiveTab('Analitika')"
          >
            Analitika
          </li>
        </ul>
      </div>
      <div class="right-part">
        <span
          @click="$router.push('/')"
          style="
            position: absolute;
            left: 0.7rem;
            top: 1rem;
            display: flex;
            cursor: pointer;
            z-index: 1;
          "
          ><svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#0f62fe"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#0f62fe"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </g>
          </svg>
          <a>Virtualni asistenti za Ministarstvo pravosuđa i uprave</a>
        </span>
        <h3>{{ system_name }}</h3>
        <IntentList v-if="activeTab === 'Namjere'" />
        <ConversationsHistory v-if="activeTab === 'Razgovori'" />
        <SettingsPage v-if="activeTab === 'Postavke'" />
        <DocumentsBase v-if="activeTab === 'Baza znanja'" />
        <AnalyticsPage v-if="activeTab === 'Analitika'" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/AppNavbar.vue";
import IntentList from "./IntentList.vue";
import ConversationsHistory from "./ConversationsHistory.vue";
import SettingsPage from "./SettingsPage.vue";
import DataService from "../services/data.services";
import AnalyticsPage from "./AnalyticsPage.vue";
export default {
  components: {
    Navbar,
    IntentList,
    ConversationsHistory,
    SettingsPage,
    AnalyticsPage,
  },
  data() {
    return {
      activeTab: "Namjere",
      system_name: "",
    };
  },
  async mounted() {
    if (this.$route.query.system_id !== undefined) {
      this.system_name = await DataService.getNameForSystem(
        this.$route.query.system_id
      );
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.main-block {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.left-part {
  background: var(--background);
  flex-basis: 15%;
  position: sticky;
  top: 60px;
  max-height: calc(100vh - 60px);
}

li {
  cursor: pointer;
  background: var(--background);
  padding: 0.625rem 1.25rem;
  border-left: 5px solid transparent;
}
.active {
  text-decoration: underline;
  font-weight: bold;
  filter: brightness(85%);
  border-left: 5px solid #0f62fe;
}

.right-part {
  position: relative;
  flex-basis: 85%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
}

h3 {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--main__color);
  font-size: 18px;
  font-weight: 700;
  margin-top: 0px;
  font-style: italic;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  z-index: 1;
}
</style>
