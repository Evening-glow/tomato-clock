import Vue from 'vue';
import VueRouter from "vue-router";
import Activity from '../pages/activity'
import Records from '../pages/records'
import Today from '../pages/today'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/activity',
            component: Activity
        },
        {
            path: '/records',
            component: Records
        },
        {
            path: '/today',
            component: Today
        }
    ]
})