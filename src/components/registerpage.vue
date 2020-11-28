<template>
  <v-app>
    <v-main>
      <v-stepper v-model="e1" class="stepper" alt-labels>
        <v-stepper-header>
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
          <v-stepper-content step="1">
            <v-card
                height="65vh"
                class="background"
            >
              <v-form>
                <v-container class="form">
                  <v-text-field
                      v-model="userName"
                      :rules="nameRules"
                      label="Username"
                      :counter=25
                      required
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="emailAddress"
                      :rules="emailRules"
                      label="E-mail"
                      :counter="45"
                      required
                      outlined
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
                  ></v-text-field>
                  <p> {{ emailUnique[0].emailAddress }}</p>
                  <p> {{ ses }}</p>
                </v-container>
              </v-form>
            </v-card>
            <div class="centerButtons">
              <v-btn
                  @click.native="goBackToLogin"
                  elevation="2"
              >
                Back
              </v-btn>
              <v-btn
                  color=var(--dark-color)
                  class="white--text"
                  elevation="2"
                  @click="e1 = 2"

              >
                Continue
              </v-btn>
              <v-snackbar
                v-model="snackBar"
                color="error"
              >
                Please fill in all the text fields as required.
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
          </v-stepper-content>





          <v-stepper-content step="2">
            <v-card
                height="65vh"
                class="background"
            >
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
                ></v-checkbox>
              </div>
            </v-card>
            <div class="centerButtons">
              <v-btn
                  @click="e1 = 1"
                  elevation="2"
              >
                Back
              </v-btn>
              <v-btn
                color=var(--dark-color)
                @click="e1 = 3"
                class="white--text"
                elevation="2"
            >
              Continue
            </v-btn>
            </div>
          </v-stepper-content>






          <v-stepper-content step="3">
            <v-card
                height="65vh"
                class="background"
            >
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
                      class="daybuttons"
                  >
                    <v-btn
                        elevation="2"
                        value="1"
                        color=var(--dark-color)
                        outlined
                        class="buttons"
                    >
                      Mo
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="2"
                    >
                      Tu
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="3"
                    >
                      We
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="4"
                    >
                      Th
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="5"
                    >
                      Fr
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="6"
                    >
                      Sa
                    </v-btn>
                    <v-btn
                        fab
                        elevation="2"
                        value="7"
                    >
                      Su
                    </v-btn>
                  </v-btn-toggle>

                </v-container>
              </v-form>





            </v-card>
            <div class="centerButtons">
              <v-btn
                  @click="e1 = 2"
                  elevation="2"
              >
                Back
              </v-btn>
              <v-btn
                color=var(--dark-color)
                @click="save"
                class="white--text"
                elevation="2"
            >
              Continue
            </v-btn>
            </div>

          </v-stepper-content>





          <v-stepper-content step="4">
            <v-card
                height="65vh"
                class="background"
            >
              <div class="doneText">
                <h1 class="bigText"> All done! </h1>
                <br>
                <p> Enjoy your time using snAPP </p>
              </div>
              <div class="doneButton">
                <v-btn
                    x-large
                >
                  <v-icon
                      x-large
                      color=var(--dark-color)
                  >mdi-check-bold</v-icon>
                </v-btn>
              </div>

            </v-card>

          </v-stepper-content>


        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "registerpage.vue",

  data: () => ({
    userName: null,
    emailAddress: null,
    e1: 1,
    password: null,
    confirmPassword: null,
    showPassword1: false,
    showPassword2: false,
    checkbox: false,
    toggle_multiple: [],
    snackBar: false,
    location: 0,
    ses: "lol",
    emailUnique: [{"emailAddress":"test"}],
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
    goBackToLogin: function() {
      this.$router.push({path:"login"});
    },
    save: function() {
      if(this.checkbox === false){
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
      if((this.userName != null) && (this.userName.length <= 25) && (this.emailAddress != null) && (this.emailAddress.length <= 45) && (this.password != null) && (this.password.length >= 6) && (this.password == this.confirmPassword) && (/.+@.+/.test(this.emailAddress))){
        axios.post('register/save', json);
      }

    },
    checkRegData: function() {
      if((this.userName != null) && (this.userName.length <= 25) && (this.emailAddress != null) && (this.emailAddress.length <= 45) && (this.password != null) && (this.password.length >= 6) && (this.password == this.confirmPassword) && (/.+@.+/.test(this.emailAddress))){
        axios.get('register/checkemail', {params: { data: this.emailAddress}}).then(response => (this.emailUnique = response["data"]));
        if(this.emailUnique[0].emailAddress != null){
          this.snackBar = true;
        } else {
          this.e1 = 2;
        }
      } else {
        this.snackBar = true;
      }
    }
  }





}
</script>

<style scoped>

.background {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
}

.stepper {
  max-width: 100vw;
}

.centerButtons {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 5px;
  width: 276px;
  margin: auto;
}

.form {
  width: 300px;
}

.paragraphbox {
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  text-align: center;
  padding-top: 50px;
  color: var(--dark-color);
}

.checkbox {
  width: 300px;
  margin: auto;
  text-align: center;
  padding-top: 50px;
  color: var(--dark-color);
}

.daybuttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  width: 300px;
}

.buttons {
  border-radius: 5px;
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
}

.bigText {
  font-size: 40px;
}


</style>