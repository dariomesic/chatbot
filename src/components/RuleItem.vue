<template>
  <div class="content">
      <h4 style="margin-top:unset">Korak {{rule.id}}</h4>
      <div style="align-items: center;display: flex;margin-bottom: 1.5rem;">
        <div style="min-width: 7rem;">Ako je odabran</div>
        <CustomSelect :options="options" :value="selected_option" @update:value="conditionTypeChanged"/>
      </div>
      <CustomCondition v-if="selected_option == 's uvjetom'" @update:conditions="updateConditions" :conditions="ruleCopy.conditions" :rules_options="rules_options" :rules_answers="rules_answers"/>
      <hr/>
      <section>
        <h5>Odgovor asistenta</h5>
        <TextEditor :text="ruleCopy.assistant_answer" @updateText="updateAssistantAnswer"/>

        <!--RESPONSE PART-->
        <div class="main-container">
          <div v-if="!(ruleCopy.response_type === 'OPCIJE')" class="clickable-div" tabindex="1" @click="optionsResponseVisible = !optionsResponseVisible">
            <span style="align-items: center;display: flex;color:#0f62fe">
              <svg style="margin-right: .75rem;fill: #0f62fe" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2c1.4 0 2.5 1.1 2.5 2.5S9.4 7 8 7 5.5 5.9 5.5 4.5 6.6 2 8 2M8 1C6.1 1 4.5 2.6 4.5 4.5S6.1 8 8 8s3.5-1.6 3.5-3.5S9.9 1 8 1zM13 15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1 10 4 11.1 4 12.5V15H3v-2.5C3 10.6 4.6 9 6.5 9h3c1.9 0 3.5 1.6 3.5 3.5V15z"></path>
              </svg>
              Definirajte odgovor korisnika
            </span>
              <svg style="fill:#0f62fe" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
              </svg>
          </div>
          <div v-else style="background-color: #f4f4f4;margin-top:2%;position:relative">
            <div style="align-items: center;display: flex;flex-wrap: wrap;min-height: 3.5rem;padding: .75rem;">
              <div v-for="response in ruleCopy.customer_response" :key="response" class="response-option"><span>{{response}}</span></div>
            </div>
            <div style="border-top: 1px solid #e0e0e0;display: flex;flex-wrap: wrap;">
              <button @click="show_modal = true" class="color-button" style="padding: calc(.375rem - 3px) 16px;" tabindex="0" type="button">Edit response</button>
              <div style="flex: 1 1;"></div>
              <button disabled class="color-button" style="padding-left: .4375rem;padding-right: .4375rem;" tabindex="0" type="button">
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"></path>
                    <path d="M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"></path>
                  </svg>
              </button>
              <button @click="optionsResponseVisible = !optionsResponseVisible" class="color-button" style="padding-left: .4375rem;padding-right: .4375rem;" tabindex="0" type="button">
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M6 6H26.1719l-3.586-3.5859L24 1l6 6-6 6-1.4141-1.4141L26.1719 8H6v7H4V8A2.0024 2.0024 0 016 6zM9.4141 20.4141L5.8281 24H26V17h2v7a2.0024 2.0024 0 01-2 2H5.8281L9.414 29.5859 8 31 2 25l6-6z"></path>
                  </svg>
              </button>
              <button class="color-button" style="padding-left: .4375rem;padding-right: .4375rem;" tabindex="0" type="button">
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                    <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
                  </svg>
              </button>
            </div>
          </div>
          <div class="options-details-container" v-if="optionsResponseVisible" @click.stop>
            <div class="options-container">
              <div
                class="option"
                tabindex="1"
                v-for="(option, index) in response_options"
                :key="index"
                @mouseenter="showDetails(index)"
                @mouseleave="hideDetails"
                @click="option === 'Opcije' ? (show_modal = true,ruleCopy.response_type = 'OPCIJE') : (step_selected = option, ruleCopy.response_type = '');optionsResponseVisible = false"
              >
                {{ option }}
              </div>
            </div>
            <div class="details-container">
              <div class="details" v-if="activeIndex !== null">
                <h5 style="margin:0.75rem"> {{response_options[activeIndex]}} </h5>
                <div style="margin:0.75rem;font-size:0.875rem"> {{ response_details[activeIndex] }} </div>
              </div>
            </div>
          </div>
        </div>


      </section>
      <hr/>

      <!--NEXT STEP-->
      <h5 style="margin-bottom:unset">And then</h5>
      <div class="main-container" @click="optionsContinuationVisible = !optionsContinuationVisible">
        <div class="clickable-div" tabindex="1">
          <span style="align-items: center;display: flex;color:#0f62fe">
            <svg style="margin-right: .75rem;fill: #0f62fe" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"></path>
            </svg>
            {{ step_selected }}
          </span>
          <svg style="fill:#0f62fe" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          </svg>
        </div>
        <div class="options-details-container" v-if="optionsContinuationVisible">
          <div class="options-container">
            <div
              class="option"
              tabindex="1"
              v-for="(option, index) in step_options"
              :key="index"
              @mouseenter="showDetails(index)"
              @click="step_selected = option;updateContinuation(option)"
            >
              {{ option }}
            </div>
          </div>
          <div class="details-container">
            <div class="details" v-if="activeIndex !== null">
              <h5 style="margin:0.75rem"> {{step_options[activeIndex]}} </h5>
              <div style="margin:0.75rem;font-size:0.875rem"> {{ step_details[activeIndex] }} </div>
            </div>
          </div>
        </div>
      </div>


      <div class="topright">
        <button @click="$emit('remove', rule.id)" class="main-button" style="align-items: center;display: flex;">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
            <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
            <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
          </svg>
          UKLONI
        </button>
      </div>
    </div>
    <h2 class="plus-separator"><button @click="$emit('add', rule.id)" class="line-center">+</button></h2>
    <Teleport to="body">
        <Popup :show_modal="show_modal" @addOptions="updateOptions" @close="show_modal = false" :options="ruleCopy.customer_response"/>
    </Teleport>
</template>
<script>
import TextEditor from './TextEditor.vue'
import CustomCondition from './CustomCondition.vue'
import CustomSelect from './CustomSelect.vue'
import Popup from './PopupModal.vue'
export default {
  components:{TextEditor, CustomCondition, CustomSelect, Popup},
   props: {
    rule: Object,
    rules_options: Array,
    rules_answers: Array,
  },
  data() {
    return {
      options: ['bez uvjeta', 's uvjetom'],
      selected_option: Object.keys(this.rule.conditions).length === 0 ? 'bez uvjeta' : 's uvjetom',
      optionsResponseVisible: false,
      optionsContinuationVisible: false,
      activeIndex: null,
      response_options: ['Opcije', 'Regularni izraz', 'Slobodni tekst'],
      response_details: [
        'Omogućite korisnicima odabir iz skupa izbora.',
        'Detalji za regularni izraz',
        'Detalji za slobodni tekst',
      ],
      step_options: ['Nastavite na idući korak', 'Ponovite prethodne korake', 'Odlazak na pod-akciju', 'Kontaktiranje agenta', 'Završetak radnje'],// 'Search for the answer',
      step_details: [
        'Slijedite tijek radnji do bilo kojeg koraka koji je sljedeći.',
        'Ponovite jedan ili više koraka koji su ranije navedeni u trenutnoj radnji.',
        'Prebaci tijek razgovora na drugu radnju za obavljanje određenog zadatka.',
        /*'Detalji za searching for the answer',*/
        'Prenesi korisnika nekome iz svog tima za podršku.',
        'Neka ovo bude posljednji korak koji dovršava radnju.'
      ],
      step_selected: this.rule.continuation,
      show_modal: false,
      ruleCopy: { ...this.rule },
    };
  },
  methods: {
    conditionTypeChanged(event){
      this.selected_option = event
      event == 's uvjetom' ? this.ruleCopy.conditions = {
        "allConditionsMustBeTrue": true,
        "conditionsList": [
          {
            "subject": "",
            "predicate": "",
            "object": ""
          }
        ]
      } : this.ruleCopy.conditions = {}
      this.$emit("updateRule", this.ruleCopy);
    },
    updateOptions(options) {
      this.ruleCopy.customer_response = options;
      this.$emit("updateRule", this.ruleCopy);
    },
    updateConditions(conditions) {
      this.ruleCopy.conditions = conditions;
      this.$emit("updateRule", this.ruleCopy);
    },
    updateAssistantAnswer(text) {
      this.ruleCopy.assistant_answer = text;
      this.$emit("updateRule", this.ruleCopy);
    },
    updateContinuation(option){
      this.ruleCopy.continuation = option;
      this.$emit("updateRule", this.ruleCopy);
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
  transition: .2s;
}

h2{
  text-align: center;
  position: relative;
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

.clickable-div:focus{
  border: .135rem solid #0f62fe
}

.options-details-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
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
}

.option {
  background: #f5f5f5;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.2s;
  cursor: pointer;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  outline:.135rem solid #0f62fe;
}

.details {
  background-color: #f5f5f5;
  text-align: left;
}

.option:hover + .details {
  display: block;
}

.response-option{
  color: #161616;
  padding: .475rem .5rem;
  word-break: break-word;
  background-color: #e0e0e0;
  display: inline-flex;
  font-size: .75rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: .32px;
  line-height: 1.33333;
  margin: .25rem;
  max-width: 100%;
  vertical-align: middle;
  border-radius: .9375rem;
}
</style>