<template>
  <v-container>
    <br>
    <div class="content">

      <image-input class="avatar" @input="changeAvatar($event)">
        <div slot="activator">
          <v-avatar size="200px" v-ripple >
            <v-img :src="updatedUserData[0].avatar"></v-img>
          </v-avatar>
        </div>
      </image-input>

      <v-form v-model="valid" v-if="!changePassword">
        <v-container>
          <v-text-field
              v-model="updatedUserData[0].userName"
              :rules="nameRules"
              label="username"
              :counter=25
              required
          ></v-text-field>
          <v-text-field
              width="300px"
              v-model="updatedUserData[0].emailAddress"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>
          <v-btn
              width="250px"
              rounded
              color=var(--dark-color)
              class="white--text"
              @click.native="updateProfile"
          >
            Update profile
          </v-btn>
        </v-container>
      </v-form>
      <v-form v-model="valid" v-if="changePassword">
        <v-container>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword1 = !showPassword1"
              :type="showPassword1 ? 'text' : 'password'"
              label="Current password"
              required
          ></v-text-field>
          <v-text-field
              v-model="newPassword"
              :rules="passwordRules"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword2 = !showPassword2"
              :type="showPassword2 ? 'text' : 'password'"
              label="New password"
              required
          ></v-text-field>
          <v-text-field
              v-model="confirmPassword"
              :rules="passwordRules"
              :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword3 = !showPassword3"
              :type="showPassword3 ? 'text' : 'password'"
              label="Repeat new password"
              required
          ></v-text-field>
          <v-btn
              width="250px"
              rounded
              color=var(--dark-color)
              class="white--text"
              @click.native="updatePassword"
          >
            Update password
          </v-btn>
        </v-container>
      </v-form>
      <v-btn
          v-if="!changePassword"
          width="200px"
          rounded
          color=var(--dark-color)
          class="white--text"
          @click.native="toggleChangePassword"
      >
        Change password
      </v-btn>
      <v-btn
          v-if="changePassword"
          width="200px"
          rounded
          color=var(--dark-color)
          class="white--text"
          @click.native="toggleChangePassword"
      >
        Go back
      </v-btn>

      <!-- Error dialog displays any potential error messages -->
      <v-dialog v-model="this.errorDialog" max-width="300">
        <v-card>
          <v-card-text class="subheading">{{this.errorText}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="toggleDialog()" text>Got it!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import ImageInput from "@/components/ImageInput";

export default {
  name: "editProfileContent",

  components:{
    ImageInput
  },

  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 25 || 'Name must be less than 25 characters',
  ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
      v => v.length <= 45 || 'Email must be less than 45 characters',
    ],
    passwordRules: [
      v => !!v || 'Field required',
      v => v.length >= 6 || 'Must be longer than 6 characters',
    ],

    showPassword1:false,
    showPassword2:false,
    showPassword3:false,

    changePassword:false,

    password: '',
    newPassword: '',
    confirmPassword: '',

    errorDialog: false,
    errorText:'',

    saving: false,
    saved: false,
    tab: 'update'
  }),

  computed:{
    updatedUserData(){
      return this.$store.getters.getUserData;
    }
  },

  mounted(){
    this.$store.dispatch('fetchUserData') 
  },

  methods:{
    toggleChangePassword(){
      this.changePassword = !this.changePassword
    },

    toggleDialog(){
      this.errorDialog = false
    },

    changeAvatar(array){
      this.updatedUserData[0].avatar = array
      this.$store.commit('updateUserAvatar', array)
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
      this.$store.dispatch('uploadUserData', this.updatedUserData);

      let currentObj = this;

      let rawData = JSON.stringify(this.updatedUserData[0])
      let formData = new FormData()
      formData.append('data', rawData)

      this.errorDialog = true

      axios.post('/public/profile/updateProfile', formData).then(function (response) {currentObj.errorText = response.data;}).catch(function (error) {
        currentObj.errorText = error;
      });
    },

    updatePassword(){
      let currentObj = this;

      if (this.newPassword != this.confirmPassword){
        this.errorDialog = true
        this.errorText = 'New password and confirmed password don\'t match!'
      }
      else{
        let tmpData = {password: this.password, newPassword: this.newPassword}

        let rawData = JSON.stringify(tmpData)

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar{
  text-align: center;
  margin-bottom: 1rem;
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

</style>