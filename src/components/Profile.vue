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
        <v-card-title class="align-center justify-center d-flex">
          {{ user.$state.defaultAvatar.fullName }}</v-card-title
        >
      </v-col>
      <v-col cols="7">
        <v-row>
          <v-col cols="12">
            <v-btn
              class="ma-2 text-none active"
              rounded
              @click="changeTab('mySpaces')"
              active
              ref="mySpaces"
            >
              My Spaces
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              ref="myFavs"
              @click="changeTab('favs')"
            >
              Favorites
            </v-btn>
            <v-btn class="ma-2 text-none" rounded @click="changeTab('pop')">
              Popular
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('featured')"
            >
              Featured
            </v-btn>
            <!-- arrow keys to next page use icons -->
            <v-btn class="ma-2 float-right" id="hasNext" rounded disabled>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn class="ma-2 float-right" id="hasPrev" rounded disabled>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row>
            <v-col cols="3" v-for="space in spaces" :key="space.id">
              <v-card
                class="mx-auto"
                height="96"
                max-width="128"
                v-if="space.currentVisitors > 0"
                ref="spaceCard"
                :style="{
                  backgroundImage: 'url(' + space.spaceThumbnailSource + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundBlendMode: 'multiply',
                  backgroundColor: 'rgba(0, 153, 0, 0.5)',
                }"
              ></v-card>
              <v-card
                class="mx-auto"
                height="96"
                max-width="128"
                ref="spaceCard"
                v-else
                :style="{
                  backgroundImage: 'url(' + space.spaceThumbnailSource + ')',
                }"
              ></v-card>
              <p class="d-flex font-weight-bold text-caption justify-center" v-if="space.currentVisitors > 0">
                {{ space.name }} ({{ space.currentVisitors }})
              </p>
              <p class="d-flex font-weight-bold text-caption justify-center" v-else>
                {{ space.name }}
              </p>
              <!-- <p
                v-if="space.currentVisitors > 0"
                class="d-flex font-weight-bold text-caption justify-center"
              >
                <v-chip
                  color="green"
                  class="white--text text-caption"
                  :alt="space.currentVisitors + 'Online Now'"
                >
                  {{ space.currentVisitors }} {{ visitorText }}
                </v-chip>
              </p> -->
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
        <p class="d-flex justify">
          <v-icon color="red">mdi-alert-circle</v-icon>Spin now!
        </p>
        <v-img src="widget_pets.png"></v-img>
        <p class="d-flex justify">
          <v-icon color="green">mdi-check-circle</v-icon>Your pet is well cared
          for!
        </p>

        <v-img src="widget_plants.png"></v-img>
        <p class="d-flex justify">
          <v-icon color="green">mdi-check-circle</v-icon>Your plants are
          healthy.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user.js';
import { useAuthStore } from '@/stores/auth.js';
export default {
  name: 'Profile',

  data() {
    return {
      user: useUserStore(),
      auth: useAuthStore(),
      spaces: [],
      model: null,
      email: '',
      password: '',
      tab: 'mySpaces',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters',
      ],
      img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      onlineAvi: null,
      visitorText: '',
    };
  },

  methods: {
    async getThumb(avatar_id) {
      const res = await fetch('/api//avi/' + avatar_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.auth.$state.token,
        },
      });
      const data = await res.json();
      return data.thumbUrl;
    },
    changeTab(tab) {
      if (this.tab != tab) this.getSpaces(tab);
      this.tab = tab;
    },
    async getSpaces(tab) {
      if (tab == 'mySpaces') {
        const res = await fetch('/api/spaces/mine', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.auth.$state.token,
          },
        });
        const data = await res.json();
        this.spaces = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].currentVisitors > 0)
            this.onlineAvi = await this.getThumb(data[i].visitors[0].avatar_id);
          if (data[i].currentVisitors > 1) this.visitorText = 'Visitors';
          else this.visitorText = 'Visitor';
        }
        
        // });
      } else if (tab == 'favs') {
        
        const res = await fetch('/api/spaces/favs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.auth.$state.token,
          },
        });
        const data = await res.json();
        this.spaces = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].currentVisitors > 0)
            this.onlineAvi = await this.getThumb(data[i].visitors[0].avatar_id);
          if (data[i].currentVisitors > 1) this.visitorText = 'Visitors';
          else this.visitorText = 'Visitor';
        }
        // get favs
      } else if (tab == 'pop') {
        // get popular
      } else if (tab == 'featured') {
        // get featured
      }

            },
  },
  mounted() {
    this.getSpaces(this.tab);
    
  },
};
</script>
