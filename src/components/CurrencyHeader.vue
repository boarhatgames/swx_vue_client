<template>
  <!-- on right side, has gold icon with gold amount, token icon with token amount and vip icon -->
  <!-- <v-row> -->
  <!-- put image siteBG.png -->

  <v-card image="siteBG.png" height="100">
    <br />
    <v-row>
      <!-- </v-col> -->
      <v-col cols="10">
        <!-- add swxlogo.png -->
        <v-img src="swxlogo.png" height="65" width="275"></v-img>
      </v-col>

      <!-- wrap in circular pill -->
      <!-- move to the right side -->
      <v-col cols="2">
        <br />
        <v-row>
          <!-- prepend image for the icon gold.png -->

          <v-chip color="yellow">
            <v-img src="balance_gold.png" height="20" width="20"></v-img>
            {{ numberWithCommas(user.$state.goldBalance) }}
          </v-chip>
          <v-chip color="orange">
            <v-img src="balance_token.png" height="20" width="20"></v-img>
            {{ numberWithCommas(user.$state.tokensBalance) }}
          </v-chip>
          <!-- vip_on.png next to vchip-->
          <!-- <img src="vip_on.png" /> -->
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  <!-- </v-row> -->

  <!-- </v-col> -->
  <!-- <v-card> -->
</template>

<script>
import { useUserStore } from '@/stores/user.js';
export default {
  name: 'CurrencyHeader',
  data() {
    return {
      user: useUserStore(),
    };
  },
  methods:
  {
    //add commas to numbers
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  }
};
</script>
