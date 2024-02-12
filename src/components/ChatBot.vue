<template>
    <div class="container" :class="{ minimized: minimized }">
        <div class="top">
            <div class="AvatarBot">
              <svg style="width:30px;height:30px" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg959" xml:space="preserve" width="114.48267" height="104.22386" viewBox="0 0 114.48267 104.22386" sodipodi:docname="logo e usluge v2.svg" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)"><metadata id="metadata965"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><defs id="defs963"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath977"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path975"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath995"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path993"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1005"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1007"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1017"><path d="M 387.752,53.15 H 526.65 V 81.496 H 387.752 Z" id="path1015"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1023"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1025"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1045"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1043"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1059"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1057"/></clipPath></defs><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="2560" inkscape:window-height="1369" id="namedview961" showgrid="false" inkscape:zoom="1.0350506" inkscape:cx="435.82854" inkscape:cy="90.082062" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="g967" inkscape:document-rotation="0"/><g id="g967" inkscape:groupmode="layer" inkscape:label="Knjiga standarda e usluge 1701 (1)" transform="matrix(1.3333333,0,0,-1.3333333,-153.07053,320.70653)"><g id="g1029" transform="translate(200.6649,237.5359)"><path d="m 0,0 -85.862,0.004 v 2.99 L 0,2.99 Z" style="fill:#d0b22f;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1031"/></g><path d="m 136.225,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1033"/><path d="m 161.722,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1035"/><path d="m 187.22,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1037"/></g></svg>            </div>
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
      system_initial: '',
    }
  },
  async mounted() {
    let res = await DataService.getInitialChat(this.$route.query.system_id)
    this.system_name = res[0].system_name
    this.system_initial = res[0].system_initial
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
        assistant_answer: this.system_initial
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
                      text: '<svg style="width:20px;height:15px" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg959" xml:space="preserve" width="114.48267" height="104.22386" viewBox="0 0 114.48267 104.22386" sodipodi:docname="logo e usluge v2.svg" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)"><metadata id="metadata965"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><defs id="defs963"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath977"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path975"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath995"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path993"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1005"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1007"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1017"><path d="M 387.752,53.15 H 526.65 V 81.496 H 387.752 Z" id="path1015"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1023"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1025"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1045"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1043"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1059"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1057"/></clipPath></defs><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="2560" inkscape:window-height="1369" id="namedview961" showgrid="false" inkscape:zoom="1.0350506" inkscape:cx="435.82854" inkscape:cy="90.082062" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="g967" inkscape:document-rotation="0"/><g id="g967" inkscape:groupmode="layer" inkscape:label="Knjiga standarda e usluge 1701 (1)" transform="matrix(1.3333333,0,0,-1.3333333,-153.07053,320.70653)"><g id="g1029" transform="translate(200.6649,237.5359)"><path d="m 0,0 -85.862,0.004 v 2.99 L 0,2.99 Z" style="fill:#d0b22f;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1031"/></g><path d="m 136.225,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1033"/><path d="m 161.722,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1035"/><path d="m 187.22,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1037"/></g></svg>            </div><span>ChatBot</span>',
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
                if(response.intent_id){
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
        text: '<svg style="width:20px;height:15px" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg959" xml:space="preserve" width="114.48267" height="104.22386" viewBox="0 0 114.48267 104.22386" sodipodi:docname="logo e usluge v2.svg" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)"><metadata id="metadata965"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><defs id="defs963"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath977"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path975"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath995"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path993"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1005"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1007"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1017"><path d="M 387.752,53.15 H 526.65 V 81.496 H 387.752 Z" id="path1015"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1023"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1025"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1045"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1043"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1059"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1057"/></clipPath></defs><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="2560" inkscape:window-height="1369" id="namedview961" showgrid="false" inkscape:zoom="1.0350506" inkscape:cx="435.82854" inkscape:cy="90.082062" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="g967" inkscape:document-rotation="0"/><g id="g967" inkscape:groupmode="layer" inkscape:label="Knjiga standarda e usluge 1701 (1)" transform="matrix(1.3333333,0,0,-1.3333333,-153.07053,320.70653)"><g id="g1029" transform="translate(200.6649,237.5359)"><path d="m 0,0 -85.862,0.004 v 2.99 L 0,2.99 Z" style="fill:#d0b22f;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1031"/></g><path d="m 136.225,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1033"/><path d="m 161.722,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1035"/><path d="m 187.22,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1037"/></g></svg>            </div><span>ChatBot</span>',
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
        text: '<svg style="width:20px;height:15px" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg959" xml:space="preserve" width="114.48267" height="104.22386" viewBox="0 0 114.48267 104.22386" sodipodi:docname="logo e usluge v2.svg" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)"><metadata id="metadata965"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><defs id="defs963"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath977"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path975"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath995"><path d="M 0,425.197 H 708.661 V 0 H 0 Z" id="path993"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1005"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1007"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1017"><path d="M 387.752,53.15 H 526.65 V 81.496 H 387.752 Z" id="path1015"/></clipPath><mask maskUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" id="mask1023"><image width="1" height="1" style="image-rendering:optimizeSpeed" preserveAspectRatio="none" xlink:href="data:image/png;base64,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" id="image1025"/></mask><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1045"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1043"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="clipPath1059"><path d="M 0,0 H 708.661 V 425.197 H 0 Z" id="path1057"/></clipPath></defs><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="2560" inkscape:window-height="1369" id="namedview961" showgrid="false" inkscape:zoom="1.0350506" inkscape:cx="435.82854" inkscape:cy="90.082062" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="g967" inkscape:document-rotation="0"/><g id="g967" inkscape:groupmode="layer" inkscape:label="Knjiga standarda e usluge 1701 (1)" transform="matrix(1.3333333,0,0,-1.3333333,-153.07053,320.70653)"><g id="g1029" transform="translate(200.6649,237.5359)"><path d="m 0,0 -85.862,0.004 v 2.99 L 0,2.99 Z" style="fill:#d0b22f;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1031"/></g><path d="m 136.225,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1033"/><path d="m 161.722,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1035"/><path d="m 187.22,162.362 h -7.973 v 64.379 h 7.973 z" style="fill:#203667;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path1037"/></g></svg>            </div><span>ChatBot</span>',
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
          let textNode = document.createTextNode(node.textContent);

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
  padding: 0 25px;
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