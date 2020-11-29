<template>
  <v-container>
    <v-stepper
        alt-labels
        v-model="steps"
        style=" max-width: 1000px; margin: auto"
    >
      <v-stepper-header>
        <v-stepper-step
            step="1"
            :complete="steps > 1"
        >
          Ad more pictures
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="2"
            :complete="steps > 2"
        >
          Choose leaves
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="3"
            :complete="steps > 3"
        >
          Tag friends
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            step="4"
        >
          General info
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
            step="1"
        >

          <v-slide-group
              show-arrows="desktop"
          >
            <v-slide-item>
              <v-card
                  class="added_discovery_images ma-2"
                  color=var(--light-color)
                  style="opacity: 50%; width: 160px;"
                  ripple
                  @click="$refs.camera.click()"
              >
                <input type="file" ref="camera" accept="image/* capture=camera" style="display: none;"/>
                <v-icon class="added_discovery_images" style="width: 160px;" size="68" color="white">
                  mdi-camera-plus
                </v-icon>
              </v-card>
            </v-slide-item>
            <v-slide-item
                v-for="image in updateDiscoveryImages"
                :key="image"
            >
              <v-dialog
                  v-model="deleteImageDialog"
                  width="300"
              >
                <template
                    v-slot:activator="{ on, attrs }"
                >
                  <div style="position: relative">
                    <div class="delete_button_container">
                      <v-btn
                          elevation="2"
                          fab
                          x-small
                          @click="selectedImage = image"
                          v-bind="attrs"
                          v-on="on"
                          color="error"
                          raised
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                    <v-img class="added_discovery_images ma-2" :src="image.photoPath"></v-img>
                  </div>
                </template>

                <v-card>
                  <v-card-title>
                    Delete image
                  </v-card-title>

                  <v-card-text>
                    Are you sure you want to delete this picture?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color=var(--dark-color)
                        @click="deleteImageDialog = false"
                        text
                        dark
                    >
                      cancel
                    </v-btn>
                    <v-btn
                        color=var(--dark-color)
                        @click="deleteImage"
                        text
                        dark
                    >
                      confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-slide-item>
          </v-slide-group>

          <div style="text-align: right;">
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
        >

          <div class="flex_box_leaf_choices">

              <leaf1 class="leaf" @click.native="select_leaf(1)"/>
              <leaf2 class="leaf" @click.native="select_leaf(2)"/>
              <leaf3 class="leaf" @click.native="select_leaf(3)"/>

              <leaf4 class="leaf" @click.native="select_leaf(4)"/>
              <leaf5 class="leaf" @click.native="select_leaf(5)"/>

          </div>
          <br>
          <v-divider></v-divider>
          <br>
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

            <v-card-title>Chose leaf shape</v-card-title>
            <v-divider></v-divider>
          <div style="text-align: right">
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
            class="pa-0"
            step="3"
        >
          <v-list>
            <v-subheader>Tagged Friend</v-subheader>
            <v-list-item
                v-if="taggedFriends.length === 0">
              <v-list-item-content>
                <v-list-item-subtitle>New friend requests will show up here</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
                v-else
                v-for="tagged in taggedFriends"
                :key="tagged.userName">
              <v-list-item-avatar>
                <v-img
                    :alt="`${tagged.userName} avatar`"
                    :src="tagged.avatar"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="tagged.userName"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-btn
                    depressed
                    icon
                    color="error"
                    class="text-capitalize"
                    dark
                    @click="removeTag(tagged)"
                    >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-divider></v-divider>
            <v-subheader>My friends</v-subheader>
          <v-list-item
              v-for="friend in updateFriends"
              :key="friend"
          >
            <v-list-item-avatar>
              <v-img
                  :alt="`${friend.userName} avatar`"
                  :src="friend.avatar"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="friend.userName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn
                     depressed
                     color=var(--main-color)
                     dark
                     class="text-capitalize"
                     @click="tagFriend(friend)">
                Tag Friend
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          </v-list>
          <div style="text-align: right"
          class="mr-4 mb-2">
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
        >

          <validation-observer
              ref="observer"
              v-slot="{invalid}"
          >
            <form @submit.prevent="check_data">
              <!--Text input TITLE-->
              <validation-provider
                  v-slot="{errors}"
                  name="title"
                  rules="required|max:25"
              >
                <v-text-field
                    class="text_field"
                    dense
                    label="Title"
                    v-model="updateTitle"
                    outlined
                    color=var(--dark-color)
                    :counter="25"
                    required
                    :error-messages="errors"
                ></v-text-field>
              </validation-provider>

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
                    label="Location"
                    v-model="updateLocation"
                    outlined
                    color=var(--dark-color)
                    :counter="25"
                    :error-messages="errors"
                ></v-text-field>
              </validation-provider>

              <div id="buttons">
                <!--Buttons-->
                <div id="plus_button">
                  <v-btn
                      color=var(--dark-color)
                      elevation="2"
                      :ripple="false"
                      v-on="on"
                      dark
                  >
                    <v-icon color="white">mdi-plus</v-icon>
                    friends
                  </v-btn>
                </div>

                <div id="tags" v-for="tagged in taggedFriends"
                     :key="tagged.userName">
                  <v-avatar>
                    <v-img
                        :alt="`${tagged.userName} avatar`"
                        :src="tagged.avatar">
                    </v-img>
                  </v-avatar>
                </div>
              </div>

              <validation-provider
                  v-slot="{errors}"
                  name="description"
                  rules="max:140"
              >
                <!--Text input DESCRIPTION-->
                <v-textarea
                    class="text_field"
                    id="description_box"
                    label="DESCRIPTION"
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
              <div style="text-align: right;">
                <v-btn
                    color=var(--dark-color)
                    text
                    @click="steps--"
                >
                  go back
                </v-btn>
                <v-btn
                    v-if="invalid"
                    color=var(--dark-color)
                    elevation="2"
                    :ripple="false"
                    :disabled="invalid"
                >
                  finish
                </v-btn>
                <v-btn
                    v-if="!invalid"
                    color=var(--dark-color)
                    elevation="2"
                    :ripple="false"
                    type="submit"
                    dark
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
      Please choose a leaf for your discovery
      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="updateSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import leaf1 from "@/components/leaves/leaf1";
import leaf2 from "@/components/leaves/leaf2";
import leaf3 from "@/components/leaves/leaf3";
import leaf4 from "@/components/leaves/leaf4";
import leaf5 from "@/components/leaves/leaf5";
import axios from "axios";
import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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

  components: {
    leaf1,
    leaf2,
    leaf3,
    leaf4,
    leaf5,
    ValidationProvider,
    ValidationObserver,
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
    taggedFriendsId:[]
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
      if (this.$store.getters.getChosen_leaf === null) {
        this.$store.commit('updateSnackbar', true);
      } else {
        this.$store.dispatch('sharePost');
      }
    },
    tagFriend: function (user) {
      this.taggedFriends.push(user)
      this.taggedFriendsId.push(user.userId)
      this.updateFriends.splice(this.updateFriends.indexOf(user), 1);
      console.log(this.taggedFriendsId)
    },
    removeTag : function (user){
      this.updateFriends.push(user);
      this.taggedFriends.splice(this.taggedFriends.indexOf(user), 1);
      this.taggedFriendsId.splice(this.taggedFriendsId.indexOf(user.userId))
      console.log(this.taggedFriendsId)
    },

    deleteImage(){
      this.deleteImageDialog = false ;
      this.$store.commit('deleteDiscoveryImage', this.selectedImage);
    }
  },

  computed: {
    updateDiscoveryImages(){
      return this.$store.getters.getDiscoveryImages;
    },
    updateTitle: {
      get() {
        return this.$store.getters.getTitle;
      },
      set(value) {
        this.$store.commit("updateTitle", value)
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

.timeDateContainer{
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 500px;
  margin: auto;
  grid-template-areas:
  "time date"
}

#time_field{
  grid-area: time;
}

#date_field{
  grid-area: date;
}

#buttons {
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  grid-template-rows: 0.5fr 0.5fr;
  width: 100%;
  max-width: 500px;
  padding: 6px 12px 0;
  margin: auto;
}

#plus_button {
  grid-area: 1 / 1 / 2 / 2;
  margin: auto;
}

#leaf_button {
  grid-area: 1 / 3 / 2 / 4;
  margin: auto;
}

#tags {
  grid-area: 2 / 1 / 3 / 2;
  margin: auto;
}

.leafId {
  text-align: center;
  width: 90%;
  height: auto;
  min-height: 340px;
}

.avatars {
  margin: 6px -6px 20px;
}

.leaf {
  margin-left: 6px;
  margin-right: 6px;
}

.flex_box_leaf_choices {
  display: flex;
  max-height: 100px;
  justify-content: center;
}

.small_leaf {
  max-width: 400px;
  width: auto;
}

.added_discovery_images {
  width: 220px;
  height: 160px;
  object-fit: cover;
}

.delete_button_container{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 2px;
}

</style>