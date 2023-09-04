<template>
  <Navbar/>
  <div class="actions">
    <h3>Actions</h3>
    <section>
      <div style="display:flex;width:100%">
        <div class="search-container">
          <input v-model="searchQuery" type="text" style="width:100%" placeholder="Filter by name...">
          <button class="search-button" type="submit" :disabled="true">Search</button>
        </div>
        <button class="background-button" tabindex="0" type="button">New action
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="New action" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="svg">
            <path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path>
          </svg>
        </button>
      </div>
    </section>
    <table>
        <thead>
            <tr>
              <th scope="col">
                <label>
                  <input type="checkbox" class="js-check-all">
                  <div class="control__indicator"></div>
              </label>
              </th>
              <th>Name</th>
              <th>Last Edited</th>
              <th>Examples Count</th>
              <th>Steps Count</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="question in filteredQuestions" :key="question.id">
              <td>
                <label class="control control--checkbox">
                  <input type="checkbox">
                  <div class="control__indicator"></div>
                </label>
              </td>
              <td>
                <div>
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true" style="float: left;margin-right: .25rem;position:relative;top: .125rem;">
                    <path d="M25.7,9.3l-7-7C18.5,2.1,18.3,2,18,2H8C6.9,2,6,2.9,6,4v24c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V10C26,9.7,25.9,9.5,25.7,9.3	z M18,4.4l5.6,5.6H18V4.4z M24,28H8V4h8v6c0,1.1,0.9,2,2,2h6V28z"></path>
                    <path d="M10 22H22V24H10zM10 16H22V18H10z"></path>
                  </svg>
                  <a @click="navigateToDetail(question.id)">{{question.question}}</a>
                </div>
              </td>
              <td>{{question.lastEdited}}</td>
              <td>
                <span>{{question.examplesCount}}</span>
              </td>
              <td>
                <span>{{question.stepsCount}}</span>
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
                <div data-floating-menu-container="true">
                  <button type="button" aria-haspopup="true" aria-expanded="false" aria-label="Options" id="CollectionsDataTable__overflow-0">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Options" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--overflow-menu__icon">
                      <circle cx="16" cy="8" r="2"></circle>
                      <circle cx="16" cy="16" r="2"></circle>
                      <circle cx="16" cy="24" r="2"></circle>
                      <title>Options</title>
                    </svg>
                  </button>
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
            <label for="itemsPerPage">Items per page:</label>
            <CustomSelect :options="[2,5,10,25,100]" :value="itemsPerPage" @update:value="itemsPerPage = $event"/>
          </div>
        </div>
        <span style="margin-left:1.235rem">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, questions.length) }} of {{ questions.length }} items</span>
      </div>
      <div style="align-items: center;display: flex;height: 100%;">
        <span style="margin-left: .0625rem;margin-right: 1rem;">{{currentPage}} of {{totalPages}} pages</span>
        <div style="display: flex;">
          <button
            @click="currentPage > 1 ? currentPage-- : null"
            :disabled="currentPage === 1"
            style="border-left: 1px solid #e0e0e0;height: 2.5rem;margin: 0; min-height: 2rem;  transition: outline .11s cubic-bezier(.2,0,.38,.9),background-color .11s cubic-bezier(.2,0,.38,.9); width: 2.5rem;"
          >
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Previous page" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
              <path d="M20 24L10 16 20 8z"></path>
            </svg>
          </button>
          <button
            @click="currentPage < totalPages ? currentPage++ : null"
            :disabled="currentPage === totalPages"
            style="border-left: 1px solid #e0e0e0;height: 2.5rem;margin: 0; min-height: 2rem;  transition: outline .11s cubic-bezier(.2,0,.38,.9),background-color .11s cubic-bezier(.2,0,.38,.9); width: 2.5rem;"
          >
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Next page" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
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
export default {
  components: {Navbar, CustomSelect},
  data() {
    return {
      questions: [
        {
          id: 1,
          question: "Pitanja vezana uz promjenu korisnika domene",
          lastEdited: "2023-08-01",
          examplesCount: 10,
          stepsCount: 5,
        },
        {
          id: 2,
          question: "Pitanja vezana uz registraciju domena",
          lastEdited: "2023-08-10",
          examplesCount: 8,
          stepsCount: 6,
        },
        {
          id: 3,
          question: "Kako da promijenim NS zapise?",
          lastEdited: "2023-08-15",
          examplesCount: 12,
          stepsCount: 7,
        },
        {
          id: 4,
          question: "Example",
          lastEdited: "2023-08-05",
          examplesCount: 6,
          stepsCount: 4,
        },
        {
          id: 5,
          question: "How can you optimize website performance using caching?",
          lastEdited: "2023-08-20",
          examplesCount: 9,
          stepsCount: 5,
        },
      ],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredQuestions() {
      // Filter questions based on the search query
      const filtered = this.questions.filter((question) =>
        question.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // Calculate the start and end indexes for the current page
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Return a slice of the filtered questions for the current page
      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.questions.length / this.itemsPerPage);
    },
  },
  methods: {
    navigateToDetail(questionId) {
      // Navigate to QuestionDetail component with the selected question
      this.$router.push({ name: 'IntentRules', query: encodeId(questionId) });
    },
    /*deleteQuestion(id) {
        id
      // Implement question deletion logic
    }*/
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
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table label{
  display: block;
  position: relative;
  margin-bottom: 25px;
  cursor: pointer;
  font-size: 18px;
}

table input{
  position: absolute;
  z-index: -1;
  opacity: 0;
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
</style>