import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        //data
        drawer: false,
        notifications: 2,
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
        drawerFalse(state){
            state.drawer = false;
        },
        updateUserData(state, userData){
            state.userData = userData;
        }
    },

    actions:{
        //functions you call from components
        fetchUserData(context){
            axios.get('/public/feedcontroller/getUserData').then(response => {
                context.commit('updateUserData', response["data"].userData)
            })
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
        getUserDate(state){
            return state.userData;
        },
        getDiscoveries(state){
            return state.discoveries;
        }
    }
})

export default store;