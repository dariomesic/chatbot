<template>
    <div class="container">
        <div class="top">
            <div class="AvatarBot">
                <img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="ChatBot">
            </div>
            <div class="InfoBot">
                <p class="TitleBot">ChatBot</p>
                <p class="status">Na vezi</p>
            </div>
            <button @click="$emit('exit')" tabindex="0" type="button" class="exit-button"><svg xmlns="http://www.w3.org/2000/svg" focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"/></svg></button>
        </div>
        <div class="ContentChat" ref="chatContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="message.classes"
            :data-user="message.dataUser"
            v-html="message.text"
          />
          <section v-if="status_func_SendMsgBot === 1">
            <div class="captionBot msgCaption" data-user="false"><img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="ChatBot"> <span>ChatBot</span></div>
            <div class="message"> <div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div> </div>
          </section>
          <!-- SVG icons for thumbs up and thumbs down -->
          <div v-if="showFeedbackButtons" style="padding: 0 25px 0px;">
            <button :disabled="selectedFeedbackButton" :style="selectedFeedbackButton === 'up' ? { transform: 'scale(1)', opacity: '1' } : {}" @click="handleFeedback(true)">
              <svg style="padding:15px 5px;height:25px;width:25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10C3 9.44772 3.44772 9 4 9H7V21H4C3.44772 21 3 20.5523 3 20V10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 11V19L8.9923 20.3282C9.64937 20.7662 10.4214 21 11.2111 21H16.4586C17.9251 21 19.1767 19.9398 19.4178 18.4932L20.6119 11.3288C20.815 10.1097 19.875 9 18.6391 9H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 9L14.6872 5.56415C14.8659 4.67057 14.3512 3.78375 13.4867 3.49558V3.49558C12.6336 3.21122 11.7013 3.59741 11.2992 4.4017L8 11H7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <button :disabled="selectedFeedbackButton" :style="selectedFeedbackButton === 'down' ? { transform: 'scale(1)', opacity: '1' } : {}" @click="handleFeedback(false)">
              <svg style="padding:15px 5px;height:25px;width:25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 14C21 14.5523 20.5523 15 20 15H17V3H20C20.5523 3 21 3.44772 21 4V14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 13V5L15.0077 3.6718C14.3506 3.23375 13.5786 3 12.7889 3H7.54138C6.07486 3 4.82329 4.06024 4.5822 5.5068L3.38813 12.6712C3.18496 13.8903 4.12504 15 5.36092 15H10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 15L9.31283 18.4358C9.13411 19.3294 9.64876 20.2163 10.5133 20.5044V20.5044C11.3664 20.7888 12.2987 20.4026 12.7008 19.5983L16 13H17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </div>
        <div class="BoxSentMSG " ref="messageBox">
            <input
              type="text"
              placeholder="Napišite poruku..."
              class="InputMSG"
              v-model="inputValue"
              @keydown.enter="sendMessage"
              required
              v-if="!showOptions"
            >
            <div v-else>
              <!-- Render chatbot options here when showOptions is true -->
              <div v-html="chatbotOptions"></div>
            </div>
            <div class="send-icon" @click="sendMessage"><svg id="send1" :class="{ 'none': status_func_SendMsgBot }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24 " xml:space="preserve"> <path fill="#d7d7d7 " d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z "> </path> </svg> <svg id="send2" :class="{ 'none': !status_func_SendMsgBot }" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> </rect> <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> </rect> <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> </rect> </svg> </div>
        </div>
    </div>
</template>

<script>
import DataService from '../services/data.services'
export default{
  data(){
    return{
      inputValue: '',
      messages: [],
      status_func_SendMsgBot: 0,
      showOptions: false, // Add this property to control input/option visibility
      chatbotOptions: '',
      showFeedbackButtons: false,
      selectedFeedbackButton: false,
      responseApi: {},
    }
  },
  mounted() {
    // Automatically send an initial message from the bot
    this.initializeBot();

    //Event for button click
    const responseContainer = this.$refs.messageBox;

    responseContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('bot-option')) {
        const optionText = event.target.innerText;
        const text = event.target.getAttribute('data-text');
        this.handleUserResponse(optionText, text);
      }
    });
  },
  methods: {
    initializeBot() {
      // Simulate a delayed bot response after initial greeting
      setTimeout(() => {
        const responseMessage = {
          assistant_answer: `Pozdrav 👋 ! Ja sam chatbot sustava ePredmet. Postavite pitanje vezano uz sustav`
        }
        this.addBotMessage(responseMessage);
      }, 1000);
    },
    
    async sendMessage() {
      this.showFeedbackButtons = false
      if (this.inputValue !== '' && this.status_func_SendMsgBot === 0) {
        this.addUserMessage(this.inputValue);
        try {
            // Check the response type
            if (this.responseApi.response_type === 'Slobodni tekst') {
              if(this.responseApi.continuation === 'Vrati se na pod-akciju'){
                let response = await DataService.goToStep(this.responseApi.intent_id, this.responseApi.previous_response.id)
                response.intent_id = this.responseApi.intent_id
                this.selectedFeedbackButton = false;
                this.addBotMessage(response)
              }
              else if(this.responseApi.continuation === 'Nastavite na idući korak'){
                let condition = {
                  subject: this.responseApi.assistant_answer,
                  predicate: 'je',
                  object: "defined",
                }
                const response = await DataService.userResponse(condition, this.responseApi.intent_id);
                response.intent_id = this.responseApi
                this.addBotMessage(response);
              }
              else if(this.responseApi.continuation === 'Završetak radnje'){
                this.responseApi = {}
                this.showFeedbackButtons = true
              }
               //OVDJE SE SAD SPREMA VRIJEDNOST U TABLICU LOGOVA
            } else if (this.responseApi.response_type === 'Regularni izraz') {
                // Handle "Regularni izraz" user response here
                var regEx = new RegExp(this.responseApi.customer_response.split(' ')[1]);
                if (regEx.test(this.inputValue)) {
                  if(this.responseApi.continuation === 'Vrati se na pod-akciju'){
                    let response = await DataService.goToStep(this.responseApi.intent_id, this.responseApi.previous_response.id)
                    response.intent_id = this.responseApi.intent_id
                    this.selectedFeedbackButton = false;
                    this.addBotMessage(response)
                  }
                  else if(this.responseApi.continuation === 'Nastavite na idući korak'){
                    let condition = {
                      subject: this.responseApi.assistant_answer,
                      predicate: 'je',
                      object: "defined",
                    }
                    const response = await DataService.userResponse(condition, this.responseApi.intent_id);
                    response.intent_id = this.responseApi.intent_id
                    this.addBotMessage(response);
                  }
                  else if(this.responseApi.continuation === 'Završetak radnje'){
                    this.responseApi = {}
                    this.showFeedbackButtons = true
                  }
                  //OVDJE SE SAD SPREMA VRIJEDNOST U TABLICU LOGOVA
                } else {
                    const errorMessage = "Unijeli ste netočan regularni izraz. Molim Vas pokušajte ponovno.";
                    this.addBotMessage({ assistant_answer: errorMessage });
                }
            } else {
                // For other response types, use the default DataService.sendMessage
                const response = await DataService.sendMessage(this.inputValue, this.$route.query.system_id);
                this.intent_id = response.intent_id;
                this.selectedFeedbackButton = false;
                this.addBotMessage(response);
            }
            // Clear the input field after sending the message.
            this.inputValue = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
      }
    },

    addUserMessage(message) {
      this.messages.push({
        text: `<div class="captionUser">You</div>`,
        classes: ['message', 'msgCaption'],
        dataUser: true,
      });
      this.messages.push({
        text: `<div class="user-response">${message}</div>`,
        classes: ['message'],
        dataUser: true,
      });
      this.scrollChatToBottom()
    },

    async addBotMessage(message) {
      this.responseApi = message
      this.messages.push({
        text: '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="ChatBot"> <span>ChatBot</span>',
        classes: ['captionBot', 'msgCaption'],
        dataUser: false,
      });


      let messageText = `<div class="bot-response text" text-first="true">` + message.assistant_answer + '</div>'
      let tmp = message.assistant_answer
      message.assistant_answer = tmp
    
      if(!message.assistant_answer.includes("pause-wrapper")){
        this.messages.push({
          text: messageText,
          classes: ['message'],
          dataUser: false,
        });
      }
      else{
        this.messages.push({
          text: `<div class="bot-response text" text-first="true"></div>`,
          classes: ['message'],
          dataUser: false,
        });
        await this.displayContentWithDelays(message);
      }


      /*MAIN LOGIC FOR CHATBOT*/
      if (message.response_type === 'Opcije') {
        // Display the options as buttons.
        this.showOptions = true; // Show chatbot options
        this.chatbotOptions = this.renderOptions(message);
      }
      else if(message.response_type === 'Regularni izraz' || message.response_type === 'Slobodni tekst'){console.log()}
      else if(message.continuation === 'Vrati se na pod-akciju'){
        let response = await DataService.goToStep(this.responseApi.intent_id, this.responseApi.previous_response.id)
        response.intent_id = message.intent_id
        this.selectedFeedbackButton = false;
        this.addBotMessage(response)
      }
      else if(message.continuation === 'Nastavite na idući korak'){
        const response = await DataService.nextStep(message);
        response.intent_id = message.intent_id
        this.showOptions = false
        this.chatbotOptions = ''
        this.addBotMessage(response);
      }
      else if(message.continuation === 'Završetak radnje'){
        this.responseApi = {}
        this.showFeedbackButtons = true
      }


      this.scrollChatToBottom();
    },

    renderOptions(message) {
      let optionsHtml = '';
      message.customer_response.forEach((option) => {
        optionsHtml += `<button class="bot-option" data-text="${message.assistant_answer}")">${option}</button>`;
      });
      return optionsHtml;
    },

    async handleUserResponse(selectedOption, text) {
      this.addUserMessage(selectedOption)
      try {
        // Iterate through all options to build conditions
        let conditions = []
        this.responseApi.customer_response.forEach((option) => {
          const conditionLog = {
            subject: text,
            predicate: option === selectedOption ? 'je' : 'nije', // Condition based on selection
            object: option,
          };
          // Add the condition log to the array
          conditions.push(conditionLog);
        });

        // Disable all options after the user makes a selection and change the style of the selected button
        const allOptions = document.querySelectorAll(`.bot-option[data-intent-id="${this.responseApi.intent_id}"]`);
        allOptions.forEach((optionElement) => {
          optionElement.setAttribute('disabled', '');
          if (optionElement.innerText === selectedOption) {
            optionElement.classList.add('selected');
          }
          else{
            optionElement.classList.add('disabled');
          }
        });

        // Make an API call to send the user's selected option.
        const response = await DataService.userResponse(conditions, this.responseApi.intent_id);
        response.intent_id = this.responseApi.intent_id
        this.responseApi = response
        this.showOptions = false
        this.chatbotOptions = ''
        // Update the chat interface with the bot's response.
        this.addBotMessage(response);
      } catch (error) {
        console.error('Error handling user response:', error);
      }
    },

    scrollChatToBottom() {
      this.$nextTick(() => {
        // Use this.$refs to access the chat container element
        const chatContainer = this.$refs.chatContainer;
      
        // Scroll to the bottom with smooth behavior
        chatContainer.scrollTop = chatContainer.scrollHeight;
        chatContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      })
    },

    async handleFeedback(value){
      try {
        value ? (await DataService.thumbsUp(this.intent_id),this.selectedFeedbackButton = 'up') : (await DataService.thumbsDown(this.intent_id),this.selectedFeedbackButton = 'down')
      } catch (error) {
        console.error(error);
      }
    },


    /*ONLY IF CONTENT INCLUDES PAUSE*/
    async displayContentWithDelays(message) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = message.assistant_answer;

      const messageContentElement = document.createElement("div");

      const processNode = async (node, isFirstNode, isLastNode) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let textNode = document.createTextNode(node.textContent.trim());

          // Handle text formatting
          const formattingTags = ["B", "I"];
          let parent = node.parentNode;
          while (parent) {
            if (formattingTags.includes(parent.nodeName)) {
              const formattedNode = document.createElement(parent.nodeName);
              formattedNode.appendChild(textNode);
              textNode = formattedNode;
            }
            parent = parent.parentNode;
          }

          messageContentElement.appendChild(textNode);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === "A") {
            const link = document.createElement("a");
            link.href = node.getAttribute("href");
            link.textContent = node.textContent;
            messageContentElement.appendChild(link);
          } else if (node.nodeName === "IMG") {
            const image = document.createElement("img");
            image.src = node.getAttribute("src");
            image.alt = node.getAttribute("alt");
            messageContentElement.appendChild(image);
          } else if (node.nodeName === "BR") {
            messageContentElement.appendChild(document.createElement("br"));
          } else if (node.classList.contains("pause-wrapper")) {
            const duration = parseFloat(node.querySelector("p").getAttribute("data-duration"));
            if (!isNaN(duration) && duration > 0) {
              // Append the content before the pause to the message content element
              if (this.messages.length > 0) {
                this.messages[this.messages.length - 1].text = this.removeLastOccurrence(this.messages[this.messages.length - 1].text, messageContentElement.innerHTML)
                this.messages[this.messages.length - 1].text = this.removeLastOccurrence(this.messages[this.messages.length - 1].text, `<div><h1 class="dot one">.</h1><h1 class="dot two">.</h1><h1 class="dot three">.</h1></div>`)
              }
              messageContentElement.innerHTML = '';
              // Delay here
              await new Promise((resolve) => setTimeout(resolve, duration * 1000));
            }
            this.messages[this.messages.length - 1].text = this.messages[this.messages.length - 1].text.replace(`<div><h1 class="dot one">.</h1><h1 class="dot two">.</h1><h1 class="dot three">.</h1></div>`, '')
            messageContentElement.appendChild(document.createElement("br"));
          } else {
            const childNodes = node.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
              const childNode = childNodes[i];
              await processNode(childNode, isFirstNode && i === 0, isLastNode && i === childNodes.length - 1);
            }
          }
        }
      };

      const childNodes = tempElement.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        await processNode(childNode, i === 0, i === childNodes.length - 1);
      }

      if (this.messages.length > 0) {
        this.messages[this.messages.length - 1].text = this.removeLastOccurrence(this.messages[this.messages.length - 1].text, messageContentElement.innerHTML);
      }
    },

    removeLastOccurrence(inputString, update) {
      const lastIndex = inputString.lastIndexOf('</div>');
      const beforeSubstring = inputString.slice(0, lastIndex);
      const afterSubstring = inputString.slice(lastIndex + '</div>'.length);
      return beforeSubstring + afterSubstring + update + '</div>';
    }

  },
}
</script>
<style scoped>
input[type="text"]:focus {
  outline: none;
}
</style>
<style>
.send-icon-animation .none {
  display: block;
}

.bot-response {
    font-size: 17px;
    line-height: 24px;
    border-radius: 20px;
    word-wrap: break-word;
    max-width: fit-content;
    padding: 15px 17px;
    background: var(--background);
    color: rgb(0, 0, 0);
    margin-top: 10px;
}

.text[text-first] {
  border-bottom-left-radius: 5px;
  margin-top: 0;
}

.text[text-middle] {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.text[text-last] {
  border-top-left-radius: 5px;
}

.message[data-user="true"] {
  display: flex;
  justify-content: flex-end;
}

.msgCaption {
  padding: 0 25px 10px !important;
  padding-top: 10px !important;
  box-sizing: border-box;
}

.user-response {
    background: indianred;
    color: rgb(255, 255, 255);
    font-size: 17px;
    line-height: 24px;
    border-radius: 20px;
    max-width: 250px;
    padding: 15px 17px;
    border-bottom-right-radius: 5px;
    white-space: normal;
}

.message {
  padding: 0 25px 0px;
}

.message img {
  width: 100%;
  height: 217px;
  background: white;
  border-radius: 10px;
  margin-bottom: 6px;
}

.captionBot img {
  width: 18px;
  height: 18px;
  border-radius: 100%;
}

.captionBot {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  width: 117px;
  font-size: 14px;
  color: rgb(24, 25, 25);
}

a {
  text-decoration: none;
}

.by a {
  font-size: 14px;
  font-weight: 600;
  margin-left: 3px;
}

.by {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-top: 1px solid rgb(238, 238, 238);
}

.by span {
  color: rgb(155, 166, 178);
  font-size: 12px;
  font-weight: 600;
}

.InputMSG {
  outline: none;
  border: none;
  width: 100%;
  height: 45px;
  margin-left: 15px;
  font-size: 1.1rem;
}

.InputMSG::placeholder {
  font-size: 1.1rem;
  color: rgb(155, 166, 178);
}

.BoxSentMSG {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
}

.send-icon {
  display: flex;
  background-color: white;
  width: 26px;
  height: 26px;
  margin: 0 13px;
  cursor: pointer;
}

.ContentChat {
  border-bottom: 1px solid #e6ebea;
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  overflow-anchor: none; /* Add this line to disable auto-scroll behavior */
}

.ContentChat::before {
  content: "";
  display: block;
  height: 20px;
  width: 100%;
}

.ContentChat::after {
  content: "";
  display: block;
  height: 20px;
  width: 100%;
}

.ContentChat button{
    transform: scale(0.85);
    transition: all .2s ease-in-out;
    opacity: 0.6;
}
 
.ContentChat button:hover {
    z-index: 2;
    transform: scale(1);
    opacity: 1;
}

.AvatarBot {
  display: grid;
  position: relative;
  justify-content: center;
  align-items: center;
}

.AvatarBot:after {
  content: "";
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 100%;
  border: 1px solid rgb(255, 255, 255);
  background: rgb(105, 222, 64);
  position: absolute;
  bottom: 1px;
  right: 1px;
}

.InfoBot {
  margin-left: 17px;
}

.status {
  color: rgb(155, 166, 179);
}

.TitleBot {
  font-size: 24px;
  font-weight: 600;
  white-space: nowrap;
}

.AvatarBot img {
  width: 50px;
  height: 50px;
}

.top {
  display: flex;
  align-items: center;
  height: 65px;
  padding-left: 13px;
  -webkit-box-shadow: 0 9.5px 12.7px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 9.5px 12.7px 0 rgba(0, 0, 0, 0.05);
}

.container {
  position: fixed;
  bottom: 80px;
  right: 15px;
  width: 400px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  z-index: 2;
}

.InputMSG:valid ~ .send-icon svg path {
  fill: #0066ff;
}

.none {
  display: none;
}

.bot-option{
  font-size: .75rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: .32px;
  line-height: 1.33333;
  margin: .25rem;
  max-width: 100%;
  min-height: 1.5rem;
  min-width: 2rem;
  border-radius: .9375rem;
  background: #e0e0e0;
  color: #161616;
  padding: .375rem .5rem;
  margin-top: 8px;
}

.bot-option:hover{
  background: var(--hover__color);
}

.bot-option.selected {
  background-color: #333;
  color: #fff;
  cursor: not-allowed;
}

.bot-option.disabled {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
}

.loading-dots {
  text-align: center;
  z-index: 5;
}
</style>