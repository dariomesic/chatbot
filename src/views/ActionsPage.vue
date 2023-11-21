<template>
  <div class="main-block">
    <Navbar style="position: sticky;top: 0;z-index: 2;"/>
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
        </ul>
      </div>
      <div class="right-part">
        <template v-if="activeTab === 'Namjere'">
          <IntentList @getIntents="getIntents" />
        </template>
        <template v-else-if="activeTab === 'Razgovori'">
          <ConversationsHistory :intents="intents" />
        </template>
        <div class="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/AppNavbar.vue";
import IntentList from "./IntentList.vue";
import ConversationsHistory from "./ConversationsHistory.vue";
export default {
  components: {
    Navbar,
    IntentList,
    ConversationsHistory,
  },
  data() {
    return {
      activeTab: "Namjere",
      intents: [],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    getIntents(int) {
      this.intents = int;
    },
  },
};
</script>

<style scoped>
.main-block {
  display: flex;
  flex-direction: column;
}

.content-container {
  display: flex;
  flex-direction: row;
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
  overflow-y: scroll;
  flex-basis: 85%;
}
.footer {
  background: var(--background);
  height: 10vh;
}
</style>
