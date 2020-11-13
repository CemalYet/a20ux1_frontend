import Vue from "vue";
import VueRouter from 'vue-router';
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";
import feed from "@/components/feed";
import bottomNavBar from "@/components/bottomNavBar";
import hamburgerButton from "@/components/hamburgerButton";
import backButton from "@/components/backButton";
import camera from "@/components/camera";
import share from "@/components/share";
import cancelConfirmBottomNavBar from "@/components/cancelConfirmBottomNavBar";



Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path: '/',
            components:{
                appBar: appBar,
                navDrawer: navDrawer,
                pageContent: feed,
                bottomNavBar: bottomNavBar,
            },
            children:[
                {
                    path: '',
                    components:{
                        buttonLeft: hamburgerButton,
                    }
                }
            ],
            props:{
                appBar:{
                    title: "snAPP"
                }
            },
        },
        {
            path: '/camera',
            components: {
                appBar: appBar,
                pageContent: camera,
                bottomNavBar: bottomNavBar,
            },
            children:[
                {
                    path: '',
                    components: {
                        buttonLeft: backButton,
                    }
                }
            ],
            props:{
                appBar:{
                    title: "Camera"
                }
            },
        },
        {
            path: '/share',
            components:{
                appBar: appBar,
                pageContent: share,
                bottomNavBar: cancelConfirmBottomNavBar
            },
            children:[
                {
                    path: '',
                    components: {
                        buttonLeft: backButton,
                    }
                }
            ],
            props:{
                appBar:{
                    title: "Share"
                }
            },

        }
    ],
});

export default router;