import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import {createDiscreteApi} from 'naive-ui'
import {router} from './common/router.js'
import {createPinia} from "pinia"
import axios from 'axios'
import { AdminStore } from './stores/AdminStore'

axios.defaults.baseURL = "http://localhost:8080"

const { message, notification, dialog } = createDiscreteApi(['message','notification', 'dialog' ])


const app = createApp(App)
app.provide("message",message)
app.provide("axios",axios)
app.provide("notification",notification)
app.provide("dialog",dialog)
app.provide("serverUrl",axios.defaults.baseURL)
app.use(naive)
app.use(createPinia())
app.use(router)

const adminStore = AdminStore()
axios.interceptors.request.use((config)=>{
    config.headers.token = adminStore.token
    return config
})

app.mount('#app')
