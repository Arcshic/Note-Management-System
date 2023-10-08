<template>
    <div class="login-panel">
        <n-card title="Note Management System Login">
            <n-form :rules="rules" :model="admin">
                <n-form-item path="account" label="User Account">
                    <n-input v-model:value="admin.account" placeholder="Please enter your account" />

                </n-form-item>
                <n-form-item path="password" label="User Password">
                    <n-input v-model:value="admin.password" type="password" placeholder="Please enter your password" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.remember" label="Remember me" />
                <n-button @click="login">Login</n-button>
            </template>
        </n-card>
    </div>
</template>

<script setup>

import { ref, reactive, inject } from 'vue'
import {AdminStore} from '../stores/AdminStore'

import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();


const axios = inject("axios")
const message = inject("message")
const notification = inject("notification")
const dialog = inject("dialog")
const adminStore = AdminStore()


let rules = {
    account: [
        { required: true, message: "Please enter your account", trigger: "blur" },
        { min: 3, max: 12, message: "Your account should be between 3 and 12 characters", trigger: "blur" },
    ],
    password: [
        { required: true, message: "Please enter your password", trigger: "blur" },
        { min: 6, max: 18, message: "Your passsword should be between 6 and 18 characters", trigger: "blur" },
    ],
}
const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    remember: localStorage.getItem("remember") ==1
})

const login = async () =>{
    let result = await axios.post("/admin/login",{
        account:admin.account,
        password:admin.password
    });
    if(result.data.code == 200){
        adminStore.token = result.data.data.token
        adminStore.account = result.data.data.account
        adminStore.id = result.data.data.id
        
        if(admin.remember){
            localStorage.setItem("account",admin.account)
            localStorage.setItem("password",admin.password)
            localStorage.setItem("remember",admin.remember?1:0)
        }
        router.push("/dashboard")
        message.info("login successful")
    }else{
        message.error("login failed")
    }
    console.log(result)
}
</script>

<style lang="scss" scoped>
.login-panel {
    width: 500px;
    margin: 0 auto;
    margin-top: 130px;
}
</style>