<template>
    <div class="main-panel">
        <div class="menus">
            <div v-for="(menu,index) in menus" @click="toPage(menu)">
                {{ menu.name }}
            </div>
        </div>
    <div style="padding: 20px; width: 100%;">
        <router-view></router-view>
    </div>
        
    </div>
    <div class="title">Note Management System</div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
const adminStore = AdminStore()

import { ref, reactive, inject } from 'vue'

import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();


const axios = inject("axios")
const message = inject("message")
const notification = inject("notification")
const dialog = inject("dialog")

let menus = [
    {name:"Note management",href:"/dashboard/note"},
    {name:"Category management",href:"/dashboard/category"},
    {name:"Quit",href:"logout"}
]

const toPage = (menu) =>{
    if(menu.href=='logout'){
        router.push("/login")
    }else{
        router.push(menu.href)
    }
}
</script>

<style lang="scss" scoped>
.main-panel {
    display: flex;
    color: #64676a;
    max-width: 100%;
    margin: 0 auto;
}
.menus {
    padding: 20px;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 240px;
    height: 95vh;
    border-right: 1px solid #dadada;
    div{
        cursor: pointer;
        &:hover{
            color: #fd760e;
        }
    }
}
.title{
    font-size: 40px;
    font-weight: bold;
    text-align: right;
    position: fixed;
    color: rgba(0,0,0,20%);
    right: calc((100vw - 1500px)/2);
    bottom: 20px;
}
</style>