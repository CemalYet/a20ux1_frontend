<template>
  <v-app>
    <v-main id="main">
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
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "loginpage.vue",

  data: () => ({
    emailAddress: null,
    password: null,
    showPassword: false,
    loggedIn: null
  }),

  methods: {
    goToRegister: function() {
      this.$router.push({path:"register-step1"});
    },

    checkLogin: function() {
      axios.get('register/checklogin', {params: {my_email: this.emailAddress, my_password: this.password}}).then(response => (this.loggedIn = response["data"]));
      if (this.loggedIn != null) {
        this.$router.push({path: "/"});
      }
    }
  }
}


</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.center {
  margin: auto;
  max-width: 300px;
}

.titleLoginPage {
  text-align: center;
  font-size: 46px;
  margin-top: 16vh;
  color: #00251a;
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