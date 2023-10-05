<template>
  <Navbar/>
  <div class="actions">
    <h3>Virtualni asistenti za Ministarstvo pravosuđa i uprave</h3>
    <table>
        <thead>
            <tr>
              <th>Naziv</th>
              <th>Broj namjera</th>
              <th>Status</th>
            </tr>
        </thead>
        <tr v-for="chatbot in chatbots" :key="chatbot.id">
            <td>
                <div>
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true" style="float: left;margin-right: .25rem;position:relative;top: .125rem;">
                    <path d="M25.7,9.3l-7-7C18.5,2.1,18.3,2,18,2H8C6.9,2,6,2.9,6,4v24c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V10C26,9.7,25.9,9.5,25.7,9.3	z M18,4.4l5.6,5.6H18V4.4z M24,28H8V4h8v6c0,1.1,0.9,2,2,2h6V28z"></path>
                    <path d="M10 22H22V24H10zM10 16H22V18H10z"></path>
                </svg>
                <a @click="$router.push('/intents')">{{chatbot.name}}</a>
                </div>
            </td>
            <td>
                <span>{{chatbot.count}}</span>
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
        </tr>
    </table>
  </div>
</template>

<script>
import Navbar from '../components/AppNavbar.vue';
import DataService from '../services/data.services'
export default {
  components: {Navbar},
  data() {
    return {
      chatbots: [{name: 'E-predmet', count: 0}],

    };
  },
  created(){
    this.getIntentCount()
  },
  methods: {
    async getIntentCount() {
      try {
        this.chatbots[0].count = JSON.parse(JSON.stringify(await DataService.getIntents())).length;
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>
<style scoped>
.actions{
  padding: 1rem 2rem;
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