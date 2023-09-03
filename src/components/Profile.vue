<template>
  <v-container fluid style="background-color: #333">
    <v-row>
      <v-col cols="3">
        <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
          <v-slide-group-item
            v-for="n in 4"
            :key="n"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :color="isSelected ? '#0099cc' : 'grey-lighten-1'"
              class="ma-3"
              height="250"
              width="150"
              @click="toggle"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon v-if="isSelected" color="white" size="48"></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <v-card-title class="align-center justify-center d-flex"
          >Justin</v-card-title
        >
      </v-col>
      <v-col cols="7">
        <!-- <p class="float-left">Spaces</p> -->
        <v-row>
          <v-col cols="12">
            <v-btn class="ma-2 text-none" rounded >
              My Spaces
            </v-btn>
            <v-btn class="ma-2 text-none" rounded> Favorites </v-btn>
            <v-btn class="ma-2 text-none" rounded> Popular </v-btn>
            <v-btn class="ma-2 text-none" rounded> Featured </v-btn>
            <!-- arrow keys to next page use icons -->
            <v-btn class="ma-2 float-right" rounded disabled>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn class="ma-2 float-right" rounded disabled>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card> </v-col
            ><v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card> </v-col
            ><v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card> </v-col
            ><v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card> </v-col
            ><v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="mx-auto"
                height="100"
                max-width="150"
                color="white"
              ></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="2">
        <v-card-title class="align-center justify-center d-flex"
          >Widgets</v-card-title
        >

        <!-- show 3 images widget_pets, widget_spin.png, widget_plants.png -->
        <v-img src="widget_spin.png"></v-img>
        <br />
        <v-img src="widget_pets.png"></v-img>
        <br />
        <v-img src="widget_plants.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Profile',

  data() {
    return {
      model: null,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters',
      ],
      img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    };
  },
};
</script>
