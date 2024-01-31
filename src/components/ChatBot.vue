<template>
    <div class="container" :class="{ minimized: minimized }">
        <div class="top">
            <div class="AvatarBot">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width=40px fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="10" rx="2"></rect> <circle cx="12" cy="5" r="2"></circle> <path d="M12 7v4"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> </g></svg>
            </div>
            <div class="InfoBot">
                <p class="TitleBot">Virtualni asistent</p>
                <p class="status">{{system_name}}</p>
            </div>
            <div style="display: flex;right: 0;position: absolute;padding-right: 16px;">
              <button type="button" class="controls" @click="refresh">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true"><path d="M26,18A10,10,0,1,1,16,8h6.1821l-3.5844,3.5854L20,13l6-6L20,1,18.5977,2.414,22.1851,6H16A12,12,0,1,0,28,18Z"></path></svg>
              </button>
              <button type="button" class="controls" @click="toggleMinimized">
                <template v-if="minimized">
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" class="bx--btn__icon"><path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path></svg>
                </template>
                <template v-else>
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 15H24V17H8z"></path></svg>
                </template>
              </button>
            </div>
        </div>
        <div class="ContentChat" ref="chatContainer">
          <transition-group name="message" tag="div">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="message.classes"
              :data-user="message.dataUser"
              v-html="message.text"
            />
          </transition-group>
          <section v-if="status_func_SendMsgBot === 1">
            <div class="captionBot msgCaption" data-user="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="10" rx="2"></rect> <circle cx="12" cy="5" r="2"></circle> <path d="M12 7v4"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> </g></svg> <span style="margin-top:2px">ChatBot</span></div>
            <div class="message"> <div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div> </div>
          </section>
          <!-- SVG icons for thumbs up and thumbs down -->
          <div v-if="showFeedbackButtons" style="padding: 0 25px 0px;">
            <button class="thumb" :disabled="selectedFeedbackButton" :style="selectedFeedbackButton === 'up' ? { transform: 'scale(1)', opacity: '1' } : {}" @click="handleFeedback(true)">
              <svg style="padding:15px 5px;height:25px;width:25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10C3 9.44772 3.44772 9 4 9H7V21H4C3.44772 21 3 20.5523 3 20V10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 11V19L8.9923 20.3282C9.64937 20.7662 10.4214 21 11.2111 21H16.4586C17.9251 21 19.1767 19.9398 19.4178 18.4932L20.6119 11.3288C20.815 10.1097 19.875 9 18.6391 9H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 9L14.6872 5.56415C14.8659 4.67057 14.3512 3.78375 13.4867 3.49558V3.49558C12.6336 3.21122 11.7013 3.59741 11.2992 4.4017L8 11H7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <button class="thumb" :disabled="selectedFeedbackButton" :style="selectedFeedbackButton === 'down' ? { transform: 'scale(1)', opacity: '1' } : {}" @click="handleFeedback(false)">
              <svg style="padding:15px 5px;height:25px;width:25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 14C21 14.5523 20.5523 15 20 15H17V3H20C20.5523 3 21 3.44772 21 4V14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 13V5L15.0077 3.6718C14.3506 3.23375 13.5786 3 12.7889 3H7.54138C6.07486 3 4.82329 4.06024 4.5822 5.5068L3.38813 12.6712C3.18496 13.8903 4.12504 15 5.36092 15H10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 15L9.31283 18.4358C9.13411 19.3294 9.64876 20.2163 10.5133 20.5044V20.5044C11.3664 20.7888 12.2987 20.4026 12.7008 19.5983L16 13H17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </div>
        <div class="BoxSentMSG " ref="messageBox">
            <textarea
              ref="textarea"
              v-if="!showOptions"
              placeholder="Napišite poruku..."
              class="InputMSG"
              @input="adjustTextareaHeight"
              v-model="inputValue"
              @keydown.enter="sendMessage"
              required
              maxlength="200"
            />
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
import * as DOMPurify from 'dompurify';
import { v4 as uuidv4 } from 'uuid';
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
      minimized: false,
      intent_id: '',
      conditions: {},
      sessionUUID: '',
      system_name: '',
    }
  },
  async mounted() {
    this.system_name = await DataService.getNameForSystem(this.$route.query.system_id)
    // Generate a session UUID when the component is mounted
    this.sessionUUID = uuidv4();
    this.conditions[this.sessionUUID] = [];
    console.log(this.sessionUUID)

    // Automatically send an initial message from the bot
    this.initializeBot();

    //Event for button clicks
    const responseContainer = this.$refs.messageBox;

    responseContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('bot-option')) {
        const optionText = event.target.innerText;
        const text = event.target.getAttribute('data-text');
        this.handleUserResponse(optionText, text);
      }
    });

    const chatContainer = this.$refs.chatContainer;

    chatContainer.addEventListener('click', async (event) => {
      if (event.target.classList.contains('bot-option')) {
        let response;
        if(!(event.target.getAttribute('data-text') == 'PRETRAŽI BAZU ZNANJA' || event.target.getAttribute('data-text') == 'PREFORMULIRAT ĆU PITANJE')){
          this.addUserMessage(event.target.getAttribute('data-text'))
          response = await JSON.parse(await DataService.getRulesForIntent(event.target.getAttribute('data-intent-id')))[0]
          response.intent_id = event.target.getAttribute('data-intent-id')
          response.position = 0
          this.intent_id = event.target.getAttribute('data-intent-id')
          this.selectedFeedbackButton = false;
          this.addBotMessage(response);
        }
        else if(event.target.getAttribute('data-text') == 'PREFORMULIRAT ĆU PITANJE'){
          response = {
            assistant_answer: `Možda mogu ponuditi bolji odgovor ako preformulirate Vaše pitanje.`
          };
          this.addBotMessage(response);
        }
        else{
          this.addUserMessage(event.target.getAttribute('data-text'))
          response = await DataService.searchDocuments(event.target.getAttribute('data-question'))
          let messageText = `<div><p>U našoj bazi pronašli smo sljedeći dokument s najvećim podudaranjem:</p><h4>${response.document_title}${response.document_page ? `(${response.document_page}.str)` : ''}</h4><div style="font-style:italic">${response.text}</div></div>`;
          this.addBotMessage({assistant_answer: messageText});
        }
        await DataService.updateConversationTmp(this.sessionUUID, this.$route.query.system_id, Number(event.target.getAttribute('data-intent-id')), event.target.getAttribute('data-question'), event.target.getAttribute('data-threshold'), response)
      }
    });
  },
  methods: {
    async initializeBot() {
      // Simulate a delayed bot response after initial greeting
      await new Promise(resolve => setTimeout(resolve, 1000));
      let responseMessage = {
        assistant_answer: `Pozdrav 👋 ! Ja sam virtualni asistent sustava ` + this.system_name + `. Postavite pitanje vezano uz sustav ili odaberite neku od navedenih tema.`
      };
      this.addBotMessage(responseMessage);
      // ADD SUBJECTS IN THE BEGGINING
      let themes = await DataService.getThemes(this.$route.query.system_id)
      if(themes[0].intents){
        const optionsHtml = JSON.parse(themes[0].intents).map(option => `<button class="bot-option" data-intent-id="${option.key}" data-text="${option.name}" data-question="${option.name}" data-threshold="1.0">${option.name}</button>`).join('');
          this.messages.push({
            text: optionsHtml,
            classes: ['message'],
            dataUser: false,
          });
      }
    },
    
    async sendMessage() {
      this.showFeedbackButtons = false
      if (this.inputValue !== '' && this.status_func_SendMsgBot === 0) {
        // Sanitize the input to allow only plain text
        const sanitizedInput = DOMPurify.sanitize(this.inputValue, { ALLOWED_TAGS: [] });
        // Add the sanitized input as a user message
        this.addUserMessage(sanitizedInput);


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
                // Push the condition into the session's conditions array
                this.conditions[this.sessionUUID].push(condition);

                const response = await DataService.userResponse(this.conditions[this.sessionUUID], this.responseApi.intent_id, this.responseApi.position, this.sessionUUID, this.$route.query.system_id, sanitizedInput)
                response.intent_id = this.responseApi
                this.addBotMessage(response);
              }
              else if(this.responseApi.continuation === 'Završetak radnje'){
                this.responseApi = {}
                this.showFeedbackButtons = true
              }
              else if(this.responseApi.continuation === 'Kontaktirajte agenta'){
                try {
                  let condition = {
                    subject: this.responseApi.assistant_answer,
                    predicate: 'je',
                    object: "defined",
                  }
                  // Push the condition into the session's conditions array
                  this.conditions[this.sessionUUID].push(condition);

                  const response = await DataService.sendMail(this.responseApi, this.sessionUUID, sanitizedInput, this.conditions[this.sessionUUID], this.$route.query.system_id)
                  response.intent_id = this.responseApi.intent_id
                  this.addBotMessage(response);
                } catch (error) {
                  this.responseApi = {}
                  this.showFeedbackButtons = true
                }
              }
               //OVDJE SE SAD SPREMA VRIJEDNOST U TABLICU LOGOVA
            } else if (this.responseApi.response_type === 'Regularni izraz') {
                // Handle "Regularni izraz" user response here
                var regEx = new RegExp(this.responseApi.customer_response.split(' ')[1]);
                if (regEx.test(sanitizedInput)) {
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
                    // Push the condition into the session's conditions array
                    this.conditions[this.sessionUUID].push(condition);

                    const response = await DataService.userResponse(this.conditions[this.sessionUUID], this.responseApi.intent_id, this.responseApi.position, this.sessionUUID, this.$route.query.system_id, sanitizedInput)
                    response.intent_id = this.responseApi.intent_id
                    this.addBotMessage(response);
                  }
                  else if(this.responseApi.continuation === 'Završetak radnje'){
                    this.responseApi = {}
                    this.showFeedbackButtons = true
                  }
                  else if(this.responseApi.continuation === 'Kontaktirajte agenta'){
                    try {
                      let condition = {
                        subject: this.responseApi.assistant_answer,
                        predicate: 'je',
                        object: "defined",
                      }
                      // Push the condition into the session's conditions array
                      this.conditions[this.sessionUUID].push(condition);

                      const response = await DataService.sendMail(this.responseApi, this.sessionUUID, sanitizedInput, this.conditions[this.sessionUUID], this.$route.query.system_id)
                      response.intent_id = this.responseApi.intent_id
                      this.addBotMessage(response);
                    } catch (error) {
                      this.responseApi = {}
                      this.showFeedbackButtons = true
                    }
                  }
                  //OVDJE SE SAD SPREMA VRIJEDNOST U TABLICU LOGOVA
                } else {
                    const errorMessage = "Unijeli ste netočan regularni izraz. Molim Vas pokušajte ponovno.";
                    let messageText = `<div class="bot-response text" text-first="true">` + errorMessage + '</div><p class="time-text">' + new Date().toLocaleTimeString('en-US', { hour12: false }) + `</p>`
                    this.messages.push({
                      text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="10" rx="2"></rect> <circle cx="12" cy="5" r="2"></circle> <path d="M12 7v4"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> </g></svg> <span style="margin-top:2px">ChatBot</span>',
                      classes: ['captionBot', 'msgCaption'],
                      dataUser: false,
                    },
                    {
                      text: messageText,
                      classes: ['message'],
                      dataUser: false});
                    }
            } else {
                // For other response types, use the default DataService.sendMessage
                const response = await DataService.sendMessage(sanitizedInput, this.$route.query.system_id, this.sessionUUID);
                this.conditions[this.sessionUUID] = []
                if(response.intent_id){ //if response has confidence > 0.9
                  this.selectedFeedbackButton = false;
                  this.intent_id = response.intent_id
                  this.addBotMessage(response);
                }
                else if(Array.isArray(response)){
                  this.addPossibleIntents(response)
                }
                else{
                  this.addBotMessage({ assistant_answer: response });
                }
            }
            // Clear the input field after sending the message.
            this.inputValue = "";
            this.$refs.textarea.style.height = '44px'
            this.scrollChatToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
      }
    },

    addUserMessage(message) {
      this.messages.push({
        text: `<div class="captionUser">Vi</div>`,
        classes: ['message', 'msgCaption'],
        dataUser: true,
      });
      this.messages.push({
        text: `<div class="user-response">${message}</div><p class="time-text" style="text-align:end">` + new Date().toLocaleTimeString('en-US', { hour12: false }) + `</p>`,
        classes: ['message'],
        dataUser: true,
      });
      this.scrollChatToBottom()
    },

    async addBotMessage(message) {
      this.responseApi = message
      console.log(this.responseApi)
      this.messages.push({
        text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="10" rx="2"></rect> <circle cx="12" cy="5" r="2"></circle> <path d="M12 7v4"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> </g></svg> <span style="margin-top:2px">ChatBot</span>',
        classes: ['captionBot', 'msgCaption'],
        dataUser: false,
      });

      let messageText = `<div class="bot-response text" text-first="true"><pre>` + message.assistant_answer + `</pre></div><p class="time-text">` + new Date().toLocaleTimeString('en-US', { hour12: false }) + `</p>`
      let tmp = message.assistant_answer
      message.assistant_answer = tmp
    
      if(!message.assistant_answer.includes("timer-content")){
        this.messages.push({
          text: messageText,
          classes: ['message'],
          dataUser: false,
        });
      }
      else{
        this.messages.push({
          text: `<div class="bot-response text" text-first="true"><pre></pre></div>`,
          classes: ['message'],
          dataUser: false,
        });
        await this.displayContentWithDelays(message);
        this.messages[this.messages.length - 1].text += '<p class="time-text">' + new Date().toLocaleTimeString('en-US', { hour12: false }) + `</p>`
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
        try {
          const response = await DataService.nextStep(message, this.conditions[this.sessionUUID]);
          response.intent_id = message.intent_id
          this.showOptions = false
          this.chatbotOptions = ''
          this.addBotMessage(response);
        } catch (error) {
          this.responseApi = {}
          this.showFeedbackButtons = true
        }
      }
      else if(message.continuation === 'Završetak radnje'){
        this.responseApi = {}
        this.showFeedbackButtons = true
      }
      else if(message.continuation === 'Kontaktirajte agenta'){
        try {
          const response = await DataService.sendMail(this.responseApi, this.sessionUUID, '', this.conditions[this.sessionUUID], this.$route.query.system_id)
          response.intent_id = this.responseApi.intent_id
          this.addBotMessage(response);
        } catch (error) {
          this.responseApi = {}
          this.showFeedbackButtons = true
        }
      }

      this.scrollChatToBottom();
    },

    addPossibleIntents(message){
      this.messages.push({
        text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="10" rx="2"></rect> <circle cx="12" cy="5" r="2"></circle> <path d="M12 7v4"></path> <line x1="8" y1="16" x2="8" y2="16"></line> <line x1="16" y1="16" x2="16" y2="16"></line> </g></svg> <span style="margin-top:2px">ChatBot</span>',
        classes: ['captionBot', 'msgCaption'],
        dataUser: false,
      });
      let messageText = `<div class="bot-response text" text-first="true"> Molim Vas odaberite temu na koju biste htjeli odgovor <br> <div style="display:grid">`;
      let counter = 0;
      message.forEach((option) => {
        counter++;
        messageText += `<button class="bot-option" data-intent-id="${option.intent_id}" data-text="${option.intent_name}" data-question="${option.question}" data-threshold="${option.threshold}">${option.intent_name.toUpperCase()}</button>`;
        counter == 4 ? messageText += "<p style='text-align:center'>ili</p>" : ''
      });
      messageText += '</div></div><p class="time-text">' + new Date().toLocaleTimeString('en-US', { hour12: false }); + `</p>`
      this.messages.push({
        text: messageText,
        classes: ['message'],
        dataUser: false,
      });
      this.scrollChatToBottom();
    },

    renderOptions(message) {
      // Clone the message object to avoid modifying the original data
      const modifiedMessage = { ...message };

      // Replace img elements with "SLIKA"
      const container = document.createElement('div');
      container.innerHTML = modifiedMessage.assistant_answer;
      
      container.querySelectorAll('img').forEach((img) => {
        img.replaceWith(document.createTextNode(''));
      });

      // Replace pause elements with "PAUSE {duration}s"
      container.querySelectorAll('.timer-content').forEach((div) => {
        div.replaceWith(document.createTextNode(''));
      });

      // Update the modified message with the replaced HTML
      modifiedMessage.assistant_answer = container.innerHTML;

      // Generate HTML for options using the modified message
      let optionsHtml = '';
      modifiedMessage.customer_response.forEach((option) => {
        optionsHtml += `<button class="bot-option" data-text='${modifiedMessage.assistant_answer}'>${option}</button>`;
      });

      // Remove extra white spaces from the generated HTML
      return optionsHtml;
    },

    async handleUserResponse(selectedOption, text) {
      this.addUserMessage(selectedOption)
      try {
        // Iterate through all options to build conditions
        this.responseApi.customer_response.forEach((option) => {
          const conditionLog = {
            subject: text,
            predicate: option === selectedOption ? 'je' : 'nije', // Condition based on selection
            object: option,
          };
          // Add the condition log to the array
          this.conditions[this.sessionUUID].push(conditionLog);
        });
        console.log(this.conditions[this.sessionUUID])

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
        const response = await DataService.userResponse(this.conditions[this.sessionUUID], this.responseApi.intent_id, this.responseApi.position, this.sessionUUID, this.$route.query.system_id, selectedOption);
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

        if (chatContainer) {
          // Check if chatContainer is defined
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    },

    async handleFeedback(value){
      try {
        value ? (await DataService.thumbsUp(this.sessionUUID, this.$route.query.system_id, this.intent_id),this.selectedFeedbackButton = 'up') : (await DataService.thumbsDown(this.sessionUUID, this.$route.query.system_id, this.intent_id),this.selectedFeedbackButton = 'down')
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
          } else if (node.nodeName === "BR" && !isFirstNode) {
            messageContentElement.appendChild(document.createElement("br"));
          } else if (node.classList.contains("timer-content")) {
            const duration = parseFloat(
              node.querySelector("p").getAttribute("data-duration")
            );
            if (!isNaN(duration) && duration > 0) {
              // Append the content before the pause to the message content element
              if (this.messages.length > 0) {
                this.messages[this.messages.length - 1].text =
                  this.removeLastOccurrence(
                    this.messages[this.messages.length - 1].text,
                    messageContentElement.innerHTML
                  );
                this.messages[this.messages.length - 1].text =
                  this.removeLastOccurrence(
                    this.messages[this.messages.length - 1].text,
                    `<div><h1 class="dot one">.</h1><h1 class="dot two">.</h1><h1 class="dot three">.</h1></div>`
                  );
              }
              messageContentElement.innerHTML = "";
              // Delay here
              this.scrollChatToBottom();
              await new Promise((resolve) =>
                setTimeout(resolve, duration * 1000)
              );
            }
            this.messages[this.messages.length - 1].text = this.messages[
              this.messages.length - 1
            ].text.replace(
              `<div><h1 class="dot one">.</h1><h1 class="dot two">.</h1><h1 class="dot three">.</h1></div>`,
              ""
            );
            !isFirstNode
              ? messageContentElement.appendChild(document.createElement("br"))
              : "";
          } else {
            const childNodes = node.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
              const childNode = childNodes[i];
              await processNode(
                childNode,
                isFirstNode && i === 0,
                isLastNode && i === childNodes.length - 1
              );
            }
          }
        }
      };

      const childNodes = tempElement.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        await processNode(
          childNode,
          i === 0 ||
            (i === 1 &&
              (childNodes[0].textContent.trim().length === 0 ||
                childNodes[0].nodeName === "BR")),
          i === childNodes.length - 1
        ); //additional conditions because blank spaces in the beggining or empty <br>
      }

      if (this.messages.length > 0) {
        this.messages[this.messages.length - 1].text =
          this.removeLastOccurrence(
            this.messages[this.messages.length - 1].text,
            messageContentElement.innerHTML
          );
      }
    },

    removeLastOccurrence(inputString, update) {
      const lastIndex = inputString.lastIndexOf('</pre></div>');
      const beforeSubstring = inputString.slice(0, lastIndex);
      const afterSubstring = inputString.slice(lastIndex + '</pre></div>'.length);
      return beforeSubstring + afterSubstring + update + '</pre></div>';
    },

    toggleMinimized() {
      this.minimized = !this.minimized;
    },

    refresh() {
      this.messages = []; // Clear messages
      this.responseApi = {}; // Reset responseApi
      this.showFeedbackButtons = false; // Reset feedback buttons
      this.showOptions = false;
      this.chatbotOptions = ''
      this.initializeBot(); // Restart the chatbot
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
  },
}
</script>
<style scoped>
/*TRANSITION FOR MESSAGESS INSIDE CONTAINER*/
.message-enter-active, .message-leave-active {
  transition: opacity 0.5s;
}
.message-enter-from, .message-leave-to {
  opacity: 0;
}
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
    background: var(--main__color);
    color: rgb(255, 255, 255);
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
  display: grid;
  justify-content: flex-end;
}

.msgCaption {
  padding: 0 25px 10px !important;
  padding-top: 10px !important;
  box-sizing: border-box;
}

.user-response {
    background: #d6b445;
    color: rgb(255, 255, 255);
    font-size: 17px;
    line-height: 24px;
    border-radius: 20px;
    max-width: 250px;
    padding: 15px 17px;
    border-bottom-right-radius: 5px;
    white-space: normal;
    word-wrap: break-word;
}

.message {
  padding: 0 25px 0px;
}

.message img {
  width: 100%;
  height: 100%;
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
  font-family: "Gill Sans",sans-serif;
  outline: none;
  border: none;
  width: 100%;
  margin-left: 15px;
  font-size: 1.1rem;
  resize: none;
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
  position: relative;
  height: 450px;
  overflow-y: scroll;
  overflow-anchor: none; /* Add this line to disable auto-scroll behavior */
}

.ContentChat::before {
  content: "";
  display: block;
  height: 10px;
  width: 100%;
}

.ContentChat::after {
  content: "";
  display: block;
  height: 10px;
  width: 100%;
}

.bot-option:hover {
    z-index: 2;
    transition: all .2s ease-in-out;
    transform: scale(0.95);
    opacity: 1;
}

.thumb{
  transform: scale(.85);
  transition: all .2s ease-in-out;
  opacity: .6;
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
  font-size: 20px;
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
  height: 60px;
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
  transition: height 0.3s ease;
}

.minimized .ContentChat{
  display: none; /* Hide chat content when minimized */
}

.minimized .BoxSentMSG{
  display: none; /* Hide chat content when minimized */
}

.InputMSG:valid ~ .send-icon svg path {
  fill: #0066ff;
}

.none {
  display: none;
}

.bot-option{
  background: white;
  border: 1px solid #003366;
  color: #003366;
  opacity: 0.6;
  font-size: .65rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: .32px;
  line-height: 1.33333;
  margin: .25rem;
  max-width: 100%;
  min-height: 1.5rem;
  min-width: 2rem;
  border-radius: .9375rem;
  padding: .345rem 1rem;
  margin-top: 8px;
}

.bot-option:hover{
  background: rgb(240, 240, 240);
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

.controls{
  height: 32px;
  width: 32px;
}

.controls:hover{
  background: var(--hover__color);
  transition: .2s;
}

.time-text{
  padding: 0.5rem 0.7rem;
  color: #515050;
  font-style: italic;
}

@media only screen and (max-width: 415px) {
  /* For phones: */
  .container {
    right: 0px;
    width: unset;
  }
}
</style>