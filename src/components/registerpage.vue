<template>
  <v-stepper v-model="e1" class="stepper" alt-labels>
    <v-stepper-header id="stepper_header">
      <v-stepper-step
          :complete="e1 > 1"
          step="1"
          color=var(--dark-color)
      >
        {{ $t('register.registration') }}
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
          :complete="e1 > 2"
          step="2"
          color=var(--dark-color)
      >
        Geo tagging
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
          :complete="e1 > 3"
          step="3"
          color=var(--dark-color)
      >
        {{ $t('register.reminderTab') }}
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
          step="4"
          color=var(--dark-color)
      >
        Done
      </v-stepper-step>
    </v-stepper-header>


    <v-stepper-items>
      <v-stepper-content step="1" class="background">
        <div class="content">
          <v-form @submit.prevent="checkRegData">
            <v-container style="max-width: 300px">
              <v-text-field
                  v-model="userName"
                  :rules="nameRules"
                  :label="$t('register.userNamLab')"
                  :counter=25
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
              <v-text-field
                  v-model="emailAddress"
                  :rules="emailRules"
                  label="E-mail"
                  :counter="45"
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :append-icon="showPassword1 ? mdiEye : mdiEyeOff"
                  @click:append="showPassword1 = !showPassword1"
                  :type="showPassword1 ? 'text' : 'password'"
                  :label="$t('register.passLab')"
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
              <v-text-field
                  v-model="confirmPassword"
                  :rules="passwordRules"
                  :append-icon="showPassword2 ? mdiEye : mdiEyeOff"
                  @click:append="showPassword2 = !showPassword2"
                  :type="showPassword2 ? 'text' : 'password'"
                  :label="$t('register.newpassLab')"
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
            </v-container>
            <div class="coverButtons">
              <div class="centerButtons">
                <v-btn
                    class="buttons"
                    @click.native="goBackToLogin"
                    elevation="2"
                >
                  Back
                </v-btn>
                <v-btn
                    class="buttons white--text"
                    color=var(--dark-color)
                    elevation="2"
                    type="submit"
                >
                  Continue
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
        <div class="coverButtons">
          <div class="centerButtons">
            <v-btn
                class="buttons"
                @click.native="goBackToLogin"
                elevation="2"
            >
              {{ $t('buttons.back') }}
            </v-btn>
            <v-btn
                class="buttons white--text"
                color=var(--dark-color)
                elevation="2"
                @click.native="checkRegData"
            >
              {{ $t('buttons.continue') }}
            </v-btn>
          </div>
        </div>

        <v-snackbar
            v-model="snackBar"
            color="error"
        >
          {{ snackBarText }}
          <template v-slot:action="{ attrs }">
            <v-btn
                text
                v-bind="attrs"
                @click="snackBar = false"
            >
              {{ $t('buttons.close') }}
            </v-btn>
          </template>
        </v-snackbar>
      </v-stepper-content>


      <v-stepper-content step="2" class="background">
        <div class="content">
          <div class="paragraphbox">
            <p class="biggerFont">  {{ $t('register.geoText') }} </p>
          </div>
          <div class="checkbox">
            <v-checkbox
                v-model="checkbox"
                :label="$t('register.locationLab')"
                color=var(--dark-color)
                value=var(--dark-color)
                class="dark--text biggerFont"
            ></v-checkbox>
          </div>
        </div>
        <div class="coverButtons">
          <div class="centerButtons">
            <v-btn
                class="buttons"
                @click="e1 = 1"
                elevation="2"
            >
              {{ $t('buttons.back') }}
            </v-btn>
            <v-btn
                color=var(--dark-color)
                @click="e1 = 3"
                class="buttons white--text"
                elevation="2"
                @click.native="updateUserEmail"
            >
              {{ $t('buttons.continue') }}
            </v-btn>
          </div>
        </div>

      </v-stepper-content>


      <v-stepper-content step="3" class="background">
        <div class="content">
          <div class="paragraphbox">
            <p class="text1 biggerFont">  {{ $t('register.reminder') }} </p>
          </div>
          <v-form>
            <v-container>
              <v-btn-toggle
                  v-model="toggle_multiple"
                  multiple
                  group
                  borderless
                  outlined
                  class="daybuttons"
              >
                <v-btn
                    value="1"
                    elevation="2"
                    class="btn"
                >
                  {{ $t('days.mo') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="2"
                    class="btn"
                >
                  {{ $t('days.tu') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="3"
                    class="btn"
                >
                  {{ $t('days.we') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="4"
                    class="btn"
                >
                  {{ $t('days.th') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="5"
                    class="btn"
                >
                  {{ $t('days.fr') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="6"
                    class="btn"
                >
                  {{ $t('days.sa') }}
                </v-btn>
                <v-btn
                    elevation="2"
                    value="7"
                    class="btn"
                >
                  {{ $t('days.su') }}
                </v-btn>
              </v-btn-toggle>
            </v-container>
          </v-form>
        </div>
        <div class="coverButtons">
          <div class="centerButtons">
            <v-btn
                class="buttons"
                @click="e1 = 2"
                elevation="2"
            >
              {{ $t('buttons.back') }}
            </v-btn>
            <v-btn
                color=var(--dark-color)
                class="buttons white--text"
                elevation="2"
                @click.native="save"
                :loading="updateRegisterLoading"
                :disabled="updateRegisterLoading"
            >
              {{ $t('buttons.confirm') }}
            </v-btn>
          </div>
        </div>

      </v-stepper-content>


      <v-stepper-content step="4" class="background">
        <div class="doneText">
          <h1 class="bigText"> {{ $t('register.AllDone') }} </h1>
          <br>
          <p> {{ $t('register.enjoyM') }} </p>
        </div>
        <div class="doneButton">
          <v-btn
              x-large
              color=var(--dark-color)
              class="buttons white--text"
              @click.native="goToFeed()"
          >
            Take me to my feed
            <v-icon
                x-large
                right
            >
              {{ mdiCheckBold }}
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
      <v-snackbar
          v-model="snackBar"
          color="error"
          centered
      >
        {{ snackBarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
              text
              v-bind="attrs"
              @click="snackBar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";
import {mdiEye} from '@mdi/js';
import {mdiEyeOff} from '@mdi/js';
import {mdiCheckBold} from '@mdi/js';

export default {
  name: "registerpage.vue",

  metaInfo:{
    title: "snAPP registration",
  },

  data: () => ({
    mdiEye: mdiEye,
    mdiEyeOff: mdiEyeOff,
    mdiCheckBold: mdiCheckBold,
    e1: 1,
    userName: null,
    emailAddress: null,
    password: null,
    confirmPassword: null,
    showPassword1: false,
    showPassword2: false,
    checkbox: false,
    toggle_multiple: [],
    snackBar: false,
    snackBarText: null,
    location: 0,
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
    registerLoading: false,
  }),

  computed:{
    updateRegisterLoading:{
      get(){
        return this.registerLoading
      },
      set(value){
        this.registerLoading = value;
      }
    }
  },

  methods: {
    updateUserEmail: function () {
      this.$store.commit("updateUserEmail", this.emailAddress);
    },

    goBackToLogin: function () {
      this.$router.push({path: "login"});
    },
    goToFeed: function () {
      this.$router.push({path: "/"});
    },

    save: function () {
      this.updateRegisterLoading = true;
      if (this.checkbox === false) {
        this.location = 0;
      } else {
        this.location = 1;
      }
      const json = JSON.stringify({
        'my_username': this.userName,
        'my_email': this.emailAddress,
        'my_password': this.password,
        'my_location': this.location,
        'my_days': this.toggle_multiple
      });
      // eslint-disable-next-line no-unused-vars
      axios.post('register/save', json).then(response =>{
        this.e1 = 4;
        this.registerLoading = false;
        // eslint-disable-next-line no-unused-vars
      }).catch(err =>{
        this.snackBarText = "Something went wrong at our site, please try again later!";
        this.snackBar = true;
        this.registerLoading = false;
      });
    },
    checkRegData: function () {
      if (this.checkTextFields()) {
        axios.get('register/checkemail', {params: {data: this.emailAddress}}).then(response =>
            (this.checkEmail(response["data"])));
      }
    },
    checkTextFields: function () {
      if (this.userName === null || this.password === null || this.confirmPassword === null || this.emailAddress === null) {
        this.snackBarText = this.$t('register.fillAll');
        this.snackBar = true;
        return false;
      } else {
        if (this.password !== this.confirmPassword) {
          this.snackBarText = this.$t('register.passNoMa');
          this.snackBar = true;
          return false;
        } else {
          if ((1 <= this.userName.length <= 25)
              && (1 <= this.emailAddress.length <= 45)
              && (6 <= this.password.length)
              && (/.+@.+/.test(this.emailAddress))) {
            return true;
          } else {
            this.snackBarText = this.$t('register.fillAll');
            this.snackBar = true;
            return false
          }
        }
      }
    },

    checkEmail: function (response) {
      if (response.length === 0) {
        this.e1 = 2;
      } else {
        this.snackBarText = this.$t('register.alreadyUsed');
        this.snackBar = true;
      }
    }
  }
}
</script>

<style scoped>

.background {
  background: transparent;
}

#stepper_header {
  background: white;
}

.stepper {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: transparent;
}

.content {
  align-content: center;
  padding: 10px 0;
  position: relative;
}

.coverButtons {
  display: flex;
  justify-content: flex-end;
  margin: auto;
  width: 276px;
}

.centerButtons {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 5px;
  max-width: 276px;
  position: fixed;
  top: 500px;
}

.buttons {
  margin: 0 0 0 10px;
}

.paragraphbox {
  max-width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  color: var(--dark-color);
}

.checkbox {
  max-width: 300px;
  margin: auto;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  color: var(--dark-color);
}

.daybuttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  max-width: 300px;
  background-color: white;
}

.doneText {
  color: var(--dark-color);
  text-align: center;
  padding-top: 80px;
}

.doneButton {
  display: flex;
  justify-content: center;
  padding-top: 70px;
  margin-bottom: 10px;
}

.bigText {
  font-size: 40px;
}

.btn {
  color: var(--dark-color);
}

.dark--text /deep/ label {
  color: var(--dark-color);
}

.biggerFont {
  font-size: 20px;
}


@media (min-width: 960px) {
  .background {
    height: calc(100vh - 99px);
  }

  .content {
    height: calc(100vh - 99px - 66px);
  }
}

@media(min-height: 610px) {
  .centerButtons {
    top: 600px;
  }
}
</style>
