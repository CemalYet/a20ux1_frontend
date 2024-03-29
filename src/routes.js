import Vue from "vue";
import VueRouter from 'vue-router';

import feed from '@/components/feed';
import share from "@/components/share";
import mapLayout from "./layouts/mapLayout"
import map from "@/components/map";
import defaultLayout from "./layouts/defaultLayout"
import profileContent from "@/components/profileContent";
import editProfileContent from "@/components/editProfileContent";
import postContent from "@/components/postContent";
import commentContent from "@/components/commentContent";
import friends from "@/components/friends";
import loginpage from "@/components/loginpage";
import registerpage from "@/components/registerpage";
import information from "@/components/information";
import snap from "@/components/snap";
import wiki from "@/components/wiki";
import settings from "@/components/settings";

const appBar = ()=> import('@/components/appBar');
const bottomNavBar = ()=> import('@/components/bottomNavBar');
const navDrawer = ()=> import('@/components/navDrawer');
const hamburgerButton = ()=> import('@/components/hamburgerButton');
const backButton = ()=> import('@/components/backButton');
const profileButton = ()=> import('@/components/profileButton');
const appBarPost = ()=> import('@/components/appBarPost');
const cancelButton = ()=> import('@/components/cancelButton');
const editProfileButton = ()=> import('@/components/editProfileButton');
const deleteButton = ()=> import('@/components/deleteButton');
const errorMessage = ()=> import('@/components/errorMessage');

/* tried adding this but performance decreased
const appBar = ()=> import('@/components/appBar');
const navDrawer = ()=> import('@/components/navDrawer');
const feed = ()=> import('@/components/feed');
const bottomNavBar = ()=> import('@/components/bottomNavBar');
const hamburgerButton = ()=> import('@/components/hamburgerButton');
const backButton = ()=> import('@/components/backButton');
const share = ()=> import('@/components/share');
const mapLayout = ()=> import('./layouts/mapLayout');
const map = ()=> import('@/components/map');
const defaultLayout = ()=> import('./layouts/defaultLayout');
const profileContent = ()=> import('@/components/profileContent');
const profileButton = ()=> import('@/components/profileButton');
const editProfileContent = ()=> import('@/components/editProfileContent');
const postContent = ()=> import('@/components/postContent');
const appBarPost = ()=> import('@/components/appBarPost');
const commentContent = ()=> import('@/components/commentContent');
const friends = ()=> import('@/components/friends');
const loginpage = ()=> import('@/components/loginpage');
const registerpage = ()=> import('@/components/registerpage');
const information = ()=> import('@/components/information');
const snap = ()=> import('@/components/snap');
const cancelButton = ()=> import('@/components/cancelButton');
const editProfileButton = ()=> import('@/components/editProfileButton');
const deleteButton = ()=> import('@/components/deleteButton');
const errorMessage = ()=> import('@/components/errorMessage');
const wiki = ()=> import('@/components/wiki');
const settings = ()=> import('@/components/settings');
 */

import store from './store.js';
import axios from 'axios';

import i18n from './i18n.js'
Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path: '/',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
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
                                buttonRight: profileButton
                            },

                        }
                    ],
                    props:{
                        appBar:{
                            title: "snAPP"
                        }
                    },
                }
            ],
        },
        {
            path: '/snap',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '/',
                    components: {
                        appBar: appBar,
                        pageContent: snap,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,

                            }
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.snap', store.getters.getLanguage)
                        }
                    },
                },
                {
                    path: '/information',
                    components: {
                        appBar: appBar,
                        pageContent: information,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,

                            }
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.snap', store.getters.getLanguage)
                        }
                    },
                },
            ],
        },
        {
            path: '/friends',
            components: {
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components: {
                        appBar: appBar,
                        pageContent: friends,
                        buttonLeft: backButton,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                            }
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.friends', store.getters.getLanguage)
                        }
                    },
                }
            ],
        },
        {
            path: '/share',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBar,
                        pageContent: share,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: cancelButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.share', store.getters.getLanguage)
                        }
                    },
                }
            ],
        },
        {
            path: '/wiki',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBar,
                        pageContent: wiki,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.wiki', store.getters.getLanguage)
                        }
                    },
                }
            ],
        },
        {
            path: '/settings',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBar,
                        pageContent: settings,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.settings', store.getters.getLanguage)
                        }
                    },
                }
            ],
        },
        {
            path: '/map',
            components: {
                layout: mapLayout,
            },
            children: [
                {
                    path: '',
                    components: {
                        map: map,
                    },
                    children:[
                        {
                            path:'',
                            components:{
                                backButton:backButton,
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/profile/:id',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBar,
                        pageContent: profileContent,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                                buttonRight: editProfileButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.profile', store.getters.getLanguage)
                        }
                    },
                },

                {
                    path: 'edit',
                    components: {
                        appBar: appBar,
                        pageContent: editProfileContent
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: i18n.t('titles.edit', store.getters.getLanguage)
                        }
                    },
                }
            ],
        },
        {
            path: '/post/:discovery_id',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBarPost,
                        pageContent: postContent,
                    },
                    children:[
                        {
                            path: '',
                            name: 'post',
                            components:{
                                buttonLeft: backButton,
                                buttonRight: deleteButton
                            }
                        }
                    ],
                },
                {
                    path: 'comments',
                    components: {
                        appBar: appBarPost,
                        pageContent: commentContent,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                                buttonRight: deleteButton
                            }
                        }
                    ],
                },
            ],
        },
        {
            path: '/login',
            components: {
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components: {
                        pageContent: loginpage
                    }
                }

            ]
        },
        {
            path: '/register',
            components: {
                layout: mapLayout
            },
            children:[
                {
                    path: '',
                    components: {
                        map: registerpage
                    }
                }

            ]
        },
        {
            path: '/error',
            components: {
                layout: mapLayout
            },
            children:[
                {
                    path:'',
                    components: {
                        map: errorMessage
                    }
                }
            ]

        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

///// TO CHECK IF USER IS LOGGED IN /////

router.beforeEach((to, from, next) => {

    //first check if userdata is 0. If it isn't no need to check any session data.
    if(store.getters.getLoggedInUserData.length === 0){
        //secondly check if the user is in the login or registration pages. No need check any data here.
        if (to.path !== '/login' && to.path !== '/register' && to.path !== '/error'){
            //check session data and wait for a response
            axios.get('/public/profile/getCurrentUserData').then(response => {
                //store the response data in the userdata state
                store.commit('updateLoggedInUserData', response["data"]);
                //if userdata state is still 0, redirect to /login
                if (store.getters.getLoggedInUserData.length === 0){
                    next({ path: '/login' })
                }
                else {
                    next();
                }
            }).catch(err =>{
                //if userdata from database fetching goes wrong, go to error page
                if(err.response){
                    next({path :'/error'})
                }
            })
        }
        else {
            next();
        }
    }
    else{
        next();
    }
})


export default router;