import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import {createDiscreteApi} from 'naive-ui'
import {router} from './common/router.js'
import {createPinia} from "pinia"
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080"

const { message, notification, dialog } = createDiscreteApi(['message','notification', 'dialog' ])

const app = createApp(App)
app.provide("message",message)
app.provide("axios",axios)
app.provide("notification",notification)
app.provide("dialog",dialog)
app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')
