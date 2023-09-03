<template>
  <v-container height="50" style="background-color:#222" fluid >
    <v-row >
    <v-col cols="3" >

      <p class="d-flex justify-center"> Select Avatar </p>

    </v-col>
    <v-col cols="6"> 
      <p class="d-flex justify" > Select Space </p>
    </v-col>
    <!-- show a flashing green dot -->
    <v-col cols="3" >
      <!-- <v-row> -->

      <!-- show the current time -->
      <v-chip color="blue" class="white--text float-right">
        <v-icon>mdi-clock</v-icon> {{ time }}
      </v-chip>
      <v-chip color="green" class="white--text float-right">
        <v-icon :color="flashG">mdi-circle</v-icon> X Playing Now
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
      online: false,
      flashG: '#46a239',
      // exclude seconds
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },

  mounted() {
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
  },
};
</script>
