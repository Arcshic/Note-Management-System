<template>
    <div class="container">
        <div class="nav">
            <div>Home</div>
            <div>
                <n-popselect v-model:value="selectedCategory" :options="categoryOptions" trigger="click">
                    <div>Category<span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div>Dashboard</div>
        </div>

    </div>
</template>

<script setup>
import { AdminStore } from '../stores/AdminStore';
const adminStore = AdminStore()

import { ref, reactive, inject, onMounted, computed } from 'vue'

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const axios = inject("axios")
const selectedCategory = ref(0)
const categoryOptions = ref([])

onMounted(()=>{
    loadCategory();
})

const categoryName = computed(()=>{
    
})

const loadCategory = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}
</script>

<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        cursor: pointer;
        margin-left: 15px;

        &:hover {
            color: #f60;
        }
    }
}
</style>