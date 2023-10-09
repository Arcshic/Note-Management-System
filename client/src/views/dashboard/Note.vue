<template>
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
        <n-tab-pane name="list" tab="Note list">
            <div v-for="(note, index) in noteList">
                <n-card :title="note.title">
                    {{ note.content }}
                    <template #footer>
                        <n-space align="center">
                            <div>Create time: {{ note.create_time }}</div>
                            <n-button @click="toUpdate(note)">Update</n-button>
                            <n-button @click="toDelete(note)">Delete</n-button>
                        </n-space>
                    </template>
                </n-card>
            </div>
            <br>
            <div>
                <n-space vertical>
                    <n-pagination @click="toPage(page)" v-model:page="page" :page-count="pageInfo.pageCount"
                        :page-slot="8" />
                </n-space>
            </div>
        </n-tab-pane>
        <n-tab-pane name="add" tab="Add a new note">
            <n-form>
                <n-form-item label="Title">
                    <n-input v-model:value="addNote.title" placeholder="Please enter a title" />
                </n-form-item>
                <n-form-item label="Category">
                    <n-select v-model:value="addNote.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="Content">
                    <RichTextEditor v-model="addNote.content"></RichTextEditor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="add">Submit</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
        <n-tab-pane name="update" tab="Update a Note">
            <n-form>
                <n-form-item label="Title">
                    <n-input v-model:value="updateNote.title" placeholder="Please enter a title" />
                </n-form-item>
                <n-form-item label="Category">
                    <n-select v-model:value="updateNote.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="Content">
                    <RichTextEditor v-model="updateNote.content"></RichTextEditor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="update">Submit</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>

import { AdminStore } from '../../stores/AdminStore';
const adminStore = AdminStore()

import { ref, reactive, inject, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router';
import RichTextEditor from '../../components/richTextEditor.vue'
const router = useRouter();
const route = useRoute();


const axios = inject("axios")
const message = inject("message")
const notification = inject("notification")
const dialog = inject("dialog")

const addNote = reactive({
    categoryId: 0,
    title: "",
    content: "Please enter the content"
})
const updateNote = reactive({
    id: 0,
    categoryId: 0,
    title: "",
    content: "Please enter the content"
})
let page
const categoryOptions = ref([])
const noteList = ref([])
const tabValue = ref("list")
let pageInfo = reactive({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    Count: 0
})
onMounted(() => {
    loadNote()
    loadCategory()
})

const loadNote = async () => {
    let res = await axios.get(`/note/search?page=${pageInfo.page}&pagesize=${pageInfo.pageSize}`)
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

const loadCategory = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}

const add = async () => {
    let res = await axios.post("/note/_token/add", addNote)
    if (res.data.code == 200) {
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
}

const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadNote()
}
const toUpdate = async (note) => {
    tabValue.value = "update"
    let res = await axios.get("/note/detail?id=" + note.id)
    updateNote.id = note.id;
    updateNote.title = res.data.rows[0].title;
    updateNote.content = res.data.rows[0].content;
    updateNote.categoryId = res.data.rows[0].category_id;
}

const update = async () => {
    let res = await axios.put("/note/_token/update", updateNote)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadNote()
        tabValue.value = "list"
    } else {
        message.error(res.data.msg)
    }

}

const toDelete = async (note) => {

    dialog.warning({
        title: "Warning",
        content: "Are you sure you want to delete this note?",
        positiveText: "Confirm",
        negativeText: "Cancel",
        onPositiveClick: async () => {
            let res = await axios.delete("/note/_token/delete?id=" + note.id)
            if (res.data.code == 200) {
                message.info(res.data.msg)
                loadNote()
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => {
        }
    });

}


</script>

<style lang="scss" scoped></style>