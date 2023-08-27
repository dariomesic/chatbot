<template>
  <div class="content">
      <h4 style="margin-top:unset">Step {{rule.id}}</h4>
      <div style="align-items: center;display: flex;margin-bottom: 1.5rem;">
        <div style="min-width: 4rem;">Is taken</div>
        <CustomSelect :options="options" @selected="selectedOption = $event"/>
      </div>
      <CustomCondition v-if="selectedOption == 'with conditions'" />
      <hr/>
      <section>
        <h5>Assistant says</h5>
        <TextEditor/>

        <!--RESPONSE PART-->
        <div class="main-container" @click="toggleOptions">
          <div class="clickable-div">
            <span>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2c1.4 0 2.5 1.1 2.5 2.5S9.4 7 8 7 5.5 5.9 5.5 4.5 6.6 2 8 2M8 1C6.1 1 4.5 2.6 4.5 4.5S6.1 8 8 8s3.5-1.6 3.5-3.5S9.9 1 8 1zM13 15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1 10 4 11.1 4 12.5V15H3v-2.5C3 10.6 4.6 9 6.5 9h3c1.9 0 3.5 1.6 3.5 3.5V15z"></path>
              </svg>
              Define customer response
            </span>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
              </svg>
          </div>
          <div class="options-details-container" v-if="optionsVisible">
            <div class="options-container">
              <div
                class="option"
                v-for="(option, index) in response_options"
                :key="index"
                @mouseenter="showDetails(index)"
                @mouseleave="hideDetails"
              >
                {{ option }}
              </div>
            </div>
            <div class="details-container">
              <div class="details" v-if="activeIndex !== null">
                {{ response_details[activeIndex] }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr/>

      <!--NEXT STEP-->
      <div class="main-container" @click="toggleOptions">
        <div class="clickable-div">
          <span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"></path>
            </svg>
            Continue to next step
          </span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
            </svg>
        </div>
        <div class="options-details-container" v-if="optionsVisible">
          <div class="options-container">
            <div
              class="option"
              v-for="(option, index) in step_options"
              :key="index"
              @mouseenter="showDetails(index)"
              @mouseleave="hideDetails"
            >
              {{ option }}
            </div>
          </div>
          <div class="details-container">
            <div class="details" v-if="activeIndex !== null">
              {{ step_details[activeIndex] }}
            </div>
          </div>
        </div>
      </div>


      <div class="topright">
        <button @click="$emit('remove', rule.id)" class="main-button">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
            <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
          </svg>
          REMOVE
        </button>
      </div>
    </div>
    <h2 class="plus-separator"><button @click="$emit('add', rule.id)" class="line-center">+</button></h2>
</template>
<script>
import TextEditor from './TextEditor.vue'
import CustomCondition from './CustomCondition.vue'
import CustomSelect from './CustomSelect.vue'
export default {
  components:{TextEditor, CustomCondition, CustomSelect},
   props: {
    rule: Object,
  },
  data() {
    return {
      selectedOption: 'without conditions',
      options: ['without conditions', 'with conditions'],
      optionsVisible: false,
      activeIndex: null,
      response_options: ['Options', 'Regex', 'Free text'],
      response_details: [
        'Details for options',
        'Details for regex',
        'Details for free text',
      ],
      step_options: ['Continue to next step', 'Re-ask previous steps', 'Go to a subaction', 'Connect to agent', 'End the action'],// 'Search for the answer',
      step_details: [
        'Details for continuing to next step',
        'Details for re-asking previous steps',
        'Details for going to a subaction',
        /*'Details for searching for the answer',*/
        'Details for connecting to agent',
        'Details for ending the action'
      ]
    };
  },
  methods: {
    toggleOptions() {
      this.optionsVisible = !this.optionsVisible;
    },
    showDetails(index) {
      this.activeIndex = index;
    },
    hideDetails() {
      this.activeIndex = null;
    },
  }
}
</script>
<style>
.content{
  margin: 25px 100px 25px 100px;
  padding: 2%;
  border: 1px solid #d3d3d3;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border-radius: 3px;
  position: relative;
}
.res-val{
  margin-top: 2%;
  background: var(--background);
}
.res-val section{
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 3.5rem;
  padding: 0.75rem;
}
.res-val div{
    height: 2rem;
    border-top: 1px solid #e0e0e0;
    display: flex;
    flex-wrap: wrap;
}
.res-val li{
    border-radius: 0.9375rem;
    letter-spacing: .32px;
    line-height: 1.33333;
    margin: 0.25rem;
    background-color: #e0e0e0;
    padding: 0.375rem 0.5rem;
    word-break: break-word;
}

.topright{
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.line-center{
  content: "\002B";
  display: inline-block;
  position: relative;
  font-size: 1.3rem;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  background: var(--border__color);;
  border-radius:10%;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  cursor: pointer;
  color: white;
}

.line-center:hover{
  background: var(--hover__color);
}

h2{
  text-align: center;
  position: relative;
  z-index: 1;
}

h2[class="plus-separator"]:after{
  margin: 0px 100px 25px 100px;
  content:"";
  position:absolute;
  top:50%;
  left:0;
  right:0;
  border-top:medium double var(--border__color);;
  z-index:-1;
}

/*CUSTOM SELECT */
.main-container {
  margin-top: 1%;
  width: 100%;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.clickable-div {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.options-details-container {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.main-container:hover .options-details-container {
  display: flex;
}

.options-container {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.details-container {
  flex: 3;
  padding: 10px;
}

.option {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
  cursor: pointer;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  background-color: #f5f5f5;
}

.details {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: right;
}

.option:hover + .details {
  display: block;
}
</style>