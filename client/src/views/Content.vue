<template>
    <div class="container">
        <n-button @click="back">Return</n-button>
        <n-h1>{{ noteContent.title }}</n-h1>
        <div class="noteContent">
            <div v-html="noteContent.content"></div>
        </div>
    </div>
</template>

<script setup>
import { AdminStore } from '../stores/AdminStore';
const adminStore = AdminStore()

import { ref, reactive, inject, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const axios = inject("axios")
const noteContent = ref({})
onMounted(()=>{
    loadContent();
})

const loadContent = async()=>{
    let noteId = route.query.id
    let res = await axios.get("/note/detail?id=" + noteId)
    noteContent.value = res.data.rows[0]
}
const back =()=>{
    router.push("/")
}
</script>

<style>
.noteContent{
    max-width: 100% !important;
}
</style>

<style lang="scss" scoped>
.container{
    width: 1200px;
    margin: 0 auto;
}
</style>