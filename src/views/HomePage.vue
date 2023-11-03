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
                  <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width="16" height="16" style="float: left;margin-right: .25rem;position:relative;top: .1rem;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_bot_24_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_bot_24_regular" fill="#212121" fill-rule="nonzero"> <path d="M17.7530511,13.999921 C18.9956918,13.999921 20.0030511,15.0072804 20.0030511,16.249921 L20.0030511,17.1550008 C20.0030511,18.2486786 19.5255957,19.2878579 18.6957793,20.0002733 C17.1303315,21.344244 14.8899962,22.0010712 12,22.0010712 C9.11050247,22.0010712 6.87168436,21.3444691 5.30881727,20.0007885 C4.48019625,19.2883988 4.00354153,18.2500002 4.00354153,17.1572408 L4.00354153,16.249921 C4.00354153,15.0072804 5.01090084,13.999921 6.25354153,13.999921 L17.7530511,13.999921 Z M17.7530511,15.499921 L6.25354153,15.499921 C5.83932796,15.499921 5.50354153,15.8357075 5.50354153,16.249921 L5.50354153,17.1572408 C5.50354153,17.8128951 5.78953221,18.4359296 6.28670709,18.8633654 C7.5447918,19.9450082 9.44080155,20.5010712 12,20.5010712 C14.5599799,20.5010712 16.4578003,19.9446634 17.7186879,18.8621641 C18.2165778,18.4347149 18.5030511,17.8112072 18.5030511,17.1550005 L18.5030511,16.249921 C18.5030511,15.8357075 18.1672647,15.499921 17.7530511,15.499921 Z M11.8985607,2.00734093 L12.0003312,2.00049432 C12.380027,2.00049432 12.6938222,2.2826482 12.7434846,2.64872376 L12.7503312,2.75049432 L12.7495415,3.49949432 L16.25,3.5 C17.4926407,3.5 18.5,4.50735931 18.5,5.75 L18.5,10.254591 C18.5,11.4972317 17.4926407,12.504591 16.25,12.504591 L7.75,12.504591 C6.50735931,12.504591 5.5,11.4972317 5.5,10.254591 L5.5,5.75 C5.5,4.50735931 6.50735931,3.5 7.75,3.5 L11.2495415,3.49949432 L11.2503312,2.75049432 C11.2503312,2.37079855 11.5324851,2.05700336 11.8985607,2.00734093 L12.0003312,2.00049432 L11.8985607,2.00734093 Z M16.25,5 L7.75,5 C7.33578644,5 7,5.33578644 7,5.75 L7,10.254591 C7,10.6688046 7.33578644,11.004591 7.75,11.004591 L16.25,11.004591 C16.6642136,11.004591 17,10.6688046 17,10.254591 L17,5.75 C17,5.33578644 16.6642136,5 16.25,5 Z M9.74928905,6.5 C10.4392523,6.5 10.9985781,7.05932576 10.9985781,7.74928905 C10.9985781,8.43925235 10.4392523,8.99857811 9.74928905,8.99857811 C9.05932576,8.99857811 8.5,8.43925235 8.5,7.74928905 C8.5,7.05932576 9.05932576,6.5 9.74928905,6.5 Z M14.2420255,6.5 C14.9319888,6.5 15.4913145,7.05932576 15.4913145,7.74928905 C15.4913145,8.43925235 14.9319888,8.99857811 14.2420255,8.99857811 C13.5520622,8.99857811 12.9927364,8.43925235 12.9927364,7.74928905 C12.9927364,7.05932576 13.5520622,6.5 14.2420255,6.5 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
                  <a @click="route(chatbot)">{{chatbot.name}}</a>
                </div>
            </td>
            <td>
                <span>{{chatbot.intents_count}}</span>
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
      chatbots: [],
    };
  },
  created(){
    this.getSystems()
  },
  methods: {
    async getSystems() {
      try {
        this.chatbots = await DataService.getSystems();
      } catch (error) {
        console.error(error);
      }
    },
    route(chatbot){
      this.$router.push({ name: 'Intents', query: { system_id: chatbot.id } });
    }
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