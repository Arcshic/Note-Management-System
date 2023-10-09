<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">Home</div>
            <div>
                <n-popselect v-model:value="selectedCategory" :options="categoryOptions" trigger="click">
                    <div>Category <span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">Dashboard</div>
        </div>
        <n-divider />
        <n-space class="search">
            <n-input v-model:value = "pageInfo.keyword" :style="{width:'500px'}" placeholder="Please enter a keyword" />
            <n-button type="primary" ghost @click="loadNote(0)">Search</n-button>
            
        </n-space>
        <div v-for="(note, index) in noteList">
            <n-card :title="note.title">
                {{ note.content }}
                <template #footer>
                    <n-space align="center">
                        <div>Create time: {{ note.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <br>
            <n-pagination @update:page="loadNote" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>Created by Clarke Ji</div>
            <div>UOA || yji413</div>
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

onMounted(() => {
    loadCategory();
    loadNote();
})

const categoryName = computed(() => {
    let selectedOption = categoryOptions.value.find((option) => {
        return option.value == selectedCategory.value

    })
    return selectedOption ? selectedOption.label : ""
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

const homePage = () => {
    router.push("/")
}
const dashboard = () => {
    router.push("/login")
}

const noteList = ref([])
const loadNote = async (page = 0) => {
    if(page !=0){
        pageInfo.page = page;
    }
    let res = await axios.get(`/note/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pagesize=${pageInfo.pageSize}`)
    let tempRows = res.data.data.rows
    for (let row of tempRows) {
        row.content += "..."
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    }
    noteList.value = tempRows;
    pageInfo.Count = res.data.data.count;
    pageInfo.pageCount = parseInt(pageInfo.Count / pageInfo.pageSize) + (pageInfo.Count % pageInfo.pageSize > 0 ? 1 : 0)
}

let pageInfo = reactive({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    Count: 0,
    keyword: ""
})
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

        span {
            font-size: 12px;
        }
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
.search{
    margin-bottom: 15px;
}
</style>