<template>
  <v-container>
    <br>
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

          <div
              id="leaf_button"
          >
            <v-dialog
                v-model="leaf_dialog"
                scrollable
                max-width="80vw"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color=var(--dark-color)
                    elevation="2"
                    :ripple="false"
                    v-bind="attrs"
                    v-on="on"
                    dark
                >
                  <v-icon color="white">mdi-leaf</v-icon>
                  leaf
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Chose leaf shape</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 40vw;">
                  <div class="parent">
                    <div class="top_row">
                      <leaf1 class="leaf" @click.native="select_leaf(1); leaf_dialog = false"/>
                      <leaf2 class="leaf" @click.native="select_leaf(2); leaf_dialog = false"/>
                      <leaf3 class="leaf" @click.native="select_leaf(3); leaf_dialog = false"/>
                    </div>
                    <div class="bottom_row">
                      <leaf4 class="leaf" @click.native="select_leaf(4); leaf_dialog = false"/>
                      <leaf5 class="leaf" @click.native="select_leaf(5); leaf_dialog = false"/>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div id="tags">
            <v-avatar class="avatars elevation-6">
              <v-img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=iEnUTezF7M0AX9l4Blf&_nc_ht=scontent-bru2-1.xx&oh=ad6d77ef7b00135578e999dfc409129d&oe=5FCECE41"
                  alt="">
              </v-img>
            </v-avatar>
            <v-avatar class="avatars elevation-6">
              <v-img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=RdqSnTG_rdMAX-4kET-&_nc_ht=scontent-bru2-1.xx&oh=6aeb2fb674f01ad8802760f5315129bc&oe=5FCD7A18"
                  alt="">
              </v-img>
            </v-avatar>
            <v-avatar class="avatars elevation-6">
              <v-img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/71499627_2643828155667264_8670036088552685568_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=w6TlLBPM4coAX8ftlce&_nc_ht=scontent-bru2-1.xx&oh=cb334c83c12b7b2d6e08bc3ef6571c56&oe=5FCE73A8"
                  alt="">
              </v-img>
            </v-avatar>
          </div>

          <div id="leafId">
            <leaf1 class="small_leaf" v-if="updateLeafShape === 1"/>
            <leaf2 class="small_leaf" v-else-if="updateLeafShape === 2"/>
            <leaf3 class="small_leaf" v-else-if="updateLeafShape === 3"/>
            <leaf4 class="small_leaf" v-else-if="updateLeafShape === 4"/>
            <leaf5 class="small_leaf" v-else-if="updateLeafShape === 5"/>
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
              v-model="updateDiscription"
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
        <div style="text-align: center;">
          <v-btn
              v-if="invalid"
              color=var(--dark-color)
              elevation="2"
              :ripple="false"
              :disabled="invalid"
          >
            confirm
          </v-btn>
          <v-btn
              v-if="!invalid"
              color=var(--dark-color)
              elevation="2"
              :ripple="false"
              type="submit"
              dark
          >
            confirm
          </v-btn>
        </div>
      </form>
    </validation-observer>

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
    leaf_dialog: false,
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
  },

  computed: {
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
    updateDiscription: {
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
    }
  }

}
</script>

<style scoped>

.text_field {
  background-color: white;
  max-width: 500px;
  width: 100%;
  padding: 6px 16px;
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

#leafId {
  grid-area: 2 / 3 / 3 / 4;
  margin: auto;
}

.avatars {
  margin: 6px -6px 20px;
}

.leaf {
  width: 15vw;
  height: 15vw;
  margin: 1vw 1vw;
}

.parent {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 1vw;
}

.top_row {
  grid-area: 1 / 1 / 2 / 7;
  margin: auto;
}

.bottom_row {
  grid-area: 2 / 2 / 3 / 6;
  margin: auto;
}

.small_leaf {
  margin: 6px 20px;
  height: 48px;
  width: auto;
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
  color: gray !important;
}

</style>