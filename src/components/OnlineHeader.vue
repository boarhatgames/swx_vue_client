<template>
  <v-container height="50" style="background-color: #222" fluid>
    <v-row>
      <v-col cols="3">
        <p class="d-flex justify-center">Select Avatar</p>
      </v-col>
      <v-col cols="6">
        <p class="d-flex justify">Select Space</p>
      </v-col>
      <!-- show a flashing green dot -->
      <v-col cols="3">
        <!-- <v-row> -->

        <!-- show the current time -->
        <v-chip color="blue" class="white--text float-right">
          <v-icon>mdi-clock</v-icon> {{ time }}
        </v-chip>
        <v-chip
          :color="worldOnlineColor"
          class="white--text float-right"
          v-if="online"
        >
          <v-icon :color="flashG">mdi-circle</v-icon> {{ numOnline }} Playing
          Now
        </v-chip>
        <v-chip
          :color="worldOnlineColor"
          class="white--text float-right"
          v-else-if="online != null && online == false"
        >
          Server Offline
        </v-chip>
        <v-chip
          :color="worldOnlineColor"
          class="white--text float-right"
          v-else="!online"
          >Loading...
        </v-chip>
        <!-- </v-row> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'OnlineHeader',

  data() {
    return {
      online: null,
      worldOnlineColor: 'yellow',
      numOnline: -1,
      flashG: '#46a239',
      // exclude seconds
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },

  methods: {
    async onlineAmount() {
      const resp = await fetch('/api/avatar/findtotalonline', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();
      this.numOnline = data[0];
    },
    async worldOnline() {
      const resp = await fetch('/api/world/online', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();
      if (data.online == true) {
        this.online = true;
        this.worldOnlineColor = 'green';
      } else {
        this.online = false;
        this.worldOnlineColor = 'red';
      }
    },
  },

  mounted() {
    this.onlineAmount();
    this.worldOnline();
    setInterval(() => {
      this.time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      if (this.flashG === '#46a239') {
        this.flashG = '#54b347';
      } else {
        this.flashG = '#46a239';
      }
    }, 1000);
    setInterval(() => {
      this.onlineAmount();
      this.worldOnline();
    }, 300000);
  },
};
</script>
