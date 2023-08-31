<template>
  <Navbar/>
  <div class="actions">
    <h3>Actions</h3>
    <section>
      <div style="display:flex;width:100%">
        <div class="search-container">
          <input v-model="searchQuery" type="text" style="width:100%" placeholder="Filter by name...">
          <button class="search-button" type="submit" @click="onEnterScada()">Search</button>
        </div>
        <button class="background-button" @click="showAddQuestionDialog = true" tabindex="0" type="button">New action
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
            <tr v-for="question in filteredQuestions" :key="question.id" @click="navigateToDetail(question.id)">
                <th scope="row">
                  <label class="control control--checkbox">
                    <input type="checkbox">
                    <div class="control__indicator"></div>
                  </label>
                </th>
                <td>{{ question.question }}</td>
                <td>{{ question.lastEdited }}</td>
                <td>{{ question.examplesCount }}</td>
                <td>{{ question.stepsCount }}</td>
                <td>{{ question.status }}</td>
                <td>
                    <button @click="deleteQuestion(question.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <transition name="fade">
      <div v-if="showAddQuestionDialog" class="add-question-dialog">
        <h2>Add Question</h2>
        <!-- Form to add a new question -->
        <!-- ... Add form fields ... -->
        <button @click="addQuestion">Add</button>
        <button @click="showAddQuestionDialog = false">Cancel</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Navbar from '../components/AppNavbar.vue';
import { encodeId } from '../utils/window-scroll-position'
export default {
  components: {Navbar},
  data() {
    return {
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          lastEdited: "2023-08-01",
          examplesCount: 10,
          stepsCount: 5,
          status: "Active",
        },
        {
          id: 2,
          question: "How does photosynthesis work?",
          lastEdited: "2023-08-10",
          examplesCount: 8,
          stepsCount: 6,
          status: "Active",
        },
        {
          id: 3,
          question: "What are the main features of JavaScript ES6?",
          lastEdited: "2023-08-15",
          examplesCount: 12,
          stepsCount: 7,
          status: "Active",
        },
        {
          id: 4,
          question: "Explain the concept of object-oriented programming.",
          lastEdited: "2023-08-05",
          examplesCount: 6,
          stepsCount: 4,
          status: "Inactive",
        },
        {
          id: 5,
          question: "How can you optimize website performance using caching?",
          lastEdited: "2023-08-20",
          examplesCount: 9,
          stepsCount: 5,
          status: "Active",
        },
        {
          id: 6,
          question: "Describe the differences between REST and GraphQL APIs.",
          lastEdited: "2023-08-18",
          examplesCount: 7,
          stepsCount: 5,
          status: "Active",
        },
        {
          id: 7,
          question: "What is the significance of the Turing Test in AI?",
          lastEdited: "2023-08-12",
          examplesCount: 5,
          stepsCount: 3,
          status: "Active",
        },
        {
          id: 8,
          question: "How can you secure a web application against common vulnerabilities?",
          lastEdited: "2023-08-22",
          examplesCount: 11,
          stepsCount: 6,
          status: "Active",
        },
        {
          id: 9,
          question: "Explain the concept of a linked list in data structures.",
          lastEdited: "2023-08-08",
          examplesCount: 7,
          stepsCount: 4,
          status: "Inactive",
        },
        {
          id: 10,
          question: "What are the benefits of using version control systems like Git?",
          lastEdited: "2023-08-25",
          examplesCount: 8,
          stepsCount: 5,
          status: "Active",
        },
      ],
      searchQuery: '',
      showAddQuestionDialog: false,
    };
  },
  computed: {
    filteredQuestions() {
      // Filter questions based on the search query
      return this.questions.filter(question =>
        question.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    navigateToDetail(questionId) {
      // Navigate to QuestionDetail component with the selected question
      this.$router.push({ name: 'IntentRules', query: encodeId(questionId) });
    },
    deleteQuestion(id) {
        id
      // Implement question deletion logic
    },
    addQuestion() {
      // Implement adding a new question logic
      // Clear form fields and hide the dialog
      this.showAddQuestionDialog = false;
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
</style>