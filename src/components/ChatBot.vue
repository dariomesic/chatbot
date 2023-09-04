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
        </div>
        <div class="ContentChat">
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
        </div>
        <div class="BoxSentMSG ">
            <input
              type="text"
              placeholder="Napišite poruku..."
              class="InputMSG"
              v-model="inputValue"
              @keydown.enter="sendMessage"
              required
            >
            <div class="send-icon" @click="sendMessage"><svg id="send1" :class="{ 'none': status_func_SendMsgBot }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24 " xml:space="preserve"> <path fill="#d7d7d7 " d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z "> </path> </svg> <svg id="send2" :class="{ 'none': !status_func_SendMsgBot }" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate> </rect> <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate> </rect> <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"> <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate> </rect> </svg> </div>
        </div>
    </div>
</template>

<script>
export default{
  data(){
    return{
      inputValue: '',
      messages: [],
      status_func_SendMsgBot: 0,
    }
  },
  mounted() {
    // Automatically send an initial message from the bot
    this.initializeBot();
  },
  methods: {
    initializeBot() {
      // Simulate a delayed bot response after initial greeting
      setTimeout(() => {
        const responseMessage = `<div class="bot-response text" text-first="true">Pozdrav 👋 ! Ja sam chatbot sustava ePredmet. Postavite pitanje vezano uz sustav.</div>`
        this.addBotMessage(responseMessage);
      }, 2000);
    },
    sendMessage() {
      if (this.inputValue !== '' && this.status_func_SendMsgBot === 0) {
        this.addUserMessage(this.inputValue);

        this.sendMsgBot(this.inputValue);

        this.inputValue = '';
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
    },
    async sendMsgBot(msg) {
      msg = msg.toLowerCase();
      msg = msg.replace(/<\s*br[^>]?>/, '\n');
      msg = msg.replace(/(<([^>]+)>)/g, '');

      this.status_func_SendMsgBot = 1;

      const listMSG = {
        hello: ['Hello!', "Hi 👋 ! It's good to see you!", 'Great to see you here!'],
        hwa: ['I\'m fine!', 'I am fine', 'I feel good seeing you 😊', 'I feel great 🤪'],
        about: [
          "I'm happy you asked about that!",
          "My name is RayBot, I'm a simple and fun bot and I can answer your questions to some extent and do the things you want 😉",
        ],
      };

      const listScan = {
        hello: ['hi', 'hello', 'hey'],
        hwa: [
          'how are you',
          'hwa',
          'you are good',
          'you are fine',
          'are you well',
          'are you alright',
        ],
        about: [
          'information',
          'tell me about yourself',
          'introduce yourself',
          'who are you',
          'how about your self',
        ],
      };
      this.status_func_SendMsgBot = 1; // Start the animation
      const result = await this.generateBotResponse(msg, listScan, listMSG);
      console.log(result)
      this.addBotMessage(result);
      this.status_func_SendMsgBot = 0;
    },
    generateBotResponse(msg, listScan, listMSG) {
      return new Promise((resolve) => { // Return a promise
        setTimeout(() => {
        let result = '';
          for (const i of listScan['hello']) {
            if (i == msg || i + '?' == msg || i + '!' == msg) {
              result = `<div class="bot-response text" text-first="true">${
                listMSG['hello'][Math.floor(Math.random() * 3)]
              }</div>`;
            }
          }
          if (result === '' || result === undefined) {
            for (const i of listScan['hwa']) {
              if (i == msg || i + '?' == msg || i + '!' == msg) {
                result = `<div class="bot-response text" text-first="true">${
                  listMSG['hwa'][Math.floor(Math.random() * 3)]
                }</div>`;
              }
            }
          }
          if (result === '' || result === undefined) {
            for (const i of listScan['about']) {
              if (i == msg || i + '?' == msg || i + '!' == msg) {
                result = `<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/GvYEn0QMm8_xLFjS.png" alt="about raybot"></img><div class="bot-response text" text-first="true">${listMSG['about'][0]}</div><div class="bot-response text" text-last="true">${listMSG['about'][1]}</div>`;
              }
            }
          }

          if (result === '' || result === undefined) {
            result = `<div class="bot-response text" text-first="true">😵‍💫 Oops! Sorry, I didn't understand your question</div>`;
          }

          resolve(result); // SET TIMER FROM CONDITIONS
        }, 2000);
      });
    },
    addBotMessage(message) {
      this.messages.push({
        text: '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="ChatBot"> <span>ChatBot</span>',
        classes: ['captionBot', 'msgCaption'],
        dataUser: false,
      });
      this.messages.push({
        text: message,
        classes: ['message'],
        dataUser: false,
      });
      console.log(this.messages)
    },

  },
}
</script>

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
    word-break: break-all;
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
  height: 50px;
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
  width: 100%;
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
</style>