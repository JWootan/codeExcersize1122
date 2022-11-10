import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

export var hist = ref([]);

createApp(App).use(router).mount('#app')
