<template>
  <!-- <v-card height="100%">
    <v-layout> -->
  <v-navigation-drawer v-model="drawer" temporary v-if="auth.$state.isLoggedIn">
    <v-list-item
      :prepend-avatar="user.$state.defaultAvatar.thumbUrl"
      :title="user.$state.firstName + space + user.$state.lastName"
    ></v-list-item>
    <!-- add user gold + tokens -->
    <!-- align center -->
    <!-- <v-list-item>
      <v-chip color="yellow" style="float: left">
        <v-img src="balance_gold.png" height="20" width="20"></v-img>
        {{ commas(user.$state.goldBalance) }}
      </v-chip>
      <v-chip color="orange" style="float: right">
        <v-img src="balance_token.png" height="20" width="20"></v-img>
        {{ commas(user.$state.tokensBalance) }}
      </v-chip>
    </v-list-item> -->

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Profile"
        value="profile"
        :active="getCurrentRoutes() === '/profile'"
        @click="
          // if active is false then go to profile
          if (getCurrentRoutes() !== '/profile')
            $emit('update:group', 'profile'),
              $router.push('/profile'),
              (drawer = false);
        "
      ></v-list-item>

      <!-- <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item> -->
      <v-list-group value="toggles">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-tune-variant"
            title="Toggles"
            value="home"
          ></v-list-item>
        </template>
        <v-list-item value="pet">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-switch color="info" :model-value="isActive"></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>Take Pet</v-list-item-title>

          <v-list-item-subtitle> In-World </v-list-item-subtitle>
        </v-list-item>
        <v-list-item value="header">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-switch color="info" :model-value="isActive"></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>SW Header</v-list-item-title>
        </v-list-item>
        <v-list-item value="experiment">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-switch color="info" :model-value="isActive"></v-switch>
            </v-list-item-action>
          </template>

          <v-list-item-title>Experimental</v-list-item-title>

          <v-list-item-subtitle> No PHP </v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
      <v-list-group value="settings">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-cog"
            title="Settings"
            value="home"
          ></v-list-item>
        </template>
        <v-list-item title="View Items Wearing" value="itemsWorn" />
        <v-list-item to="settings" title="Account" value="account" />
      </v-list-group>
      <v-list-group value="admin">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-gavel"
            title="Admin"
            value="home"
          ></v-list-item>
        </template>
        <v-list-item title="SMI" value="SMI" />
        <v-list-item title="Upload" value="upload" />
        <v-list-item title="Invite" value="invite" />
        <v-list-item title="Config Strings" value="config" />
        <v-list-item title="Database" value="database" />

        <v-list-group value="items">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Item Functions"
              value="itemFunc"
            ></v-list-item>
          </template>
          <v-list-item title="Fix Items" value="fix" />
          <v-list-item title="Add Items" value="add" />
          <v-list-item title="All Items" value="all" />
          <v-list-item title="Missing Items" value="missing" />
        </v-list-group>
      </v-list-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
  <!-- if is macos -->

  <!-- <v-app-bar
    elevation="0"
    rounded
    style="-webkit-app-region: drag"
    height="25"
    class="titlebar"
    v-if="os === 'Mac OS'"
  /> -->
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
      <!-- <v-col cols="1"> </v-col> -->
      <!-- <v-col cols="3">
        <v-btn icon @click="toggleDrawer()">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col> -->
      <v-col
        cols="1"
        v-if="isLoggedIn"
        style="flex: 0 !important; align-self: center"
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
          @keyup.enter="
            url = $event.target.value;
            gotoUrl(url);
          "
          style="-webkit-app-region: no-drag"
        ></v-text-field>
      </v-col>
      <v-col align-self="center">
        <!-- add reload button -->
        <v-btn icon @click="reload()">
          <v-icon size="18">mdi-reload</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="2"
        align-self="center"
        @mouseover="colorBtns"
        @mouseleave="resetBtns"
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
      <!-- <v-text-field
            label="Prepend inner"
            hide-details
            prepend-icon="mdi-earth"
          ></v-text-field> -->
    </v-row>
  </v-app-bar>

  <!-- <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card> -->
</template>

<script>
// import { ipcRenderer } from 'electron';
import { useAuthStore } from '@/stores/auth.js';
import { useUserStore } from '@/stores/user.js';
import router from '@/router';

export default {
  name: 'Header',

  data() {
    return {
      auth: useAuthStore(),
      user: useUserStore(),
      drawer: false,
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
      if (router.currentRoute.value.path === '/') {
        return '/profile';
      }
      return router.currentRoute.value.path;
    },

    toggleDrawer() {
      // v-navigation-drawer v-model="drawer"
      this.drawer = !this.drawer;
    },
    gotoUrl(url) {
      console.log(url);
      // always go to url
      window.location.href = url;
    },
    reload() {
      // reload page
      window.location.reload();
    },
    maxWindow() {
      // maximize window
      // window.win.maximize();
      window.frame.maximize();
      window.frame.version();
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
  },

  //when router changes update url
  mounted() {
    this.os = this.operatingSystem();
  },
  watch: {
    group() {
      this.drawer = false;
    },

    $route(to) {
      this.url = window.location.href;
    },
    //if iframe url changes then update url
  },

  emits: ['update:group'],
  computed: {
    isLoggedIn() {
      return this.auth.$state.isLoggedIn;
    },
  },
};
</script>
