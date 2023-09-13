<template>
  <!-- <v-card height="100%">
    <v-layout> -->
  <v-navigation-drawer v-model="drawer" temporary v-if="auth.$state.isLoggedIn">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="John Leider"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar
    :elevation="4"
    rounded
    style="-webkit-app-region: drag"
    height="50"
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
      <v-col cols="1" v-if="isLoggedIn">
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
            // trigger method
            gotoUrl(url);
          "
        ></v-text-field>
      </v-col>
      <v-col>
        <!-- add reload button -->
        <v-btn icon @click="reload()">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <!-- make this float to the right of the screen -->
        <v-btn icon color="red" @click="close()" class="float-right">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <v-btn icon color="yellow" @click="minWindow()" class="float-right">
          <v-icon>mdi-window-minimize</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="maxWindow()" class="float-right">
          <v-icon>mdi-window-maximize</v-icon>
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

export default {
  name: 'Header',

  data() {
    return {
      auth: useAuthStore(),
      drawer: false,
      // eslint-disable-next-line no-undef
      url: window.location.href,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: true,
    };
  },

  methods: {
    toggleDrawer() {
      // v-navigation-drawer v-model="drawer"
      this.drawer = !this.drawer;
    },
    gotoUrl(url) {
      //open url in .v-main

      window.location.href = url;
    },
    reload() {
      // reload page
      window.location.reload();
    },
    maxWindow() {
      // maximize window
      ipcRenderer.send('maximize');
    },
    minWindow() {
      // minimize window
      window.minWindow();
    },
    close() {
      // close window
      window.close();
    },
  },

  //when router changes update url

  watch: {
    group() {
      this.drawer = false;
    },

    $route(to) {

      this.url = window.location.href;
    },


  },
  
  emits: ['update:group'],
  computed: {
    isLoggedIn() {
      return this.auth.$state.isLoggedIn;
    },
  },
};
</script>
