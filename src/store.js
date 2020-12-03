import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./routes";

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        ///// USERDATA /////
        loggedInUserData: [],

        //?????
        userdata: {
            emailAddress: null,
            userId: null,
            userName: null,
            avatar: null,
        },

        //navbar
        drawer: false,

        ///// FEED /////
        discoveries: [],

        ///// PROFILE /////
        fetchedUserData: [],


        ///// SHARE DISCOVERY /////
        title: null,
        timestamp: null,
        current_date: null,
        location: null,
        chosen_leaf: null,
        description: null,
        latitude: null,
        longitude:null,
        snackbar: false,
        snackbar_message: null,
        discoveryImages: [
        ],

        // MAP PAGE /////
        map_center: {lat: 50.87959, lng: 4.70093}, //Leuven default value
        map_markers: null,
        chosen_marker: null,
        marker_discovery_overlay: false,
        search_results: null,
        search_field: null,
        discovery_photos: null,
        discovery_id: null,

        /// INFORMATION PAGE ///
        info_cards: [
            {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
            {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
            {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
            {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null}
        ],

        card_id: null,



        ///// DISCOVERY POST /////
        deleteDialog: false,
        discoveryLikes: null,
        discoveryComments: [
            {   userId:16,
                userName: "Seppe Fleerackers",
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
                comment: 'waaaaaw mooi isjfko pksjdfoihj oipsjfoipsjdfiopjsh sodjfosijfoi asfddsf sdf sdf sd f'
            },
            {   userId:12,
                userName: "Juliana Buzanello",
                avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/64679357_2322740734614282_6203291312234430464_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=PitKaogm5B8AX8yIcyY&_nc_ht=scontent-bru2-1.xx&oh=479eea55195404be5f5296a91c782c10&oe=5FC9BBE7",
                comment: "trekt op niks. leluk."
            }

        ],
        discoveryTags: [
            {
                userName: 'Jefke',
            },
            {
                userName: 'jannis',
            },
            {
                userName: 'Jonas',
            },
            {
                userName: 'Jantje',
            }
        ],
        discoveryExtraInfo:{
            description:'Dit is een of andere vage uitleg om te testen of die vage uitleg daar ook effectief komt te staan aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            plantName: 'plant 1'
        },

        ///// FRIENDS /////
        friendsData: [],
        friendRequests:[],
        friendRequestNotifications: 0,

        /////TAGGED FRIENDS////
        taggedFriendsData:[],

        //templates
    },

    mutations: {
        //change data
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        updateDrawer(state, value) {
            state.drawer = value;
        },
        updateUserdata(state, userdata) {
            state.userdata.userId = userdata.userId;
            state.userdata.userName = userdata.userName;
            state.userdata.avatar = userdata.avatar;
            state.userdata.emailAddress = userdata.emailAddress;
        },
        updateLoggedInUserData(state, userData) {
            state.loggedInUserData = userData;
            // alert(JSON.stringify(this.getters.getLoggedInUserData[0].userId))
        },
        updateUserEmail(state, email) {
            state.userdata.emailAddress = email
        },
        updateUserAvatar(state, avatar){
            state.userdata[0].avatar = avatar
        },
        updateFetchedUserData(state, fetchedUserData){
            state.fetchedUserData = fetchedUserData;
            // console.log(JSON.stringify(this.getters.getFetchedUserData.userId))
        },

        ///// FEED /////

        updateDiscoveries(state, discoveries){
            state.discoveries = discoveries;
        },

        ///// FRIENDS /////
        updateFriendsData(state, friendsData) {
            state.friendsData = friendsData;
        },
        removeFriend(state, friend){
            state.friendsData = state.friendsData.filter(fr => {return fr.userId !== friend.userId})
        },
        updateFriendRequests(state, requestData){
            state.friendRequests = requestData;
        },
        acceptFriendRequest(state, request){
            state.friendsData.push(request);
        },
        deleteFriendRequest(state, request) {
            state.friendRequests.splice(state.friendRequests.indexOf(request), 1);
        },
        updateFriendRequestNotifications(state, value){
            if (value.length !== 0){
                state.friendRequestNotifications = parseInt(value[0].amountOfFriendRequests);

            } else {
                state.friendRequestNotifications = 0
            }
        },


        ///// SHARE DISCOVERY /////
        updateSnackbar(state, value) {
            state.snackbar = value;
        },
        updateSnackbarMessage(state, message){
            state.snackbar_message = message;
        },

        updateChosen_leaf(state, value) {
            state.chosen_leaf = value;
        },
        updateTitle(state, value) {
            state.title = value;
        },
        updateTimestamp(state, value) {
            state.timestamp = value;
        },
        updateCurrent_date(state, value) {
            state.current_date = value;
        },
        updateLocation(state, value) {
            state.location = value;
        },
        updateDiscription(state, value) {
            state.description = value;
        },
        updateLongitude(state, value) {
            state.longitude = value;
        },
        updateLatitude(state, value) {
            state.latitude = value;
        },

        pushNewDiscoveryImage(state, value){
            state.discoveryImages.unshift(value);
        },
        deleteDiscoveryImage(state, image){
            state.discoveryImages.splice(state.discoveryImages.indexOf(image),1);
        },

        ///// MAP PAGE /////
        updateMapCenter(state, value) {
            state.map_center.lat = value.coords.latitude;
            state.map_center.lng = value.coords.longitude;
        },
        updateDiscoCenter(state, value) {
            state.map_center.lat = parseFloat(value.Latitude);
            state.map_center.lng = parseFloat(value.Longitude);
        },
        updateMapMarkers(state, value) {
            state.map_markers = value;
        },
        updateSelectedMarker(state, value) {
            state.chosen_marker = value;
        },
        updateMarkerDiscoveryOverlay(state, value) {
            state.marker_discovery_overlay = value;
        },
        updateSearchResults(state, value) {
            state.search_results = value;
        },
        updateSearchField(state, value) {
            state.search_field = value;
        },
        updateDiscoveryPhotos(state, value) {
            state.discovery_photos = value;
        },
        updateDiscoveryId(state, value) {
            state.discovery_id = value;
        },

        /// INFORMATION PAGE ///
        updateInformationCards(state, value) {
            state.info_cards = value;
        },
        updateDiscoveryImages(state, value) {
            state.discoveryImages[0] = {photoPath: value};
        },
        updateCardId(state, value) {
            state.card_id = value;
        },

        ///// DISCOVERY POST /////
        updateDeleteDialog(state, value) {
            state.deleteDialog = value;
        },

        ///// POST CONTENT /////
        updateTaggedFriendsData(state,taggedFriendsData){
            state.taggedFriendsData = taggedFriendsData;
        }
    },

    actions: {
        ///// USERDATA /////
        // user whose profile is being viewed
        fetchUserDataById(context, id){
            axios.post('/public/profile/getFetchedUserData', id).then(response => {
                context.commit('updateFetchedUserData', response["data"])
            })
        },

        // current user's data
        fetchLoggedInUserData(context){
            axios.get('/public/profile/getCurrentUserData').then(response => {
                context.commit('updateLoggedInUserData', response["data"]);
            })
        },

        uploadLoggedInUserData(context, updatedUserData){
            context.commit('updateLoggedInUserData', updatedUserData);
        },


        logOut(context){
            // eslint-disable-next-line no-unused-vars
            axios.get('/public/login/logout').then(response => {
                context.commit('updateLoggedInUserData', []);
            })
        },

        ///// FEED /////
        fetchFriendsDiscoveries(context){
            axios.get('/public/feedcontroller/getdiscoveries').then(response => {
                context.commit('updateDiscoveries', response["data"]);
            })
        },


        ///// FRIENDS /////
        fetchFriends(context) {
            axios.get('/public/friends/getFriends').then(response => {
                context.commit('updateFriendsData', response["data"])
            })
        },

        fetchFriendRequests(context){
            axios.get('/public/friends/getFriendRequest').then(response => (context.commit('updateFriendRequests', response["data"])))
        },
        /*
        uploadLoggedInUserData(context, updatedUserData) {
            context.commit('updateLoggedInUserData', updatedUserData);
        },
        */

        fetchFriendRequestNotifications(context){
            //axios post to request the amount of notifications from backend. Pass the userId of logged in user via the session in backend. writer trigger in database
            axios.get('/public/friends/getFriendRequestNotifications').then(response => (context.commit('updateFriendRequestNotifications', response["data"])))
        },


        ///// SHARE DISCOVERY /////
        sharePost(context, taggedFriendsId){
            const json = JSON.stringify({
                my_title: context.getters.getTitle,
                my_time: context.getters.getTimestamp,
                my_date: context.getters.getCurrent_date,
                my_location: context.getters.getLocation,
                my_description: context.getters.getDescription,
                my_leaf: context.getters.getChosen_leaf,
                my_latitude: context.getters.getLatitude,
                my_longitude: context.getters.getLongitude,
                my_taggedFriends: taggedFriendsId,
                images: context.getters.getDiscoveryImages,
            });

            axios.post('/public/sharecontroller/save', json,
                {
                    headers: {'Content-Type': 'application/json'}
                }).catch(error => {
                if (error.response) {
                    context.commit('updateSnackbar', true);
                }
                else {
                    //doesn't wannaaa wooorrkkkk
                    console.log('test test')
                    router.push({path: '/'});
                }
                });
        },

        ///// MAP PAGE /////
        MapCenter(context) {
            navigator.geolocation.getCurrentPosition(position => {
                context.commit('updateMapCenter', position);
            });
        },
        discoveriesMe(context) {
            axios.get('/public/mapcontroller/getMyDiscoveries').then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },

        discoveriesFriends(context) {
            axios.get('/public/mapcontroller/getFriendDiscoveries').then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },

        discoveriesPopular(context) {
            axios.get('/public/mapcontroller/getPopularDiscoveries').then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },
        searchDiscoveries(context) {
            axios.get('/public/mapcontroller/searching', {params: {data: context.getters.getSearchField}}).then(response => {
                context.commit("updateSearchResults", response["data"])
                context.commit("updateMapMarkers", response["data"])
            });
        },
        getPictures(context) {
            axios.get('/public/mapcontroller/getDiscoveryPhotos', {params: {data: context.getters.getDiscoveryId}}).then(response => {
                context.commit("updateDiscoveryPhotos", response["data"])
            });
        },
        ///// Post Content PAGE /////
        getTaggedFriends(context){
            axios.get('/public/discovery/getTags').then(response => {
                context.commit('updateTaggedFriendsData', response["data"])
                })

        }
    },

    getters: {
        //to get state data
        getDrawerState(state) {
            return state.drawer;
        },
        getNotifications(state) {
            return state.notifications;
        },
        getLoggedInUserData(state) {
            return state.loggedInUserData;
        },
        getFetchedUserData(state){
            return state.fetchedUserData;
        },
        getDiscoveries(state){
            return state.discoveries;
        },

        ///// SHARE POST /////
        getTitle(state) {
            return state.title;
        },
        getChosen_leaf(state) {
            return state.chosen_leaf;
        },
        getSnackbar(state) {
            return state.snackbar;
        },
        getSnackbarMessage(state){
            return state.snackbar_message;
        },
        getTimestamp(state) {
            return state.timestamp;
        },
        getCurrent_date(state) {
            return state.current_date;
        },
        getLatitude(state) {
            return state.latitude;
        },
        getLongitude(state) {
            return state.longitude;
        },
        getLocation(state) {
            return state.location;
        },
        getDescription(state) {
            return state.description;
        },
        getDiscoveryImages(state){
            return state.discoveryImages;
        },

        ///// MAP PAGE /////
        getMapCenter(state) {
            return state.map_center;
        },

        getMapMarkers(state) {
            return state.map_markers;
        },

        getSelectedMarker(state) {
            return state.chosen_marker;
        },

        getMarkerDiscoveryOverlay(state) {
            return state.marker_discovery_overlay;
        },
        getSearchResults(state) {
            return state.search_results;
        },
        getSearchField(state) {
            return state.search_field;
        },
        getDiscoveryPhotos(state) {
            return state.discovery_photos;
        },
        getDiscoveryId(state) {
            return state.discovery_id;
        },

        /// INFORMATION PAGE ///
        getInformationCards(state) {
            return state.info_cards;
        },
        getCardId(state) {
            return state.card_id;
        },


        ///// DISCOVERY POST /////
        getDiscoveryBasedOnId: (state) => (discoveryId) => {
            for (let i = 0; i < state.discoveries.length; i++) {
                if (discoveryId === state.discoveries[i].discoveryId) {
                    return state.discoveries[i];
                }
            }
            //if not found, search the database for the disco
            return state.discoveries[0];
        },
        getDiscoveryExtraInfo(state) {
            return state.discoveryExtraInfo;
        },
        getLikes(state) {
            return state.discoveryLikes;
        },
        getComments(state) {
            return state.discoveryComments;
        },
        getTags(state) {
            return state.discoveryTags;
        },
        getDeleteDialog(state) {
            return state.deleteDialog;
        },

        ///// FRIENDS /////
        getFriendsData(state) {
            return state.friendsData;
        },
        getFriendsRequests(state) {
            return state.friendRequests;
        },
        getFriendRequestNotifications(state){
            return state.friendRequestNotifications;
        },

        /// INFORMATION PAGE//
        //MERGE PROBLEM: renamed to getFirstDiscoveryImage
        getFirstDiscoveryImage(state){
            return state.discoveryImages[0];
        },

        //// POST CONTENT ///
        getTaggedFriends(state){
            return state.taggedFriendsData
        }
    }
})

export default store;