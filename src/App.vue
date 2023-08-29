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
                  <Card
                    v-for="(card, index) in rules"
                    :key="index"
                    :card="card"
                    @click="scrollToCard(index)"
                    @remove="removeRule"
                    :isSelected="selectedCardIndex === index"
                    :style="{ backgroundColor: selectedCardIndex === index ? 'rgb(188, 218, 238)' : 'transparent' }"
                  />
              </div>
            </div>
            <hr/>
            <!-- <div class="button-container">
                <button @click="addRule(rules.length)" class="background-button" type="button" style="margin-right: 1rem;">
                  <span>Novi korak</span>
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" class="svg">
                    <path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path>
                  </svg>
                </button>
                <div/>
              </div> -->
          </section>
        </transition>
      </div>
      <div class="right-side" ref="rightSide">
        <div v-for="(rule, index) in rules" :key="index">
          <transition name="card-slide" mode="out-in">
            <div :ref="'scrollableCard_' + index">
              <Rule
                :rule="rule"
                @add="addRule"
                @remove="removeRule"
              />
            </div>
          </transition>
        </div>
        <button class="expand-button" v-if="isLeftPanelCollapsed" @click="toggleLeftPanel">Proširi panel</button>
        <!-- <button class="preview" type="button">
          Pregled
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Preview" aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" role="img" class="svg">
            <path d="M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.4819-.8763l20,11a1,1,0,0,1,0,1.7525l-20,11A1.0005,1.0005,0,0,1,7,28ZM8,6.6909V25.3088L24.9248,16Z"></path>
          </svg>
        </button> -->
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
        <transition name="fade" appear>
          <div v-if="showChatbot" class="chatbot-container">
            <Chatbot/>
          </div>
        </transition>
      </div>
    </div>
 </div>
</template>
<script>
import Navbar from './components/AppNavbar.vue';
import Card from './components/CardItem.vue';
import Rule from './components/RuleItem.vue';
import ActionEditor from './components/ActionEditor.vue'
import windowScrollPosition from './utils/window-scroll-position'
import Chatbot from './components/ChatBot.vue'
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
      console.log(this.rules)
    },
  },
};
</script>
<style>
:root {
  --hover__color: #E5E5E5;
  --background: #f4f4f4;
  --main__color: #0f62fe;
  --border__color: #d2d2d2;

  --font__size: 15px;
  --font__family: IBM Plex Sans,Helvetica Neue,Arial,sans-serif;
}

html, body {
  margin:0;
}

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

ul, li{
  list-style: none;
  padding: unset;
}

hr{
    background-color: var(--border__color);
    border: 0;
    height: 1px;
    margin: 0.5rem 0 0;
    padding-bottom: 0;
}

button{
  cursor: pointer;
}

button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  position: relative;
}

button:focus{
  outline:.125rem solid #0f62fe
}

.color-button{
  color: var(--main__color);
  padding: calc(0.375rem - 3px) 16px;
  min-height: 2rem;
}

.main-button{
  color: #000;
  font-weight: unset;
  background: white;
  padding:5px;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  cursor: pointer;
  margin: 0 10px;
}


.main-button:hover{
  background-color: var(--hover__color);
  transition: .2s;
}

.color-button:hover{
  background: var(--hover__color);
  transition: .2s;
}

.background-button{
    background-color: #0f62fe;
    border: 1px solid transparent;
    color: #fff;
    min-height: 2.5rem;
    padding: calc(0.675rem - 3px) 60px calc(0.675rem - 3px) 12px;
}

.background-button:hover{
    background-color: #0b4ecd;
    transition: .2s;
}

.chat{
  z-index: 2;
  position: fixed;
  right:1rem;
  color: #b4bcc1;
  bottom: 1rem;
  cursor: pointer;
}

.text-style{
  font-size: .75rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: .32px;
  line-height: 1.33333;
  margin-top: .75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p{
  margin:unset;
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

.svg{
  height: 1rem;
  position: absolute;
  right: 1rem;
  width: 1rem;
  margin-right: 4px;
  margin-top: 2px;
}

.button-container {
  text-align: right;
  background-color: var(--background);
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 25%;
  padding-bottom: 1rem;
  padding-top: 1rem;
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
</style>