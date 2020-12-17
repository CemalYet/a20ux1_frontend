import Vue from "vue";
import VueRouter from 'vue-router';
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";
import feed from "@/components/feed";
import bottomNavBar from "@/components/bottomNavBar";
import hamburgerButton from "@/components/hamburgerButton";
import backButton from "@/components/backButton";
import share from "@/components/share";
import mapLayout from "./layouts/mapLayout"
import map from "@/components/map";
import defaultLayout from "./layouts/defaultLayout"
import profileContent from "@/components/profileContent";
import profileButton from "@/components/profileButton";
import editProfileContent from "@/components/editProfileContent";
import postContent from "@/components/postContent";
import appBarPost from "@/components/appBarPost";
import commentContent from "@/components/commentContent";
import sharePostContent from "@/components/sharePostContent";
import dropDownMenuED from "@/components/dropDownMenuED";
import friends from "@/components/friends";
import loginpage from "@/components/loginpage";
import registerpage from "@/components/registerpage";
import information from "@/components/information";
import snap from "@/components/snap";

import store from './store.js';
import axios from 'axios';
import editProfileButton from "@/components/editProfileButton";
import logoutButton from "@/components/logoutButton";
import wiki from "@/components/wiki";
import settings from "@/components/settings";


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
                            title: "New snAPP"
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
                            title: "New snAPP"
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
                            title: "Friends"
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
                                buttonLeft: backButton,
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: "Share"
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
                            title: "Wiki"
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
                            title: "Settings"
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
                                buttonNextToRight: logoutButton
                            },
                        }
                    ],
                    props:{
                        appBar:{
                            title: "Profile"
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
                            title: "Edit profile"
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
                            components:{
                                buttonLeft: backButton,
                                buttonRight: dropDownMenuED
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
                                buttonRight: dropDownMenuED
                            }
                        }
                    ],
                },
                {
                    path: 'share',
                    components: {
                        appBar: appBarPost,
                        pageContent: sharePostContent,
                    },
                    children:[
                        {
                            path: '',
                            components:{
                                buttonLeft: backButton,
                                buttonRight: dropDownMenuED

                            }
                        }
                    ],
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
                            title: "New snAPP"
                        }
                    },
                },
                {
                    path: '/snap',
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
                            title: "New snAPP"
                        }
                    },
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
        if (to.path !== '/login' && to.path !== '/register'){
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