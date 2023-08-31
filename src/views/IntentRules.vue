<template>
 <div class="app-container">
    <div class="fixed-container">
      <Navbar/>
      <ActionEditor/>
    </div>
    <div class="content-container">


      <div :class="['left-panel', { 'collapsed': isLeftPanelCollapsed }]">
        <button @click="toggleLeftPanel">Sažmi panel</button>
        <transition name="card-slide" mode="out-in">
          <section class="left-cards-container" v-show="!isLeftPanelCollapsed">
            <div class="left-cards">
              <div class="start-editor">
                  <div class="trigger">
                      <label class="text-style">Korisnik počinje pitanjem:</label>
                      <p class="text-style">Kako da promijenim NS zapise</p>
                  </div>
              </div>
              <div class="conversation-steps">
                  <p class="text-style" style="font-weight:600;margin-left: 2%;font-style:initial">Koraci konverzacije</p>
                  <TransitionGroup name="list" tag="ul">
                    <div v-for="(card, index) in rules" :key="card">
                      <Card
                        :card="card"
                        @click="scrollToCard(index)"
                        @remove="removeRule"
                        :isSelected="selectedCardIndex === index"
                        :style="{ backgroundColor: selectedCardIndex === index ? 'rgb(188, 218, 238)' : 'transparent' }"
                      />
                    </div>
                  </TransitionGroup>
              </div>
            </div>
            <hr/>
          </section>
        </transition>
      </div>


      <div class="right-side" ref="rightSide">

        <!--CUSTOMER QUESTIONS-->
        <div class="content">
          <div style="background-color: #f4f4f4;display: flex;flex-direction: column;flex-wrap: nowrap;margin-bottom: 2rem;max-height: 100%;padding: 1.5rem 2rem;">
            <h4 class="TriggerEditor__title">
              <span class="TriggerEditor__title-text">Customer starts with:</span>
            </h4>
            <p>Enter phrases that a customer types or says to start the conversation about a specific topic. These phrases determine the task, problem, or question your customer has.</p>
            <p>The more phrases you enter, the better your assistant can recognize what the customer wants.</p>
            <div>
              <ul>
                <li>
                  <label>
                    <span>Enter phrases your customer might use to start this action</span>
                    <span>Total: 2</span>
                  </label>
                </li>
                <li>
                  <div>
                    <label>New example message</label>
                    <div>
                      <div>
                        <input placeholder="Enter a phrase" type="text" title="Enter a phrase" aria-describedby="" autocomplete="off" value="">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      <div>
                        <input id="example-1" placeholder="Enter a phrase" type="text" title="Enter a phrase" aria-describedby="" autocomplete="off" value="Pitanje"></div>
                      </div>
                    </div>
                    <button id="example-Pitanje__delete-button" tabindex="0" type="button">
                      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                        <path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <div>
                      <div>
                        <div>
                          <input id="example-0" placeholder="Example: I want to pay my credit card bill." type="text" title="Example: I want to pay my credit card bill." aria-describedby="" autocomplete="off" value="example"></div>
                        </div>
                      </div>
                      <button id="example-example__delete-button" tabindex="0" type="button">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Delete" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                          <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                          <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
                        </svg>
                      </button>
                  </li>
                </ul>
              </div>
          </div>
        </div>
        
        <TransitionGroup name="list" tag="ul">
          <div v-for="(rule, index) in rules" :key="rule">
            <div :ref="'scrollableCard_' + index">
              <Rule
                :rule="rule"
                @add="addRule"
                @remove="removeRule"
              />
            </div>
          </div>
        </TransitionGroup>
        <button class="expand-button" v-if="isLeftPanelCollapsed" @click="toggleLeftPanel">Proširi panel</button>
        <div class="chat" @click="showChatbot = !showChatbot">
          <svg height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xml:space="preserve" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g> 
                <path style="fill:#3BA58B;" d="M25,9.586C11.193,9.586,0,19.621,0,32c0,4.562,1.524,8.803,4.135,12.343 C3.792,48.433,2.805,54.194,0,57c0,0,8.571-1.203,14.377-4.709c3.225,1.359,6.824,2.123,10.623,2.123c13.807,0,25-10.035,25-22.414 S38.807,9.586,25,9.586z"></path> 
                <path style="fill:#226BAC;" d="M58,23.414C58,11.035,46.807,1,33,1c-9.97,0-18.575,5.234-22.589,12.804 C14.518,11.153,19.553,9.586,25,9.586c13.807,0,25,10.035,25,22.414c0,4.735-1.642,9.124-4.437,12.743 C51.162,47.448,58,48.414,58,48.414c-2.805-2.805-3.792-8.566-4.135-12.657C56.476,32.217,58,27.976,58,23.414z"></path> 
                <circle style="fill:#FFFFFF;" cx="12" cy="32" r="3"></circle> 
                <circle style="fill:#FFFFFF;" cx="25" cy="32" r="3"></circle> 
                <circle style="fill:#FFFFFF;" cx="38" cy="32" r="3"></circle> 
              </g> 
            </g>
          </svg>
        </div>
        <Transition name="fade">
          <div v-if="showChatbot" class="chatbot-container">
            <Chatbot/>
          </div>
        </Transition>
      </div>
    </div>
 </div>
</template>
<script>
import Navbar from '../components/AppNavbar.vue';
import Card from '../components/CardItem.vue';
import Rule from '../components/RuleItem.vue';
import ActionEditor from '../components/ActionEditor.vue'
import { windowScrollPosition } from '../utils/window-scroll-position'
import Chatbot from '../components/ChatBot.vue'
export default {
  mixins: [windowScrollPosition('position')],
  components: {
    Card,Rule,Navbar,ActionEditor,Chatbot
  },
  data() {
    return {
      rules: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      selectedCardIndex: 0,
      isLeftPanelCollapsed: false,
      showChatbot: false
    };
  },
  watch: {
    position: {
      handler(val) {
        this.$nextTick(() => {
          for (let i = 0; i < this.rules.length; i++) {
            const refName = 'scrollableCard_' + i;
            if (this.$refs[refName]) {
              const element = this.$refs[refName][0];
              if (val[1] >= element.offsetTop - 450) {
                this.selectedCardIndex = i;
              }
            }
          }
        });
      },
    },
  },

  mounted(){
    //console.log(decodeId(this.$route.query.id))
  },
  methods: {
    scrollToCard(index) {
      let element = this.$refs['scrollableCard_' + index][0];
      let offsetTop = element.offsetTop;
      window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
      });
    },
    toggleLeftPanel() {
      this.isLeftPanelCollapsed = !this.isLeftPanelCollapsed;
    },
    addRule(idToAdd) {
      for (let i = idToAdd; i < this.rules.length; i++) {
        this.rules[i].id++;
      }
      this.rules.push({ id: idToAdd + 1 });
      this.rules.sort((a, b) => a.id - b.id);
    },
		removeRule(idToRemove) {
      if(this.rules.length != 1){
        this.rules = this.rules.filter(rule => rule.id !== idToRemove);
        for (let i = idToRemove - 1; i < this.rules.length; i++) {
            this.rules[i].id--;
        }
      }
    },
  },
};
</script>
<style>
.app-container {
  display: flex;
  flex-direction: column;
}


.content-container {
  display: flex;
  flex-direction: row;
}

.fixed-container{
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
}

.left-panel {
  background-color: var(--background);
  flex: 0 0 25%;
  transition: flex 0.2s ease-in-out;
  position: sticky;
  top: calc(3rem + 60px); /* Keep the left panel fixed at the top */
  overflow-y: auto;
  /*max-height: calc(100vh - 72px - (3rem + 60px));  Adjust to fit the viewport height minus header height */
  max-height: calc(100vh - 60px - 3rem);
}

.left-panel.collapsed {
  flex: 0 0 0;
}

.right-side {
  position: relative;
  flex: 1;
}

.expand-button {
  z-index: 3;
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.chat{
  z-index: 2;
  position: fixed;
  right:1rem;
  color: #b4bcc1;
  bottom: 1rem;
  cursor: pointer;
}

.start-editor{
    border: 1px solid transparent;
    border-bottom-color: #e0e0e0;
    position: relative;
    padding: 0.5rem;
}

.trigger{
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow .24s cubic-bezier(.2,0,.38,.9);
}

.trigger label{
    font-style: initial;
    cursor: pointer;
    display: block;
    font-weight: 600;
    padding: 0.75rem 0.75rem 0.25rem;
}

.trigger p{
    color: #525252;
    font-style: italic;
    padding: 0 0 0.5rem 0.75rem;
}

.left-cards-container {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 72px - (3rem + 60px)); /* Adjust to fit the viewport height minus header height */
  overflow-y: auto;
}

.divider{
  display: initial;
  align-self: stretch;
  border-left: 1px solid #e0e0e0;
  width: 0;
}

/* Left-to-right animation */
.card-slide-enter-active, .card-slide-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.card-slide-enter-from, .card-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Right-to-left animation */
.card-slide-reverse-enter-active, .card-slide-reverse-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.card-slide-reverse-enter-from, .card-slide-reverse-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
/* Transition classes appear */
/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

/*TRANSITION FOR CARDS*/
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>