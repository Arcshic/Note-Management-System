<template>
    <div>
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted,inject} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { i18nChangeLanguage } from '@wangeditor/editor'
i18nChangeLanguage('en')

const serverUrl = inject("serverUrl")
const editorRef = shallowRef();
const toolbarConfig = {};
const mode = ref("default")
const editorConfig = { placeholder: 'Please enter the content' };
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 10 * 1024,
    server: serverUrl + '/upload/richEditorUpload',
}
editorConfig.MENU_CONF['insertImage'] = {
    parseImageSrc:(src) =>{
        if(src.indexOf("http")!=0){
            return `${serverUrl}${src}`
        }
        return src
    }
}
const valueHtml = ref("")

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})

const emit = defineEmits(["update:model-value"])
let initFinished = false

onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.modelValue;
        initFinished = true;
    }, 10);
});
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;

    editor.destroy();
});


const handleCreated = (editor) => {
    console.log('created', editor);
    editorRef.value = editor;
};
const handleChange = (editor) => {
    if (initFinished) {
        emit("update:model-value", valueHtml.value)
    }
};
</script>

<style lang="scss" scoped></style>