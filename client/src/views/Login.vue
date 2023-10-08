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
                <n-checkbox v-model:checked="admin.rember" label="Remember me" />
                <n-button @click="login">Login</n-button>
            </template>
        </n-card>
    </div>
</template>

<script setup>

import { ref, reactive, inject } from 'vue'

const axios = inject("axios")

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
    account: "",
    password: "",
    rember: false
})

const login = async () =>{
    let result = await axios.post("/admin/login",{
        account:admin.account,
        password:admin.password
    });
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