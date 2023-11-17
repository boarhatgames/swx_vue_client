<template>
  <v-container fluid style="background-color: #333; height: 81%">
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
        <!-- Display user snapUrl -->
        <v-img
          :src="user.$state.defaultAvatar.snapUrl"
          height="250"
          width="150"
          class="mx-auto"
        ></v-img>
        <v-card-title class="align-center justify-center d-flex">
          {{ user.$state.defaultAvatar.fullName }}</v-card-title
        >
      </v-col>
      <v-col cols="7">
        <v-row>
          <v-col cols="12">
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('mySpaces')"
              ref="mySpaces"
              :class="{ 'v-btn--active': mySpacesActive }"
            >
              My Spaces
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              ref="myFavs"
              @click="changeTab('favs')"
              :class="{ 'v-btn--active': favsActive }"
            >
              Favorites
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('pop')"
              :class="{ 'v-btn--active': popularActive }"
            >
              Popular
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('featured')"
              ref="featured"
              :class="{ 'v-btn--active': featuredActive }"
            >
              Featured
            </v-btn>
            <!-- arrow keys to next page use icons -->
            <v-btn
              class="ma-2 float-right"
              id="hasNext"
              rounded
              :class="{ 'v-btn--disabled': rightActive }"
              @click="nextSpace"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              class="ma-2 float-right"
              id="hasPrev"
              rounded
              :class="{ 'v-btn--disabled': leftActive }"
              @click="prevSpace"
            >
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
                @click="this.$router.push('/space/' + space.id + '/')"
                v-else
                :style="{
                  backgroundImage: 'url(' + space.spaceThumbnailSource + ')',
                }"
              ></v-card>
              <p
                class="d-flex font-weight-bold text-caption justify-center"
                v-if="space.currentVisitors > 0"
              >
                {{ space.name }} ({{ space.currentVisitors }})
              </p>
              <p
                class="d-flex font-weight-bold text-caption justify-center"
                v-else
              >
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
        <!-- make v-img clickable -->
        <v-img
          src="imgs/widget_spin.png"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/panel/spintowin',
              width: '780px',
              height: '650px',
            })
          "
        ></v-img>
        <p class="d-flex justify">
          <v-icon color="red">mdi-alert-circle</v-icon>Spin now!
        </p>
        <v-img
          src="imgs/widget_pets.png"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/panel/pet',
              width: '218px',
              height: '280px',
            })
          "
        ></v-img>
        <p class="d-flex justify">
          <v-icon color="green">mdi-check-circle</v-icon>Your pet is well cared
          for!
        </p>

        <v-img
          src="imgs/widget_plants.png"
          @click="
            triggerDialog({
              url: 'https://smallworlds.app/panel/plant',
              width: '218px',
              height: '280px',
            })
          "
        ></v-img>
        <p class="d-flex justify">
          <v-icon color="green">mdi-check-circle</v-icon>Your plants are
          healthy.
        </p>
      </v-col>
    </v-row>
    <snackBar :snackbar="snackbar" />
    <vdialog
      :visible="showDialog"
      :content="panel"
      @close="showDialog = false"
    />
  </v-container>
</template>
<script>
import { useUserStore } from '@stores/user.js';
import { useAuthStore } from '@stores/auth.js';
import snackBar from '@components/utils/snackBar.vue';
import vdialog from '@components/utils/dialogFrame.vue';
export default {
  name: 'Profile',
  components: {
    snackBar,
    vdialog,
  },

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
      img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      onlineAvi: null,
      visitorText: '',
      mySpaces: [],
      favs: [],
      featured: [],
      popular: [],
      mySpacesActive: true,
      favsActive: false,
      featuredActive: false,
      popularActive: false,
      initialSpaceLoad: true,
      rightActive: true,
      leftActive: true,
      nextArr: [],
      prevArr: [],
      spaceArr: [],
      snackbar: {
        visible: false,
        text: '',
        color: '',
        icon: '',
        timeout: 0,
      },
      showDialog: false,
      panel: {
        url: '',
        width: 0,
        height: 0,
      },
      currentPage: 0,
    };
  },
  methods: {
    triggerDialog(data) {
      this.showDialog = true;
      this.panel.url = data.url;
      this.panel.width = data.width;
      this.panel.height = data.height;
    },
    triggerSnackbar(data) {
      this.snackbar.visible = data.visible;
      this.snackbar.text = data.text;
      this.snackbar.color = data.color;
      this.snackbar.icon = data.icon;
      this.snackbar.timeout = data.timeout;
      setTimeout(() => {
        this.snackbar.visible = false;
      }, this.snackbar.timeout);
    },
    updateDuration(data) {
      this.durationData = data;
    },

    async getThumb(avatar_id) {
      const res = await fetch('/api/avi/' + avatar_id, {
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
      if (this.tab !== tab) this.getSpaces(tab);
      this.tab = tab;
      // remove v-btn--active from all buttons
      if (tab === 'mySpaces') {
        this.mySpacesActive = true;
        this.favsActive = false;
        this.featuredActive = false;
        this.popularActive = false;
      } else if (tab === 'favs') {
        this.mySpacesActive = false;
        this.favsActive = true;
        this.featuredActive = false;
        this.popularActive = false;
      } else if (tab === 'featured') {
        this.mySpacesActive = false;
        this.favsActive = false;
        this.featuredActive = true;
        this.popularActive = false;
      } else if (tab === 'pop') {
        this.mySpacesActive = false;
        this.favsActive = false;
        this.featuredActive = false;
        this.popularActive = true;
      }
    },

    nextSpace() {
      if (this.currentPage + 1 < this.spaceArr.length) {
        this.prevArr = this.spaces;
        this.spaces = this.nextArr;
        this.currentPage++;
        this.nextArr = this.spaceArr[this.currentPage + 1];
        this.leftActive = false;
        this.rightActive = this.currentPage + 1 >= this.spaceArr.length;
      }
    },
    prevSpace() {
      if (this.currentPage > 0) {
        this.nextArr = this.spaces;
        this.spaces = this.prevArr;
        this.currentPage--;
        this.prevArr = this.spaceArr[this.currentPage - 1];
        this.rightActive = false;
        this.leftActive = this.currentPage <= 0;
      }
    },

    async getSpaces(tab) {
      if (this.initialSpaceLoad) {
        this.initialSpaceLoad = false;
        const res = await fetch('/api/spaces/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.auth.$state.token,
          },
        });
        const data = await res.json();
        this.mySpaces = data.mySpaces;
        this.spaces = this.mySpaces;
        this.myFavs = data.myFavs;
        this.featured = data.featured;
        // return;
      }
      if (tab === 'mySpaces') {
        this.spaces = [];
        this.spaceArr = [];
        this.spaces = this.mySpaces;
        this.spaceArr = this.mySpaces;

        // set pages
        // spaces is a 2d array
        if (this.spaces.length > 1) {
          this.rightActive = false;
          this.nextArr = this.spaces[1];
        } else {
          this.nextArr = [];
          this.rightActive = true;
        }
        this.leftActive = true;
        // set array at index 0
        this.spaces = this.spaces[0];
        this.prevArr = this.spaces[0];
      } else if (tab === 'favs') {
        this.spaces = [];
        this.spaceArr = [];
        this.spaces = this.myFavs;
        this.spaceArr = this.myFavs;

        if (this.spaces.length > 1) {
          this.rightActive = false;
          this.nextArr = this.spaces[1];
        } else {
          this.nextArr = [];
          this.rightActive = true;
        }
        // set array at index 0
        this.leftActive = true;
        this.spaces = this.spaces[0];
        this.prevArr = this.spaces[0];
      } else if (tab === 'pop') {
        //TODO
        this.spaces = [];
        if (this.spaces.length > 16) {
          this.rightActive = false;
        } else {
          this.rightActive = true;
          this.leftActive = true;
        }
        // get popular
      } else if (tab === 'featured') {
        // get featured
        this.spaces = [];
        this.spaceArr = [];
        this.spaces = this.featured;
        this.spaceArr = this.featured;
        if (this.spaces.length > 1) {
          this.rightActive = false;
          this.nextArr = this.spaces[1];
        } else {
          this.nextArr = [];
          this.rightActive = true;
        }
        // set array at index 0
        this.currentPage = 0;
        this.leftActive = true;
        this.spaces = this.spaces[0];
        this.prevArr = this.spaces[0];
      }
    },
  },

  mounted() {
    this.getSpaces(this.tab);
    window.rpc.setRPC({
      details: 'SmallWorlds X',
      state: 'Profile',
      largeImageKey: 'logo',
      largeImageText: 'SWX',
    });
  },
};
</script>
