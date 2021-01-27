<template>
  <v-container style="height: calc(100vh - 56px); min-height: 605px">
    <v-stepper
        alt-labels
        v-model="steps"
        style=" max-width: 1000px; margin: auto; height: 100%;"

    >
      <v-stepper-header>
        <v-stepper-step
            step="1"
            :complete="steps > 1"
            color=var(--dark-color)
        >
          Add pictures
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="2"
            :complete="steps > 2"
            color=var(--dark-color)
        >
          Choose leaves
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="3"
            :complete="steps > 3"
            color=var(--dark-color)
        >
          Tag friends
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="4"
            color=var(--dark-color)
        >
          General info
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
            step="1"
            class="stepper_content"
        >

          <pictureSlideGroup></pictureSlideGroup>

          <br>
          <v-divider></v-divider>
          <br>

          <div class="text-h5">
            Add some nice pictures to your discovery!
          </div>
          <br>
          <div class="text-body-1">
            You can add up to 5 pictures. The last one show in the leaf on the feed.
          </div>

          <div class="stepper_buttons_container">
            <v-btn
                right
                color=var(--dark-color)
                dark
                @click="steps = 2"
            >
              Continue
            </v-btn>
          </div>

        </v-stepper-content>
        <v-stepper-content
            step="2"
            class="stepper_content"
        >

          <div class="flex_box_leaf_choices">

            <leaf1 class="leaf leaf1" @click.native="select_leaf(1)"/>
            <leaf2 class="leaf leaf2" @click.native="select_leaf(2)"/>
            <leaf3 class="leaf leaf3" @click.native="select_leaf(3)"/>
            <leaf4 class="leaf leaf4" @click.native="select_leaf(4)"/>
            <leaf5 class="leaf leaf5" @click.native="select_leaf(5)"/>

          </div>
          <br>
          <v-divider></v-divider>
          <br>
          <div
              class="placeholder_text_container text-h5"
              v-if="updateLeafShape === null"
          >
            Choose your favorite leaf shape!
          </div>
          <br>
          <div
              class="placeholder_text_container text-b1"
              v-if="updateLeafShape === null"
          >
            This leaf shape will show up in your friends feed, so be sure to take a nice one that complements your first
            picture.
          </div>
          <div class="leafId">
            <leaf1 class="small_leaf"
                   v-if="updateLeafShape === 1"
                   v-bind:picture="updateDiscoveryImages[0].photoPath"
            />
            <leaf2 class="small_leaf"
                   v-if="updateLeafShape === 2"
                   v-bind:picture="updateDiscoveryImages[0].photoPath"
            />
            <leaf3 class="small_leaf"
                   v-if="updateLeafShape === 3"
                   v-bind:picture="updateDiscoveryImages[0].photoPath"
            />
            <leaf4 class="small_leaf"
                   v-if="updateLeafShape === 4"
                   v-bind:picture="updateDiscoveryImages[0].photoPath"
            />
            <leaf5 class="small_leaf"
                   v-if="updateLeafShape === 5"
                   v-bind:picture="updateDiscoveryImages[0].photoPath"
            />
          </div>

          <div class="stepper_buttons_container">
            <v-btn
                color=var(--dark-color)
                text
                @click="steps--"
            >
              go back
            </v-btn>
            <v-btn
                v-if="updateLeafShape === null"
                disabled
                @click="steps = 3"
            >
              Continue
            </v-btn>
            <v-btn
                v-else
                color=var(--dark-color)
                dark
                @click="steps = 3"
            >
              Continue
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content
            class="stepper_content"
            step="3"
        >

          <v-header>Tagged Friend</v-header>
          <v-list-item
              v-if="taggedFriends.length === 0">
            <v-list-item-content>
              <v-list-item-subtitle style="height: 64px;">Tagged friends will show up here</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-slide-group>
            <v-slide-item
                v-for="taggedFriend in taggedFriends"
                :key="taggedFriend"
            >
              <div class="tagged_container">
                <avatar :size="56" :user-name="taggedFriend.userName" :picture="taggedFriend.avatar"></avatar>
                <div class="text-caption text-truncate">
                  {{ taggedFriend.userName }}
                </div>
                <div class="delete_button_container" style="margin: -12px">
                  <v-btn
                      elevation="2"
                      fab
                      x-small
                      color="error"
                      raised
                      @click="removeTag(taggedFriend)"
                  >
                    <v-icon>{{ mdiDelete }}</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-slide-item>
          </v-slide-group>

          <v-divider></v-divider>
          <vheader>My friends</vheader>

          <v-virtual-scroll
              :items="updateFriends"
              :item-height="68"
              :bench="5"
              height="calc(100vh - 83px - 56px - 24px - 290px)"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <avatar :size="56" :user-name="item.userName" :picture="item.avatar"></avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.userName }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                      depressed
                      color=var(--main-color)
                      dark
                      class="text-capitalize"
                      @click="tagFriend(item)">
                    Tag Friend
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>

          <div class="stepper_buttons_container">
            <v-btn
                color=var(--dark-color)
                text
                @click="steps--"
            >
              go back
            </v-btn>
            <v-btn
                color=var(--dark-color)
                dark
                @click="steps = 4"
            >
              Continue
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content
            step="4"
            class="stepper_content"
        >

          <validation-observer
              ref="observer"
              v-slot="{invalid}"
          >
            <form @submit.prevent="check_data">
              <!--Text input TITLE-->
              <v-text-field
                  class="text_field"
                  dense
                  label="Title"
                  v-model="updateInformationCard.title"
                  outlined
                  color=var(--dark-color)
                  readonly
                  hide-details
                  :error-messages="errors"
              ></v-text-field>

              <div class="timeDateContainer">
                <!--Modal input HOUR-->
                <v-dialog
                    ref="time_dialog"
                    v-model="time_modal"
                    :return-value.sync="updateTimeStamp"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        class="text_field"
                        id="time_field"
                        dense
                        v-model="updateTimeStamp"
                        label="Time"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        color=var(--dark-color)
                        hide-details
                    ></v-text-field>
                  </template>
                  <v-time-picker
                      v-if="time_modal"
                      v-model="updateTimeStamp"
                      full-width
                      color=var(--main-color)
                      format="24hr"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color=var(--dark-color)
                        @click="time_modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color=var(--dark-color)
                        @click="$refs.time_dialog.save(updateTimeStamp);"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>

                <!--Modal input DATE-->
                <v-dialog
                    ref="date_dialog"
                    v-model="date_modal"
                    :return-value.sync="updateCurrent_date"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        class="text_field"
                        id="date_field"
                        dense
                        v-model="updateCurrent_date"
                        label="Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        color=var(--dark-color)
                        hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="updateCurrent_date"
                      scrollable
                      color=var(--main-color)
                      :max="getMaxDate()"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color=var(--dark-color)
                        @click="date_modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color=var(--dark-color)
                        @click="$refs.date_dialog.save(updateCurrent_date);"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>

              <!--Text input LOCATION-->
              <validation-provider
                  v-slot="{errors}"
                  name="location"
                  rules="max:25"
              >
                <v-text-field
                    class="text_field"
                    dense
                    label="Place of discovery"
                    v-model="updateLocation"
                    outlined
                    color=var(--dark-color)
                    :counter="25"
                    :error-messages="errors"
                ></v-text-field>
              </validation-provider>

              <validation-provider
                  v-slot="{errors}"
                  name="description"
                  rules="max:140"
              >
                <!--Text input DESCRIPTION-->
                <v-textarea
                    class="text_field"
                    id="description_box"
                    label="Description"
                    v-model="updateDescription"
                    outlined
                    color=var(--dark-color)
                    no-resize
                    rows="3"
                    dense
                    counter="140"
                    :error-messages="errors"
                ></v-textarea>
              </validation-provider>

              <!--CONFIRM button-->
              <div class="stepper_buttons_container">
                <v-btn
                    color=var(--dark-color)
                    text
                    @click="steps--"
                >
                  go back
                </v-btn>

                <v-btn
                    color=var(--dark-color)
                    elevation="2"
                    type="submit"
                    class=" white--text"
                    :loading="updateSaveLoading"
                    :disabled="(invalid || updateSaveLoading)"
                    @click="updateChallenges(); updateTitle(updateInformationCard.title)"
                >
                  finish
                </v-btn>
              </div>
            </form>
          </validation-observer>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-snackbar
        v-model="updateSnackbar"
        color="error"
        style="padding: 12px"
    >
      {{ updateSnackBarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="updateSnackbar = false;"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog
        v-model="updateCancelDialog"
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Cancel sharing?
        </v-card-title>

        <v-card-text>
          Are you sure you want to stop sharing your discovery? The plant will still show up in your wiki, but your
          friends won't see it.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color=var(--dark-color)
              text
              @click="updateCancelDialog = false; goToFeed()"
          >
            cancel
          </v-btn>

          <v-btn
              color=var(--dark-color)
              text
              @click="updateCancelDialog = false"
          >
            continue sharing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import leaf1 from "@/components/leaves/leaf1";
import leaf2 from "@/components/leaves/leaf2";
import leaf3 from "@/components/leaves/leaf3";
import leaf4 from "@/components/leaves/leaf4";
import leaf5 from "@/components/leaves/leaf5";
import axios from "axios";
import {required, max} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import pictureSlideGroup from "@/components/pictureSlideGroup";
import Avatar from "@/components/avatar";
import {mdiDelete} from '@mdi/js';

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})


export default {
  name: "share",

  metaInfo:{
    title: "Share discovery",
  },

  components: {
    Avatar,
    leaf1,
    leaf2,
    leaf3,
    leaf4,
    leaf5,
    ValidationProvider,
    ValidationObserver,
    pictureSlideGroup
  },

  data: () => ({
    time_modal: false,
    date_modal: false,
    time_dialog: false,
    date_dialog: false,
    selectedImage: null,
    deleteImageDialog: false,
    steps: 1,
    taggedFriends:[],
    taggedFriendsId:[],
    response: null,
    mdiDelete: mdiDelete
  }),

  created() {
    this.getTime();
    this.getDate();
  },

  mounted() {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    navigator.geolocation.getCurrentPosition(
        position => {
          this.updateLatitude = position.coords.latitude;
          this.updateLongitude = position.coords.longitude;
        },
        error => {
          console.log(error.message);
        },
    )
    this.$store.dispatch('fetchFriends');

  },

  methods: {
    getTime: function () {
      const today = new Date();
      const timestamp = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
      this.$store.commit("updateTimestamp", timestamp);
    },
    getDate: function () {
      const today = new Date();
      const current_date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
      this.$store.commit("updateCurrent_date", current_date);
    },
    getMaxDate: function () {
      const today = new Date();
      return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    },

    select_leaf: function (int) {
      this.updateLeafShape = int;
    },
    check_data: function () {
      this.loader = 'loading'
      if (this.$store.getters.getChosen_leaf === null) {
        this.updateSnackBarMessage = "Please choose a leaf for your discovery";
        this.$store.commit('updateSnackbar', true);
      } else {
        this.updateSnackBarMessage = "Failed to upload. Please try again later.";
        this.$store.dispatch('sharePost', this.taggedFriendsId);
      }
    },
    tagFriend: function (user) {
      this.taggedFriends.push(user)
      this.taggedFriendsId.push(user.userId)
      this.updateFriends.splice(this.updateFriends.indexOf(user), 1);
      console.log(this.taggedFriendsId)
    },
    removeTag: function (user) {
      this.updateFriends.push(user);
      this.taggedFriends.splice(this.taggedFriends.indexOf(user), 1);
      this.taggedFriendsId.splice(this.taggedFriendsId.indexOf(user.userId))
      console.log(this.taggedFriendsId)
    },
    updateChallenges: function () {
      console.log(this.$store.getters.getLoggedInUserData[0].userId);
      axios.get('/public/BadgeController/checkChallenges', {params: {userId: this.$store.getters.getLoggedInUserData[0].userId}})
          .then(response => {
            this.response = response["data"]
          });
    },
    goToFeed() {
      this.$router.push({path: '/'});
    },
    updateTitle: function (value) {
      this.$store.commit("updateTitle", value)
    },
  },

  computed: {
    updateSaveLoading(){
      return this.$store.getters.getSaveLoading;
    },
    updateDiscoveryImages(){
      return this.$store.getters.getDiscoveryImages;
    },
    updateSnackBarMessage: {
      get() {
        return this.$store.getters.getSnackbarMessage;
      },
      set(value) {
        this.$store.commit('updateSnackbarMessage', value);
      }
    },
    updateTimeStamp: {
      get() {
        return this.$store.getters.getTimestamp;
      },
      set(value) {
        this.$store.commit("updateTimestamp", value);
      }
    },
    updateCurrent_date: {
      get() {
        return this.$store.getters.getCurrent_date;
      },
      set(value) {
        this.$store.commit("updateCurrent_date", value)
      }
    },
    updateLocation: {
      get() {
        return this.$store.getters.getLocation;
      },
      set(value) {
        this.$store.commit("updateLocation", value)
      }
    },
    updateSnackbar: {
      get() {
        return this.$store.getters.getSnackbar;
      },
      set(value) {
        this.$store.commit("updateSnackbar", value)
      }
    },
    updateDescription: {
      get() {
        return this.$store.getters.getDescription;
      },
      set(value) {
        this.$store.commit('updateDiscription', value);
      }
    },
    updateLeafShape: {
      get() {
        return this.$store.getters.getChosen_leaf;
      },
      set(value) {
        this.$store.commit('updateChosen_leaf', value);
      }
    },
    updateLongitude: {
      get() {
        return this.$store.getters.getLongitude;
      },
      set(value) {
        this.$store.commit("updateLongitude", value)
      }
    },
    updateLatitude: {
      get() {
        return this.$store.getters.getLatitude;
      },
      set(value) {
        this.$store.commit("updateLatitude", value)
      }
    },
    updateFriends() {
      return this.$store.getters.getFriendsData;
    },
    updateCancelDialog: {
      get() {
        return this.$store.getters.getCancelDialog;
      },
      set(value) {
        this.$store.commit('updateCancelDialog', value);
      }
    },
    updateInformationCard() {
      return this.$store.getters.getInformationCards[this.updateCardId];
    },
    updateCardId() {
      return this.$store.getters.getCardId;
    }
  }
}
</script>

<style scoped>

.text_field {
  background-color: white;
  max-width: 500px;
  width: 100%;
  padding: 6px;
  margin: auto;
}

.timeDateContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 500px;
  margin: auto;
  grid-template-areas:
  "time date"
}

#time_field {
  grid-area: time;
}

#date_field {
  grid-area: date;
}

.leafId {
  text-align: center;
  width: 90%;
  height: auto;
}

.leaf {
  margin-left: 6px;
  margin-right: 6px;
  max-height: 100px;
}

.flex_box_leaf_choices {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  justify-content: center;
  justify-items: center;
  grid-template-areas:
    "leaf1 leaf2 leaf3 leaf4 leaf5"
}

.leaf1 {
  grid-area: leaf1;
}

.leaf2 {
  grid-area: leaf2;
}

.leaf3 {
  grid-area: leaf3;
}

.leaf4 {
  grid-area: leaf4;
}

.leaf5 {
  grid-area: leaf5;
}


.small_leaf {
  max-width: 400px;
  width: auto;
  margin: auto;
}

.delete_button_container {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 2px;
}

.placeholder_text_container {
  width: 100%;
  height: auto;
}

.stepper_content {
  height: calc(100vh - 83px - 56px - 24px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.stepper_buttons_container {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 24px;
}

.tagged_container {
  position: relative;
  text-align: center;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 12px;
}
</style>