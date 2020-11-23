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
import mapLayout from "./layouts/mapLayout"
import map from "@/components/map";
import defaultLayout from "./layouts/defaultLayout"
import profileContent from "@/components/profileContent";
import profileButton from "@/components/profileButton";
import dropdownOptionsMenu from "@/components/dropdownOptionsMenu";
import editProfileContent from "@/components/editProfileContent";
import postContent from "@/components/postContent";
import appBarPost from "@/components/appBarPost";
import commentContent from "@/components/commentContent";
import sharePostContent from "@/components/sharePostContent";
import dropDownMenuED from "@/components/dropDownMenuED";



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
            path: '/camera',
            components:{
                layout: defaultLayout,
            },
            children:[
                {
                    path: '',
                    components:{
                        appBar: appBar,
                        pageContent: camera,
                        bottomNavBar: bottomNavBar,
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
                            title: "Camera"
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
                        bottomNavBar: cancelConfirmBottomNavBar
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
            path: '/profile',
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
                                buttonRight: dropdownOptionsMenu
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
                                buttonRight: dropdownOptionsMenu
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
            ],
        },
    ],
});

export default router;