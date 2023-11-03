import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import BaseDialog from "./components/textarea/ui/BaseDialog.vue";
import BaseTypingIndicator from "./components/textarea/ui/BaseTypingIndicator.vue";
import ActionDialog from "./components/popups/ActionDialog.vue"

createApp(App).use(router).component("base-dialog", BaseDialog).component("base-typing-indicator", BaseTypingIndicator).component("action-dialog",ActionDialog).mount('#app')
