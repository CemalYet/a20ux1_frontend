<template>
  <div class="center">
    <div class="titleLoginPage">
      <h1> snAPP </h1>
    </div>

    <div class="form">
      <v-form @submit.prevent="checkLogin">
        <v-container>
          <v-text-field
              v-model="emailAddress"
              label="E-mail"
              required
              outlined
              color=var(--main-color);
              style="max-width: 300px"
          ></v-text-field>
          <v-text-field
              v-model="password"
              :append-icon="showPassword ? mdiEye : mdiEyeOff"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              required
              outlined
              color=var(--main-color);
              style="max-width: 300px"
          ></v-text-field>
        </v-container>
        <div class="loginButtons">
          <v-btn
              width="100px"
              color=var(--dark-color)
              class="white--text"
              @click.native="goToRegister"
          >
            REGISTER
          </v-btn>
          <v-btn
              width="100px"
              color=var(--dark-color)
              class="white--text"
              type="submit"
              :loading="updateLoginLoading"
              :disabled="updateLoginLoading"
          >
            LOGIN
          </v-btn>
          <v-snackbar
              v-model="snackBar"
              color="error"
              centered
          >
            {{this.snackBarText}}
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
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mdiEye} from '@mdi/js';
import {mdiEyeOff} from '@mdi/js';

export default {
  name: "loginpage.vue",

  data: () => ({
    emailAddress: null,
    password: null,
    showPassword: false,
    snackBar: false,
    snackBarText: null,
    loginLoading: false,
    mdiEye: mdiEye,
    mdiEyeOff: mdiEyeOff
  }),

  methods: {
    goToRegister: function () {
      this.$router.push({path: "register"});
    },

    checkLogin: function () {
      if (this.checkTextFields()) {
        this.updateLoginLoading = true;
        axios.get('register/checklogin', {
          params: {
            my_email: this.emailAddress,
            my_password: this.password
          }
        }).then(response => {
          this.loggedIn(response["data"]);
          // eslint-disable-next-line no-unused-vars
        }).catch(err => {
          this.snackBarText = "Something is wrong with the server. Please try again later.";
          this.updateLoginLoading = false;
        })
      }

    },

    loggedIn: function (response) {
      if (response === 'Password is valid') {
        this.$router.push({path: "/"});
      } else {
        this.updateLoginLoading = false;
        this.snackBarText = "Login credentials are not valid. Try again.";
        this.snackBar = true;
      }
      this.updateUserEmail();
    },

    checkTextFields: function () {
      return !(this.emailAddress === null || this.password === null);
    },

    updateUserEmail: function () {
      this.$store.commit("updateUserEmail", this.emailAddress);
    },
  },

  computed:{
    updateLoginLoading:{
      get(){
        return this.loginLoading
      },
      set(value){
        this.loginLoading = value
      }
    }
  },

  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.loginLoading = false;
    })
  }
}


</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.center {
  margin: auto;
  max-width: 300px;
}

.titleLoginPage {
  text-align: center;
  font-size: 46px;
  margin-top: 16vh;
  color: var(--dark-color);
}

.form {
  margin-bottom: 8vh;
  margin-top: 5vh;
}

.loginButtons {
  display: flex;
  justify-content: space-between;
}

</style>