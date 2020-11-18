import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        //data

        //navbar
        drawer: false,

        //notifications
        notifications: 2,

        //share data
        title: null,
        timestamp: null,
        current_date: null,
        location: null,
        chosen_leaf: null,
        description: null,
        latitude: null,
        longitude:null,
        snackbar: false,

        // Map screen
        map_center: {lat: 50.87959, lng: 4.70093}, //Leuven default value
        map_markers: null,
        chosen_marker: null,
        marker_discovery_overlay: false,

        //templates
        userData: [
            {
                avatar: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598',
                emailAddress: 'marnix.lijnen@student.kuleuven.be',
                userName: 'Marnix Lijnen'
            }
        ],
        discoveries: [
            {
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
                photoPath: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
                leafId: '0',
                userName: "Seppe Fleerackers",
                takenDate: "Yesterday 11:43",
                title: "Mushroom I spotted this morning!"
            },
            {
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598",
                photoPath: "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
                leafId: '1',
                userName: "Marnix Lijnen",
                takenDate: "Yesterday 12:43",
                title: "Walking with the boys"
            },
            {
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/71499627_2643828155667264_8670036088552685568_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=7JZcQkduNz4AX9epCIn&_nc_ht=scontent-bru2-1.xx&oh=77a9c3c4a11f0ad0f86c78288349ccad&oe=5FCA7F28",
                photoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg/1200px-Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg",
                leafId: '2',
                userName: "Helena Majoor",
                takenDate: "Yesterday 12:43",
                title: "Walking with the girls dit is een veel te lange tekst"
            },
            {
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/64679357_2322740734614282_6203291312234430464_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=PitKaogm5B8AX8yIcyY&_nc_ht=scontent-bru2-1.xx&oh=479eea55195404be5f5296a91c782c10&oe=5FC9BBE7",
                photoPath: "https://theday.co.uk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWswT1RNM05XUXpNaTB6WWprekxUUTRPR010T0RJeE5TMDJNREZpTURnMFpUTm1OREFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--cd717cd0a3f3db326a7f2808b1db0a281e27cc73/-images-stories-2019-2019-09-2019-09-19_sunflowers.jpg",
                leafId: '3',
                userName: "Juliana Buzanello",
                takenDate: "2/10 at 12:15",
                title: "Morning hike"
            },
            {
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/119704647_3219531741455823_89414004719577010_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=SO6L9J8aGewAX9HxnoD&_nc_ht=scontent-bru2-1.xx&oh=41547f9a45d4a328835c7e7c62113949&oe=5FCB52C6",
                photoPath: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg",
                leafId: '4',
                userName: "Benno Debals",
                takenDate: "2/10 at 12:15",
                title: "Walking with Juliana"
            },
            {
                avatar: "https://0.academia-photos.com/138336188/39712439/32771085/s200_cemal.yeti_mi_.jpg",
                photoPath: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2015/07/VAN-LAKE-2-940x627.jpg",
                leafId: '3',
                userName: "Cemal Yetismis",
                takenDate: "9/8 at 15:20",
                title: "Discovering Turkish nature"
            },

        ],
    },

    mutations:{
        //change data
        toggleDrawer(state){
            state.drawer = !state.drawer;
        },
        updateDrawer(state, value){
            state.drawer = value;
        },
        updateUserData(state, userData){
            state.userData = userData;
        },
        updateUserAvatar(state, avatar){
            state.userData[0].avatar = avatar
        },

        //share data
        updateSnackbar(state, value){
            state.snackbar = value;
        },
        updateChosen_leaf(state, value){
            state.chosen_leaf = value;
        },
        updateTitle(state, value){
            state.title = value;
        },
        updateTimestamp(state, value){
            state.timestamp = value;
        },
        updateCurrent_date(state, value){
            state.current_date = value;
        },
        updateLocation(state, value){
            state.location = value;
        },
        updateDiscription(state, value){
            state.description = value;
        },
        updateLongitude(state, value){
            state.longitude = value;
        },
        updateLatitude(state, value){
            state.latitude = value;
        },

        // Map screen
        updateMapCenter(state,value){
            state.map_center.lat=value.coords.latitude;
            state.map_center.lng=value.coords.longitude;
        },
        updateMapMarkers(state, value){
            state.map_markers = value;
        },
        updateSelectedMarker(state, value){
            state.chosen_marker = value;
        },
        updateMarkerDiscoveryOverlay(state,value){
            state.marker_discovery_overlay = value;
        }
    },

    actions:{
        //functions you call from components
        fetchUserData(context){
            axios.get('/public/feedcontroller/getUserData').then(response => {
                context.commit('updateUserData', response["data"].userData)
            })
        },

        uploadUserData(context, updatedUserData){
            context.commit('updateUserData', updatedUserData);

        },

        //share data
        sharePost(context){
            const json = JSON.stringify({
                my_title: context.getters.getTitle,
                my_time: context.getters.getTimestamp,
                my_date: context.getters.getCurrent_date,
                my_location: context.getters.getLocation,
                my_description: context.getters.getDescription,
                my_leaf: context.getters.getChosen_leaf,
                my_latitude: context.getters.getLatitude,
                my_longitude: context.getters.getLongitude,
            });
            const res = axios.post('/public/sharecontroller/save', json,
                {
                    headers: {'Content-Type': 'application/json'}
                });
            console.log(res)
            console.log(json)
        },

        // Map screen
        MapCenter (context) {
            navigator.geolocation.getCurrentPosition(position => {
                context.commit('updateMapCenter', position);
            });
        },
        discoveriesMe(context){
            //make axios statement here

            const markers =
                [
                    {
                        position: {
                            lat: 51.3167,
                            lng: 4.9833
                        },
                        id: 2,
                        images: [
                            "http://lorempixel.com/200/200/nature/",
                            "http://lorempixel.com/200/200/nature/",
                            "http://lorempixel.com/200/200/nature/",
                        ],
                    },
                ];

            context.commit("updateMapMarkers", markers);
        },

        discoveriesFriends(context){
            //make axios statement here

            const markers = [
                {
                    position: {
                        lat: 51.32254,
                        lng: 4.94471
                    },
                    id: 1,
                    images: [
                        "http://lorempixel.com/200/200/nature/",
                        "http://lorempixel.com/200/200/nature/",
                        "http://lorempixel.com/200/200/nature/",
                    ],
                },
                {
                    position: {
                        lat: 51.3567,
                        lng: 4.9783
                    },
                    id: 3,
                    images: [
                        "http://lorempixel.com/200/200/nature/",
                        "http://lorempixel.com/200/200/nature/",
                        "http://lorempixel.com/200/200/nature/",
                    ],
                },
            ];

            context.commit('updateMapMarkers', markers);
        },

        discoveriesPopular(context){
            const markers =
                [
                    {
                        position: {
                            lat: 51.32254,
                            lng: 4.94471
                        },
                        id: 1,
                        images: [
                            "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
                            "http://lorempixel.com/200/200/nature/",
                            "http://lorempixel.com/200/200/nature/",
                        ],
                    },
                    {
                        position: {
                            lat: 51.3167,
                            lng: 4.9833
                        },
                        id: 2,
                        images: [
                            "http://lorempixel.com/200/200/nature/",
                            "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
                            "http://lorempixel.com/200/200/nature/",
                        ],
                    },
                    {
                        position: {
                            lat: 51.3567,
                            lng: 4.9783
                        },
                        id: 3,
                        images: [
                            "http://lorempixel.com/200/200/nature/",
                            "http://lorempixel.com/200/200/nature/",
                            "http://lorempixel.com/200/200/nature/",
                        ],
                    },
                ];

            context.commit('updateMapMarkers', markers);
        }

    },

    getters:{
        //to get state data
        getDrawerState(state){
            return state.drawer;
        },
        getNotifications(state){
            return state.notifications;
        },
        getUserData(state){
            return state.userData;
        },
        getDiscoveries(state){
            return state.discoveries;
        },

        //share data
        getTitle(state){
            return state.title;
        },
        getChosen_leaf(state){
            return state.chosen_leaf;
        },
        getSnackbar(state){
            return state.snackbar;
        },
        getTimestamp(state){
            return state.timestamp;
        },
        getCurrent_date(state){
            return state.current_date;
        },
        getLatitude(state){
            return state.latitude;
        },
        getLongitude(state){
            return state.longitude;
        },
        getLocation(state){
            return state.location;
        },
        getDescription(state){
            return state.description;
        },

        // Map screen
        getMapCenter(state){
            return state.map_center;
        },

        getMapMarkers(state){
            return state.map_markers;
        },

        getSelectedMarker(state){
            return state.chosen_marker;
        },

        getMarkerDiscoveryOverlay(state){
            return state.marker_discovery_overlay;
        }
    }
})

export default store;