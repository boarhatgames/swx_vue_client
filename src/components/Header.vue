<template>
  <!-- <v-card height="100%">
    <v-layout> -->
  <div v-if="auth.$state.isLoggedIn">
  <!-- include profileHeader.vue here -->
  <v-navigation-drawer v-model="drawer" temporary   
 >

    <profileHeader 
    v-if="($route.name === 'profile') || ($route.name === 'root') 
    || ($route.name === 'not-found')"
    :user="user" :petActive="petActive" :headerActive="headerActive" :experActive="experActive"
    :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin"
    :hasInviteControl="hasInviteControl" :hasWebsiteControl="hasWebsiteControl" :hasRemember="hasRemember" @triggerDialog="triggerDialog" 
    @switchToggle="switchToggle" @smi="smi" @getCurrentRoutes="getCurrentRoutes"
    />
    <inworldHeader v-if="($route.name === 'space')"
    :user="user" :petActive="petActive" :headerActive="headerActive" :experActive="experActive"
    :isAdmin="isAdmin" :isSuperAdmin="isSuperAdmin" :hasInviteControl="hasInviteControl" :hasWebsiteControl="hasWebsiteControl" 
    :hasRemember="hasRemember" @triggerRDialog="triggerRDialog" @triggerDialog="triggerDialog"
    @switchToggle="switchToggle" @smi="smi" @getCurrentRoutes="getCurrentRoutes"
    />
    <smiHeader 
    v-else-if="$route.path === '/smi'"
    :user="user"
    @getCurrentRoutes="getCurrentRoutes"
    />
    <template v-slot:append v-if="$route.name !== 'smi'">
      <div class="pa-2">
        <v-tooltip v-model="show" location="top">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon color="info" @click="copyURL"> mdi-content-copy </v-icon>
            </v-btn>
          </template>
          <span ref="tool">Copy Current URL</span>
        </v-tooltip>

        <v-tooltip v-model="show_f" location="top" v-if="hasRemember">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon color="info" @click="forget"> mdi-account-switch </v-icon>
            </v-btn>
          </template>
          <span ref="forgot">Forget this account & logout</span>
        </v-tooltip>
      </div>

      <div class="pa-2">
        <v-btn block color="red" @click="logout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  </div>

  <div class="titlebar" v-else-if="os === 'Windows'"></div>
  <v-app-bar
    :elevation="4"
    rounded
    style="-webkit-app-region: drag; font-size: 14px"
    height="32"
  >
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    <!-- show current url but make it editable-->
    <v-row no-gutters>
      <v-col
        cols="1"
        v-if="isLoggedIn"
        style="
          flex: 0 !important;
          align-self: center;
          -webkit-app-region: no-drag;
        "
      >
        <v-btn icon @click="toggleDrawer()">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex fill-height align-left justify">
        <!-- on press of textfield go to url -->
        <!-- Add drawer icon button if isLogged in -->

        <v-text-field
          v-model="url"
          hide-details
          prepend-inner-icon="mdi-earth"
          @keydown.enter="
            url = $event.target.value;
            gotoUrl(url);
          "
          style="-webkit-app-region: no-drag"
        ></v-text-field>
      </v-col>
      <v-col align-self="center">
        <!-- add reload button -->
        <v-btn icon @click="reload()" style="-webkit-app-region: no-drag">
          <v-icon size="18">mdi-reload</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="2"
        align-self="center"
        @mouseover="colorBtns"
        @mouseleave="resetBtns"
        style="-webkit-app-region: no-drag"
      >
        <v-btn
          icon
          :color="x"
          @click="close()"
          class="float-right"
          style="padding: 0 20px; width: 30px"
        >
          <v-icon size="18">mdi-circle</v-icon>
        </v-btn>

        <v-btn
          icon
          :color="min"
          @click="minWindow"
          class="float-right"
          style="width: 10px"
        >
          <v-icon size="18">mdi-circle</v-icon>
        </v-btn>
        <v-btn
          icon
          :color="max"
          @click="maxWindow()"
          class="float-right"
          style="padding: 0 20px; width: 10px"
        >
          <v-icon size="18">mdi-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
  <aDialog 
    :visible="showRDialog"
    :content="panel"
    @close="showRDialog = false"
    @triggerRDialog="triggerRDialog"
  />
  <vdialog
    :visible="showDialog"
    :content="panel"
    @close="showDialog = false"
    @triggerDialog="triggerDialog"
  />

</template>

<script>
// import { ipcRenderer } from 'electron';
import { useAuthStore } from '@stores/auth.js';
import { useUserStore } from '@stores/user.js';
import router from '@/router';
import axios from 'axios';
import vdialog from '@components/utils/dialogFrame.vue';
import aDialog from '@components/utils/dialogAway.vue';
import profileHeader from '@components/profile/header/profileHeader.vue';
import smiHeader from '@components/profile/header/smiHeader.vue';
import inworldHeader from '@components/profile/header/inworldHeader.vue';
export default {
  name: 'Header',

  components: {
    vdialog,
    profileHeader,
    smiHeader,
    inworldHeader,
    aDialog,
  },

  data() {
    return {
      auth: useAuthStore(),
      user: useUserStore(),
      showDialog: false,
      showRDialog: false,
      panel: {
        url: '',
        width: 0,
        height: 0,
        persistent: false,
        data: '',
      },
      drawer: false,
      show: false,
      show_f: false,
      petActive: false,
      headerActive: false,
      experActive: false,
      snackbar: {
        visible: false,
        text: '',
        color: '',
        icon: '',
        timeout: 3000,
      },
      // eslint-disable-next-line no-undef
      url: window.location.href,
      space: ' ',
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: true,
      os: '',
      x: 'grey',
      min: 'grey',
      max: 'grey',
    };
  },

  methods: {
    triggerDialog(data) {
      this.showDialog = true;
      this.panel.url = data.url;
      this.panel.width = data.width;
      this.panel.height = data.height;
      this.panel.persistent = data.persistent;
    },
    triggerRDialog(data) {
      this.showRDialog = true;
      this.panel.url = data.url;
    },
    switchToggle(toggle) {
      // this.petActive = !this.petActive;
      if (toggle === 'updateTakePet') this.petActive = !this.petActive;
      if (toggle === 'header') this.headerActive = !this.headerActive;
      if (toggle === 'experiment') this.experActive = !this.experActive;
      this.user.$patch({
        defaultAvatar: {
          takePet: this.petActive,
          header: this.headerActive,
          experiment: this.experActive,
        },
      });
      this.user.updateState(this.user.$state);
      this.callToggle(toggle);
    },

    async callToggle(toggle) {
      let token = JSON.parse(localStorage.getItem('AUTH_STATE')).token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('/api/avatar/' + toggle, {
        id: this.user.$state.defaultAvatar.id,
        enableExperi: this.experActive,
        enableHeader: this.headerActive,
        takePet: this.petActive,
      });
    },
    smi() {
      window.frame.smi();
    },
    copyURL() {
      // copy url to clipboard
      navigator.clipboard.writeText(this.url);
      //call triggerSnackbar method in profile.vue
      //make tooltip appear and say copied
      // this.show = true;
      this.$refs.tool.innerText = 'Copied!';
      setTimeout(() => {
        this.$refs.tool.innerText = 'Copy Current URL';
      }, 3000);
    },
    getV() {
      console.log(this.version);
    },
    colorBtns() {
      this.x = 'red';
      this.min = 'yellow';
      this.max = 'green';
    },
    resetBtns() {
      this.x = 'grey';
      this.min = 'grey';
      this.max = 'grey';
    },
    operatingSystem() {
      const platform = navigator.platform;
      if (platform.indexOf('Win') !== -1) return 'Windows';
      if (platform.indexOf('Mac') !== -1) return 'Mac OS';
      if (platform.indexOf('Linux') !== -1) return 'Linux';
      return 'Unknown';
    },
    commas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getCurrentRoutes() {
      if (router.currentRoute.value.path == '/') {
        return '/profile';
      }
      return router.currentRoute.value.path;
    },

    toggleDrawer() {
      // v-navigation-drawer v-model="drawer"
      this.drawer = !this.drawer;
    },
    gotoUrl(url) {
      // block all urls other than smallworlds.app
      if (!url.includes('smallworlds.app')) {
        alert('Please stay within the app.');
        return;
      }
      // always go to url
      window.location.href = url;
      // this.reload();
    },
    reload() {
      // reload page
      window.location.reload();
    },
    maxWindow() {
      // maximize window
      // window.win.maximize();
      window.frame.maximize();
    },
    minWindow() {
      // minimize window
      window.frame.minimize();
    },
    close() {
      // close window
      window.close();
    },
    logout() {
      this.auth.logout();
      // router.push({ path: '/login' });
    },
    updateHeader(url) {
      this.url = url;
    },
    forget() {
      localStorage.removeItem('remember');
      window.frame.forget();
      this.$refs.forgot.innerText = 'Account Forgotten, Redirecting...';
      setTimeout(() => {
        this.$refs.forgot.innerText = 'Forget this account & logout';
        this.logout();
      }, 2000);
    },
  },

  //when router changes update url
  mounted() {
    this.os = this.operatingSystem();
    // if router is /profile then set space to nothing
    if (this.isLoggedIn) {
      this.petActive = this.user.$state.defaultAvatar.takePet ? true : false;
      this.headerActive = this.user.$state.defaultAvatar.header ? true : false;
      this.experActive = this.user.$state.defaultAvatar.experiment
        ? true
        : false;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    },

    $route(to) {
      this.url = window.location.href;
      // console.log(this.isLoggedIn);
     
    },
  },

  emits: ['update:group'],
  computed: {
    isLoggedIn() {
      return this.auth.$state.isLoggedIn;
    },
    isAdmin() {
      return (
        this.auth.$state.primaryGroupId == 1 ||
        this.auth.$state.primaryGroupId == 2 ||
        this.auth.$state.primaryGroupId == 13
      );
    },
    hasWebsiteControl() {
      return this.auth.$state.secondaryGroupIds.includes(17);
    },
    hasInviteControl() {
      return this.auth.$state.secondaryGroupIds.includes(22);
    },
    isSuperAdmin() {
      return this.auth.$state.primaryGroupId == 1;
    },
    hasRemember() {
      return localStorage.getItem('remember') == 'true';
    },
  },
};
</script>
