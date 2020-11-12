import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        //data
        drawer: false,
        group: null,
        notifications: 2,
        userData: [
            {
                avatar: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598',
                emailAddress: 'marnix.lijnen@student.kuleuven.be',
                userName: 'Marnix Lijnen'
            }
        ],
    },

    mutations:{
        //change data
        toggleDrawer(state){
            state.drawer = !state.drawer;
        },
        drawerFalse(state){
            state.drawer = false;
        }
    },

    actions:{
        //functions you call from components
    },

    getters:{
        //to get state data
        getDrawerState(state){
            return state.drawer;
        },
        getNotifications(state){
            return state.notifications;
        },
        getUserDate(state){
            return state.userData;
        }
    }
})

export default store;