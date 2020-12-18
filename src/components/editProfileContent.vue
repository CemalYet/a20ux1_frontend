<template>
  <v-container>
    <br>
    <div class="content">

      <image-input class="avatar" @input="changeAvatar($event)">
        <div slot="activator">
          <avatar v-ripple :size="200" :user-name="updatedUserData[0].userName" :picture="updatedUserData[0].avatar"></avatar>
        </div>
      </image-input>

      <v-form
          v-model="valid"
          v-if="!changePassword"
      >
        <v-container>
          <v-text-field
              v-model="updatedUserData[0].userName"
              :rules="nameRules"
              :label="$t('register.userNamLab')"
              outlined
              :counter=25
              required
          ></v-text-field>
          <v-text-field
              width="300px"
              v-model="updatedUserData[0].emailAddress"
              :rules="emailRules"
              label="E-mail"
              outlined
              required
          ></v-text-field>
          <v-btn
              width="250px"
              color=var(--dark-color)
              class="white--text"
              @click.native="updateProfile"

          >
            {{ $t('buttons.updateProf') }}
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
              :label="$t('register.currPass')"
              outlined
              required
          ></v-text-field>
          <v-text-field
              v-model="newPassword"
              :rules="passwordRules"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword2 = !showPassword2"
              :type="showPassword2 ? 'text' : 'password'"
              :label="$t('register.newpassLab')"
              outlined
              required
          ></v-text-field>
          <v-text-field
              v-model="confirmPassword"
              :rules="passwordRules"
              :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword3 = !showPassword3"
              :type="showPassword3 ? 'text' : 'password'"
              :label="$t('register.repNewPass')"
              outlined
              required
          ></v-text-field>
          <v-btn
              width="250px"
              color=var(--dark-color)
              class="white--text"
              @click.native="updatePassword"

          >
            {{ $t('buttons.updatePass') }}
          </v-btn>
        </v-container>
      </v-form>
      <v-btn
          v-if="!changePassword"
          width="200px"
          color=var(--light-color)
          class="white--text"
          @click.native="toggleChangePassword"

      >
        {{ $t('buttons.changePass') }}
      </v-btn>
      <v-btn
          v-if="changePassword"
          width="200px"
          color=var(--light-color)
          class="white--text"
          @click.native="toggleChangePassword"
          
      >
        {{ $t('buttons.goBack') }}
      </v-btn>

      <!-- Error dialog displays any potential error messages -->
      <v-dialog v-model="this.errorDialog" max-width="300">
        <v-card>
          <v-card-text class="subheading">{{this.errorText}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="toggleDialog()" text>{{ $t('buttons.gotIt') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import ImageInput from "@/components/ImageInput";
import avatar from "@/components/avatar";

export default {
  name: "editProfileContent",

  components:{
    ImageInput,
    avatar
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
      return this.$store.getters.getLoggedInUserData;
    }
  },

  mounted(){
    this.$store.dispatch('fetchLoggedInUserData')
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
      this.$store.dispatch('uploadLoggedInUserData', this.updatedUserData);

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
        this.errorText = this.$t('prContent.passNotMatch')
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

</style>