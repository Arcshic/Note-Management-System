import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import {router} from "./common/router.js"
import {createPinia} from "pinia"
import axios from `axios`

axios.defaults.baseURL = "http://localhost:8080"

const app = createApp(App)
app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')
