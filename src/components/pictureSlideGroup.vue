<template>
  <div style="width: 100%">
    <div class="first_pic_btn_container">
      <v-card
          v-if="updateDiscoveryImages.length === 0"
          class="added_discovery_images ma-2"
          color=var(--light-color)
          style="width: 80vw; max-width: 350px"
          ripple
          @click="$refs.camera_no_pic.click()"
      >
        <input type="file" ref="camera_no_pic" accept="image/*" capture="camera" style="display: none;"  @change="addImage"/>
        <v-icon class="add_photo_svg" style="width: 80vw; max-width: 350px" size="68" color="white">
          {{ mdiCameraPlus }}
        </v-icon>
      </v-card>
    </div>
    <v-slide-group
        v-if="updateDiscoveryImages.length !== 0"
        show-arrows="desktop"
    >
      <v-slide-item>
        <v-card
            class="added_discovery_images ma-2"
            color=var(--light-color)
            style="width: 160px"
            ripple
            @click="$refs.camera.click()"
            :disabled="updateDiscoveryImages.length >= 5"
        >
          <input type="file" ref="camera" accept="image/*" capture="camera" style="display: none;"  @change="addImage"/>
          <v-icon class="add_photo_svg" style="width: 160px" size="68" color="white">
            {{ mdiCameraPlus }}
          </v-icon>
        </v-card>
      </v-slide-item>
      <v-slide-item
          v-for="image in updateDiscoveryImages"
          :key="image"
      >
        <div style="position: relative">
          <div class="delete_button_container">
            <v-btn
                elevation="2"
                fab
                x-small
                @click="deleteImage(image)"
                color="error"
                raised
            >
              <v-icon>{{ mdiDelete }}</v-icon>
            </v-btn>
          </div>
          <v-img class="added_discovery_images ma-2" :src="image.photoPath"></v-img>
        </div>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import {mdiCameraPlus} from '@mdi/js';
import {mdiDelete} from '@mdi/js';
export default {
  name: "pictureSlideGroup",

  data:()=>({
    mdiCameraPlus: mdiCameraPlus,
    mdiDelete: mdiDelete
  }),

  computed:{
    updateDiscoveryImages(){
      return this.$store.getters.getDiscoveryImages;
    },
  },

  methods:{
    addImage(event){
      let maxSize = 1024
      let imageFile = event.target.files[0]
      const reader = new FileReader();
      if (event.target.files.length>0) {
        let size = imageFile.size / maxSize / maxSize
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.updateSnackBarMessage('Please choose an image file');
          this.$store.commit('updateSnackbar', true);
        } else if (size>16) {
          // check whether the size is greater than the size limit
          this.updateSnackBarMessage('Your file is too big! Please select an image under 16MB');
          this.$store.commit('updateSnackbar', true);
        } else {
          let newImage = {'photoPath': null};
          reader.onload = e => {
            newImage.photoPath = e.target.result;
            this.$store.commit('pushNewDiscoveryImage', newImage);
          };
          reader.readAsDataURL(imageFile);
        }
      }
    },

    deleteImage(image){
      console.log(this.$store.getters.getDiscoveryImages.indexOf(image));
      if (this.$store.getters.getDiscoveryImages.length === 1){
        this.updateSnackBarMessage('You need at least 1 image!');
        this.$store.commit('updateSnackbar', true);
      }
      else{
        this.$store.commit('deleteDiscoveryImage', image);

      }
    },
    updateSnackBarMessage(value){
      this.$store.commit('updateSnackbarMessage', value);
    }
  }
}
</script>

<style scoped>

.add_photo_svg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.first_pic_btn_container {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
</style>