import Vue from "vue";
import VueRouter from 'vue-router';
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";


Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path: '/',
            components:{
                appBar: appBar,
                navDrawer: navDrawer
            },
        },
        {
            path: '/settings'
        }
    ],
});

export default router;