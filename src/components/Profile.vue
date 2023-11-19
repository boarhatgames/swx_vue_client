<template>
  <v-container fluid style="background-color: #333; height: 100%">
    <v-row>
      <v-col cols="3">
        <aviLayout :user="user" />
      </v-col>
      <v-col cols="7">  
        <spacesLayout :spaces="spaces" 
        :rightActive="rightActive"
        :leftActive="leftActive"
        :mySpacesActive="mySpacesActive"
        :favsActive="favsActive"
        :featuredActive="featuredActive"
        :popularActive="popularActive"
        @changeTab="changeTab"
        @nextSpace="nextSpace"
        @prevSpace="prevSpace"
        />
      </v-col>
      <v-col cols="2">
       <widgetLayout @triggerDialog="triggerDialog" />
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
import aviLayout from '@components/profile/aviLayout.vue';
import spacesLayout from '@components/profile/spacesLayout.vue';
import widgetLayout from '@components/profile/widgetLayout.vue';
export default {
  name: 'Profile',
  components: {
    snackBar,
    vdialog,
    aviLayout,
    spacesLayout,
    widgetLayout,
  },

  data() {
    return {
      user: useUserStore(),
      auth: useAuthStore(),
      spaces: [],
      tab: 'mySpaces',
      onlineAvi: null,
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
