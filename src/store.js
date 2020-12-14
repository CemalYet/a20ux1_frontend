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
        user_id: null,


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
        discoveryImages: [],

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
        discoveryLikes: 0,
        discoveryComments: [],
        discoveryTags: [],
        discoveryPostData:[],
        discoveryPostPhotos:[ ],

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
        },

        updateDiscoveryPostData(state, value){
            state.discoveryPostData = value;
        },

        updateDiscoveryPostPhotos(state, value){
            state.discoveryPostPhotos = value;
        },
        updateDiscoveryComments(state, value){
            state.discoveryComments = value;
        },

        ///// COMMENTS /////
        appendNewComment(state, comment){
            let newComment = {
                "commentedByUserIdFk": state.loggedInUserData[0].userId,
                "avatar": state.loggedInUserData[0].avatar,
                "userName": state.loggedInUserData[0].userName,
                "comment": comment
            }
            state.discoveryComments.push(newComment);
        }
    },

    actions: {
        ///// USERDATA /////
        // user whose profile is being viewed
        fetchUserDataById(context, id){
            const userId = JSON.stringify({
                userId: id
            });

            let formData = new FormData()
            formData.append('data', userId)

            axios.post('/public/profile/getFetchedUserData', formData).then(response => {
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
            axios.get('/public/feedcontroller/getDiscoveries').then(response => {
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
            axios.post('/public/shareController/save', json,
                {
                    headers: {'Content-Type': 'application/json'}
                    // eslint-disable-next-line no-unused-vars
                }).then(response => {
                console.log(response['data'])
                router.push({path: `/post/${response['data'][0].discoveryId}`});
            }).catch(error => {
                if (error.response) {
                    context.commit('updateSnackbar', true);
                }
                });
        },

        uploadNewComment(context, comment){
            axios.post('/public/discovery/savecomment', comment).then(response => {
                context.commit('fetchComments', response["data"]);
            });
        },

        ///// MAP PAGE /////
        MapCenter(context) {
            navigator.geolocation.getCurrentPosition(position => {
                context.commit('updateMapCenter', position);
            });
        },
        discoveriesMe(context) {
            axios.get('/public/mapController/getMyDiscoveries', {params: {userId: context.getters.getLoggedInUserData[0].userId}}).then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },

        discoveriesFriends(context) {
            axios.get('/public/mapController/getFriendDiscoveries', {params: {userId: context.getters.getLoggedInUserData[0].userId}}).then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },

        discoveriesPopular(context) {
            axios.get('/public/mapController/getPopularDiscoveries').then(response => {
                context.commit("updateMapMarkers", response["data"])
            });
        },
        searchDiscoveries(context) {
            axios.get('/public/mapController/searching', {params: {data: context.getters.getSearchField}}).then(response => {
                context.commit("updateSearchResults", response["data"])
                context.commit("updateMapMarkers", response["data"])
            });
        },
        getPictures(context) {
            axios.get('/public/mapController/getDiscoveryPhotos', {params: {data: context.getters.getDiscoveryId}}).then(response => {
                context.commit("updateDiscoveryPhotos", response["data"])
            });
        },
        ///// Post Content PAGE /////
        getTaggedFriends(context, discoveryId){
            axios.get('/public/discovery/getTags', {params: {data: discoveryId}}).then(response => {
                context.commit('updateTaggedFriendsData', response["data"])
                })
        },
        fetchDiscoveryBasedOnId(context, discoveryId){
            axios.get('/public/discovery/getdiscoinfo', {params: {data: discoveryId}}).then(response => {
                context.commit('updateDiscoveryPostData', response["data"])
            })
        },
        fetchDiscoveryPostPhotosOnId(context, discoveryId){
            axios.get('/public/mapController/getDiscoveryPhotos', {params: {data: discoveryId}}).then(response => {
                context.commit("updateDiscoveryPostPhotos", response["data"])
            });
        },
        fetchComments(context, discoveryId){
            axios.get('/public/discovery/getComments', {params: {data: discoveryId}}).then(response => {
                context.commit("updateDiscoveryComments", response["data"])
            });
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

        ///// PROFILE /////
        getUserId(state){
            return state.user_id;
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
            return state.taggedFriendsData;
        },
        getDiscoveryPostData(state){
            return state.discoveryPostData;
        },
        getDiscoveryPostPhotos(state){
            return state.discoveryPostPhotos;
        },
    }
})

export default store;