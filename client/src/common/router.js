import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
    { path: "/login", component: () => import("../views/Login.vue") },
    { path: "/", component: () => import("../views/HomePage.vue") },
    { path: "/content", component: () => import("../views/Content.vue") },
    { path: "/dashboard", component: () => import("../views/dashboard/Dashboard.vue"),children:[
        {path:"/dashboard/category",component: () => import("../views/dashboard/Category.vue")},
        {path:"/dashboard/note",component: () => import("../views/dashboard/Note.vue")}
    ] }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router, routes };