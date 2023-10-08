<template>
    
    <n-tabs default-value="add" justify-content="start" type="line">
            <n-tab-pane name="o" tab="Oasis">
                Wonderwall
            </n-tab-pane>
            <n-tab-pane name="add" tab="Add a new note">
                <n-form>
                    <n-form-item label="title">
                        <n-input v-model:value="addNote.title" placeholder="Please enter a title"/>
                    </n-form-item>
                    <n-form-item label="Content">
                        <RichTextEditor v-model="addNote.content"></RichTextEditor>
                    </n-form-item>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="jay chou" tab="周杰伦">
                七里香
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
    categoryId:0,
    title:"",
    content:"Please enter the content"
})

</script>

<style lang="scss" scoped></style>