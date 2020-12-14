<template>
  <div class="center">
    <div class="titleLoginPage">
      <h1> snAPP </h1>
    </div>

    <div class="form">
      <v-form>
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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              required
              outlined
              color=var(--main-color);
              style="max-width: 300px"
          ></v-text-field>
        </v-container>
      </v-form>
    </div>

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
          @click.native="checkLogin"
      >
        LOGIN
      </v-btn>
    </div>
    <v-snackbar
        v-model="snackBar"
        color="error"
    >
      Login credentials are not valid. Try again.
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
</template>

<script>
import axios from "axios";

export default {
  name: "loginpage.vue",

  data: () => ({
    emailAddress: null,
    password: null,
    showPassword: false,
    snackBar: false,
  }),

  methods: {
    goToRegister: function () {
      this.$router.push({path: "register"});
    },

    checkLogin: function () {
      if (this.checkTextFields()) {
        axios.get('register/checklogin', {
          params: {
            my_email: this.emailAddress,
            my_password: this.password
          }
        }).then(response =>
            (this.loggedIn(response["data"])));
      }

    },

    loggedIn: function (response) {
      if (response === 'Password is valid') {
        this.$router.push({path: "/"});
      } else {
        this.snackBar = true;
      }
      this.updateUserEmail();
    },

    checkTextFields: function () {
      return !(this.emailAddress === null || this.password === null);
    },

    updateUserEmail: function () {
      this.$store.commit("updateUserEmail", this.emailAddress);
      this.fetchUserData();
    },
    fetchUserData: function () {
      this.$store.dispatch('fetchLoggedInUserData');
    }
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