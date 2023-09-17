<template>
  <Navbar/>
  <div class="actions">
    <h3>Akcije</h3>
    <section>
      <div style="display:flex;width:100%">
        <div class="search-container">
          <input v-model="searchQuery" type="text" style="width:100%" placeholder="Filtriraj po imenu...">
          <button class="search-button" type="submit" :disabled="true">Pretraži</button>
        </div>
        <transition name="fade_main" mode="out-in">
          <button v-if="!selectedIntents.length" @click="newAction" class="background-button" tabindex="0" type="button">Nova akcija
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="New action" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="svg">
              <path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path>
            </svg>
          </button>
          <button v-else @click="deleteSelectedIntents" class="background-button" style="background:red">Izbriši sve
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="svg">
              <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
              <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
            </svg>
          </button>
        </transition>
      </div>
    </section>
    <table>
        <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" v-model="selectAll">
              </th>
              <th>Naziv</th>
              <th>Zadnje uređivanje</th>
              <th>Broj pitanja</th>
              <th>Broj pravila</th>
              <th>Status</th>
              <th>Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="intent in filteredIntents" :key="intent.id">
              <td>
                  <input type="checkbox" v-model="selectedIntents" :value="intent.id" number>
              </td>
              <td>
                <div>
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true" style="float: left;margin-right: .25rem;position:relative;top: .125rem;">
                    <path d="M25.7,9.3l-7-7C18.5,2.1,18.3,2,18,2H8C6.9,2,6,2.9,6,4v24c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V10C26,9.7,25.9,9.5,25.7,9.3	z M18,4.4l5.6,5.6H18V4.4z M24,28H8V4h8v6c0,1.1,0.9,2,2,2h6V28z"></path>
                    <path d="M10 22H22V24H10zM10 16H22V18H10z"></path>
                  </svg>
                  <a @click="navigateToDetail(intent)">{{intent.name}}</a>
                </div>
              </td>
              <td>{{intent.last_edited}}</td>
              <td>
                <span>{{intent.examples_count}}</span>
              </td>
              <td>
                <span>{{intent.steps_count}}</span>
              </td>
              <td>
                <span>
                  <button style="cursor: default;" type="button" aria-describedby="icon-tooltip-41">
                    <svg style="fill: #42be65;" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" class="CollectionsDataTable__status-icon-no-error">
                      <path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path>
                      <path d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z" data-icon-path="inner-path" opacity="0"></path>
                    </svg>
                  </button>
                </span>
              </td>
              <td>
                <div style="position:relative">
                  <button type="button" aria-haspopup="true" aria-expanded="false" aria-label="Options" @click="showOptionsFor(intent)">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Options" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--overflow-menu__icon">
                      <circle cx="16" cy="8" r="2"></circle>
                      <circle cx="16" cy="16" r="2"></circle>
                      <circle cx="16" cy="24" r="2"></circle>
                      <title>Options</title>
                    </svg>
                  </button>
                  <!-- Popup menu -->
                <div v-if="showOptionsForIntent === intent" class="options-popup">
                  <button @click="navigateToDetail(intent)">Uredi</button>
                  <hr/>
                  <button @click="deleteIntent(intent.id)">Izbriši</button>
                </div>
                </div>
              </td>
            </tr>
        </tbody>
    </table>
    <!-- Pagination Controls -->
    <div style="border: 1px solid #e0e0e0;display: flex;font-weight: 400;justify-content: space-between;letter-spacing: .16px;line-height: 1.28572;min-height: 2.5rem;align-items: center;">
      <div style="padding: 0 1rem;align-items: center;display: flex;height: 100%;">
        <div>
          <div class="items-per-page" style="display:flex;align-items: center;">
            <label for="itemsPerPage">Stavki po stranici:</label>
            <CustomSelect :options="[2,5,10,25,100]" :value="itemsPerPage" @update:value="itemsPerPage = $event"/>
          </div>
        </div>
        <span style="margin-left:1.235rem">Prikazivanje {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, intents.length) }} od {{ intents.length }} stavki</span>
      </div>
      <div style="align-items: center;display: flex;height: 100%;">
        <span style="margin-left: .0625rem;margin-right: 1rem;">{{currentPage}} od {{totalPages}} stranica</span>
        <div style="display: flex;">
          <button
            @click="currentPage > 1 ? currentPage-- : null"
            :disabled="currentPage === 1"
            style="border-left: 1px solid #e0e0e0;height: 2.5rem;margin: 0; min-height: 2rem;  transition: outline .11s cubic-bezier(.2,0,.38,.9),background-color .11s cubic-bezier(.2,0,.38,.9); width: 2.5rem;"
          >
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Previous page" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" style="margin-top:5px">
              <path d="M20 24L10 16 20 8z"></path>
            </svg>
          </button>
          <button
            @click="currentPage < totalPages ? currentPage++ : null"
            :disabled="currentPage === totalPages"
            style="border-left: 1px solid #e0e0e0;height: 2.5rem;margin: 0; min-height: 2rem;  transition: outline .11s cubic-bezier(.2,0,.38,.9),background-color .11s cubic-bezier(.2,0,.38,.9); width: 2.5rem;"
          >
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Next page" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" style="margin-top:5px">
              <path d="M12 8L22 16 12 24z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/AppNavbar.vue';
import { encodeId } from '../utils/window-scroll-position'
import CustomSelect from '../components/CustomSelect.vue'
import DataService from '../services/data.services'
export default {
  components: {Navbar, CustomSelect},
  data() {
    return {
      intents: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      selectedIntents: [],
      showOptionsForIntent: null,
    };
  },
  async created(){
    try {
      this.intents = await DataService.getIntents();
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    filteredIntents() {
      // Filter intents based on the search query
      const filtered = this.intents.filter((intent) =>
        intent.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // Calculate the start and end indexes for the current page
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Return a slice of the filtered intents for the current page
      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.intents.length / this.itemsPerPage);
    },
    selectAll: {
        get: function () {
            return this.intents ? this.selectedIntents.length == this.intents.length : false;
        },
        set: function (value) {
            var selectedIntents = [];

            if (value) {
                this.intents.forEach(function (intent) {
                    selectedIntents.push(intent.id.toString());
                });
            }

            this.selectedIntents = selectedIntents;
        }
    }
  },
  methods: {
    navigateToDetail(intent) {
      // Navigate to intentDetail component with the selected intent
      this.$router.push({ name: 'IntentRules', query: encodeId(intent.id) });
    },
    async newAction(){
      let id = JSON.parse(JSON.stringify(await DataService.addIntent())).intent_id
      console.log(id)
      await DataService.addRuleForIntent(id)
      this.$router.push({ name: 'IntentRules', query: encodeId(id) });
    },
    async deleteIntent(id) {
        try {
          await DataService.deleteIntent(id);
        } catch (error) {
          console.error(error);
        }
        try {
      this.intents = await DataService.getIntents();//POPRAVITI
      } catch (error) {
        console.error(error);
      }
    },
    showOptionsFor(intent) {
      // Toggle the popup menu for the clicked intent
      if (this.showOptionsForIntent === intent) {
        this.showOptionsForIntent = null; // Hide the popup menu if it's already shown
      } else {
        this.showOptionsForIntent = intent; // Show the popup menu for the clicked intent
      }
    },
    deleteSelectedIntents() {
      // Loop through selectedIntents and call deleteIntent for each
      for (const intent of this.selectedIntents) {
        this.deleteIntent(intent);
      }
      // Clear the selectedIntents array after deleting
      this.selectedIntents = [];
    },
  }
};
</script>
<style scoped>
.actions{
  padding: 1rem 2rem;
}
.actions section{
  background-color: #fff;
  display: flex;
  min-height: 3rem;
  position: relative;
  width: 100%;
}


.search-container{
  width:100%;
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.search-button{
    text-indent: -999px;
    overflow: hidden;
    width: 40px;
    padding: 0;
    margin: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
    cursor: pointer;
    opacity: 0.7;
}

table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

thead{
  background: var(--background);
}

tr, th{
  border-top: none;
  border-bottom: none !important;
}
th{
  vertical-align: bottom;
  text-align: left;
}

th,td{
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


table tbody tr th, table tbody tr td {
  vertical-align: middle;
  position: relative;
  transition: .3s all ease;
}

table tbody tr th::before, table tbody tr td::before {
  top: -1px;
}

table tbody tr th::before, table tbody tr th::after, table tbody tr td::before, table tbody tr td::after {
  transition: .3s all ease;
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

table input{
  height: 20px;
  width: 20px;
}

a{
  color: #0f62fe;
  display: inline-flex;
  font-size: .875rem;
  font-weight: 400;
  letter-spacing: .16px;
  line-height: 1.28572;
  outline: none;
  text-decoration: none;
  transition: color 70ms cubic-bezier(.2,0,.38,.9);
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.options-popup {
  background: #fff;
  border: 1px solid #c5c5c5;
  border-radius: 6px;
  box-shadow: 0 1px 14px rgba(0,0,0,.2);
  color: #616161;
  width: max-content;
  display: inline-grid;
  position: absolute;
  z-index: 1;
  margin-top: 4px;
  left: 0;
  margin-left: 25px;
}

hr{
  margin: unset;
}

.options-popup button{
    cursor: pointer;
    padding: 10px 30px 10px 30px;
}

.options-popup button:hover{
    background: var(--hover__color);
}
</style>