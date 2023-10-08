<template>
    <div>
        <n-button @click="showAddModel = true">Add</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category,index) in categoryList">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <n-space>
                        <n-button>Update</n-button><n-button>Delete</n-button>
                    </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <n-modal v-model:show="showAddModel" preset="dialog" title="Dialog">
    <template #header>
      <div>Add a new category</div>
    </template>
    <div>
        <n-input v-model:value="addCategory.name" type = "text" placeholder="Please enter a name for new category" />
    </div>
    <template #action>
      <div><n-button @click="add">Submit</n-button></div>
    </template>
  </n-modal>
    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
const adminStore = AdminStore()

import { ref, reactive, inject,onMounted } from 'vue'

import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();


const axios = inject("axios")
const message = inject("message")
const notification = inject("notification")
const dialog = inject("dialog")

const showAddModel = ref(false)
const categoryList = ref([])
const addCategory = reactive({
    name:""
})
onMounted(()=>{
    loadDatas()
})

const loadDatas = async()=>{
    let res = await axios.get("/category/list")
    categoryList.value = res.data.rows
}

const add = async()=>{
    let res = await axios.post("/category/_token/add",{name:addCategory.name},{headers:{token:adminStore.token}})
    if(res.data.code ==200){
        loadDatas()
        message.info(res.data.msg)
    }else{
        message.error(res.data.msg)
    }
    showAddModel.value = false;
}
</script>

<style lang="scss" scoped>

</style>