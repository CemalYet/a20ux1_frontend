<template>
  <v-container>
    <div class="content">

      <!--Update profile Tab-->
      <div v-if="tab == 'update'" class="tabs">
        <!--User Avatar-->
        <image-input class="avatar" @input="changeAvatar($event)">
          <div slot="activator">
            <v-avatar size="200px" v-ripple >
              <img :src="$store.getters.getUserData[0].avatar">
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
</template>

<script>
import axios from "axios";

export default {
  name: "editProfileContent",

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
    this.initForm()
  },

  methods:{
    initForm() {
      this.username = this.$store.getters.getUserData[0].userName
      this.email = this.$store.getters.getUserData[0].emailAddress
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
}
</script>

<style scoped>

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