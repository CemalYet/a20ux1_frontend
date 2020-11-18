<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1"
    >

      <!--Back button-->
      <v-app-bar-nav-icon @click="profile()">
        <i class="fa fa-arrow-left fa-2x" style="color:#000000;" aria-hidden="true"></i>
      </v-app-bar-nav-icon>

      <!-- Page title -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Edit Profile</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>
    
    <!--Page-->
    <v-main id="main">
      <v-container>
        <div class="content">

          <!--Update profile Tab-->
          <div v-if="tab == 'update'" class="tabs">
            <!--User Avatar-->
            <image-input class="avatar" @input="changeAvatar($event)">
              <div slot="activator">
                <v-avatar size="200px" v-ripple >
                  <img :src="userData.avatar">
                </v-avatar>
              </div>
            </image-input>
            
            <form @submit.prevent="updateProfile()" class="settingsForm">
              <div class="field" >
                <label>Username</label>
                <input type="text" name="username" v-model="username">
              </div>

              <div class="field" >
                <label>Email</label>
                <input type="email" name="email" v-model="email" v-validate="'required|email'">
              </div>

              <button type="submit" class="submitButton">Update Profile</button>
              <button type="button" @click="tab = 'password', output = ''" class="submitButton">Change Password</button>
            </form>
          </div>

          <!--Update Password Tab-->
          <div v-if="tab == 'password'" class="tabs">
            <form @submit.prevent="changePassword()" class="settingsForm">
              <div class="field" >
                <label>Current Password</label>
                <input type="password" name="password" v-model="password" data-vv-as="current password" v-validate="'required'">
              </div>

              <div class="field" >
                <label>New Password</label>
                <input type="password" name="newPassword" v-model="newPassword" data-vv-as="new password" v-validate="'required'">
              </div>

              <div class="field" >
                <label>Confirm New Password</label>
                <input type="password" name="confirmPassword" v-model="confirmPassword" data-vv-as="confirm password" v-validate="'required|confirmed:newPassword'">
              </div>

              <button type="submit" class="submitButton">Update Password</button>

              <button type="button" @click="tab = 'update', output = ''" class="submitButton" :loading="saving">Go Back</button>
            </form>
          </div>

          <!-- Error dialog displays any potential error messages -->
          <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
              <v-card-text class="subheading">{{errorText}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="errorDialog = false" text>Got it!</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ImageInput from '../../components/ImageInput';
import axios from 'axios'
export default {
  name: 'App',

  components: {
    ImageInput: ImageInput
  },

  data: () => ({
    userData: null,
    username: "",
    email: "",
    password: '',
    newPassword: '',
    confirmPassword: '',
    errorDialog: null,
    errorText: '',
    saving: false,
    saved: false,
    tab: 'update'
  }),

  mounted() {
    axios.get('/public/profile/getUserData').then(response => (this.userData = response["data"]))
    this.initForm()
  },

  methods: {
    fetchUserData()
    {
      return axios.get('/public/profile/getUserData').then(response => response["data"])
    },

    initForm(){
      this.fetchUserData().then((res) => {
        this.username = res.userName
        this.email =  res.emailAddress
      })
    },

    profile() {
      window.location.href = '/public/profile';
    },

    changeAvatar(array){
      this.userData.avatar = array
    },

    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },

    savedAvatar() {
      this.saving = false
      this.saved = true
    },
    
    updateProfile(){
      this.userData.userName = this.username
      this.userData.emailAddress = this.email

      let currentObj = this;

      let rawData = JSON.stringify(this.userData)
      let formData = new FormData()
      formData.append('data', rawData)

      this.errorDialog = true

      axios.post('/public/profile/updateProfile', formData).then(function (response) {currentObj.errorText = response.data;}).catch(function (error) {
         currentObj.errorText = error;
      });

    },

    changePassword(){
    let currentObj = this;

    if (this.newPassword != this.confirmPassword){
      this.errorDialog = true
      this.errorText = 'New password and confirmed password don\'t match!'
    }
    else{
      let tmpData = {password: this.password, newPassword: this.newPassword}
    
      let rawData = JSON.stringify(tmpData)
      console.log(tmpData)
      let formData = new FormData()
      formData.append('data', rawData)
      
      this.errorDialog = true

      axios.post('/public/profile/updatePassword', formData).then(function (response) {currentObj.errorText = response.data;}).catch(function (error) {
          currentObj.errorText =  error;
        });
    }
    }
  }
};
</script>

<style>
@import '../styles.css';
#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
}

.content{
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tabs{
  margin: 1rem 0 1rem 0;
}

.avatar{
  text-align: center;
  margin-bottom: 1rem;
}

.settingsForm {
  margin: auto;
  /* align-content: center;
  align-items: center; */
  justify-content: center;
}

.field {
  display: block;
  margin-bottom: 1rem;
  /* margin-left: auto;
  margin-right: auto;
  padding: 20px 50px 10px 10px;
  border-bottom: 3px solid white;
  width: 150px; */
}

label{
  display: block;
}

input {
  background-color: transparent;
  border: 0.05rem solid black;
  border-radius: 0.35rem;
  color: black;
  outline: none;
}

.submitButton{
  display: block;
  background: #00251A;
  color: white;
  border-radius: 20px;  
  width: 100%;
  margin: 1.5rem 0 1.5rem 0;
  outline: none;
}

</style>