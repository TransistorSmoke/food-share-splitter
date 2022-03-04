import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import './assets/style.css';

const emitter = mitt();
const app = createApp(App);

// createApp(App).globalProperties.emitter = emitter;
// createApp(App).mount('#app');

app.config.globalProperties.emitter = emitter;
app.mount('#app');
