<template>
  <v-stepper v-model="e1" class="stepper" alt-labels>
    <v-stepper-header id="stepper_header">
      <v-stepper-step
          :complete="e1 > 1"
          step="1"
          color=var(--dark-color)
      >
        Registration
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
        Daily reminder
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
          <v-form>
            <v-container style="max-width: 300px">
              <v-text-field
                  v-model="userName"
                  :rules="nameRules"
                  label="Username"
                  :counter=25
                  required
                  outlined
                  clearable
                  color=var(--main-color);
                  background-color=white;
                  @click:clear="reloadUserName"
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
                  :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword1 = !showPassword1"
                  :type="showPassword1 ? 'text' : 'password'"
                  label="New password"
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
              <v-text-field
                  v-model="confirmPassword"
                  :rules="passwordRules"
                  :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword2 = !showPassword2"
                  :type="showPassword2 ? 'text' : 'password'"
                  label="Repeat new password"
                  required
                  outlined
                  color=var(--main-color);
                  background-color=white;
              ></v-text-field>
            </v-container>
          </v-form>
        </div>
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
                @click.native="checkRegData"
            >
              Continue
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
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-stepper-content>


      <v-stepper-content step="2" class="background">
        <div class="content">
          <div class="paragraphbox">
            <p> In order to put your pictures on our Discovery map, we would need to use your location. </p>
            <p> Don't worry, we won't sell your location like those other nasty social media platforms ;) </p>
          </div>
          <div class="checkbox">
            <v-checkbox
                v-model="checkbox"
                label="I agree to let this app use my location"
                color=var(--dark-color)
                value=var(--dark-color)
                class="dark--text"
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
              Back
            </v-btn>
            <v-btn
                color=var(--dark-color)
                @click="e1 = 3"
                class="buttons white--text"
                elevation="2"
                @click.native="updateUserEmail"
            >
              Continue
            </v-btn>
          </div>
        </div>

      </v-stepper-content>


      <v-stepper-content step="3" class="background">
        <div class="content">
          <div class="paragraphbox">
            <p class="text1"> Would you like us to remind you to go on walks on certain days? </p>
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
                  Mo
                </v-btn>
                <v-btn
                    elevation="2"
                    value="2"
                    class="btn"
                >
                  Tu
                </v-btn>
                <v-btn
                    elevation="2"
                    value="3"
                    class="btn"
                >
                  We
                </v-btn>
                <v-btn
                    elevation="2"
                    value="4"
                    class="btn"
                >
                  Th
                </v-btn>
                <v-btn
                    elevation="2"
                    value="5"
                    class="btn"
                >
                  Fr
                </v-btn>
                <v-btn
                    elevation="2"
                    value="6"
                    class="btn"
                >
                  Sa
                </v-btn>
                <v-btn
                    elevation="2"
                    value="7"
                    class="btn"
                >
                  Su
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
              Back
            </v-btn>
            <v-btn
                color=var(--dark-color)
                @click="e1 = 4"
                class="buttons white--text"
                elevation="2"
                @click.native="save"
            >
              Continue
            </v-btn>
          </div>
        </div>

      </v-stepper-content>


      <v-stepper-content step="4" class="background">
        <div class="doneText">
          <h1 class="bigText"> All done! </h1>
          <br>
          <p> Enjoy your time using snAPP </p>
        </div>
        <div class="doneButton">
          <v-btn x-large>
            <v-icon
                x-large
                color=var(--dark-color)
                @click.native="goToFeed()"
            >
              mdi-check-bold
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";

export default {
  name: "registerpage.vue",

  data: () => ({
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
    ]
  }),

  methods: {
    reloadUserName: function () {
      this.userName = null;
    },
    updateUserEmail: function () {
      this.$store.commit("updateUserEmail", this.emailAddress);
    },
    fetchUserData: function () {
      this.$store.dispatch('fetchLoggedInUserData');
    },

    goBackToLogin: function () {
      this.$router.push({path: "login"});
    },
    goToFeed: function () {
      this.$router.push({path: "/"});
    },

    save: function () {
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
      axios.post('register/save', json);
    },
    checkRegData: function () {
      if (this.checkTextFields()) {
        axios.get('register/checkemail', {params: {data: this.emailAddress}}).then(response =>
            (this.checkEmail(response["data"])));
      }
    },
    checkTextFields: function () {
      if (this.userName === null || this.password === null || this.confirmPassword === null || this.emailAddress === null) {
        this.snackBarText = 'Please fill in all the text fields as required.';
        this.snackBar = true;
        return false;
      } else {
        if (this.password !== this.confirmPassword) {
          this.snackBarText = "Passwords don't match";
          this.snackBar = true;
          return false;
        } else {
          if ((1 <= this.userName.length <= 25)
              && (1 <= this.emailAddress.length <= 45)
              && (6 <= this.password.length)
              && (/.+@.+/.test(this.emailAddress))) {
            return true;
          } else {
            this.snackBarText = 'Please fill in all the text fields as required.';
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
        this.snackBarText = 'This e-mail address is already in use.';
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
  /*position: relative;*/
}

.coverButtons {
  display: flex;
  justify-content: flex-end;
  margin: auto;
  width: 276px;
  /*position: fixed;*/
}

.centerButtons {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 5px;
  max-width: 276px;
  /*margin: auto auto 5px;*/
  position: fixed;
  top: 600px;
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


@media (min-width: 960px) {
  .background {
    height: calc(100vh - 99px);
  }

  .content {
    height: calc(100vh - 99px - 66px);
  }
}

@media(max-height: 600px) {
  .centerButtons {
    top: 500px;
  }
}

</style>