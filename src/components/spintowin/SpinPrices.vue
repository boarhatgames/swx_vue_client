<template>
  <v-expansion-panel value="prices">
    <v-expansion-panel-title class="d-flex justify-start">
      <v-row no-gutters>
        <v-col cols="4" class="d-flex justify-start">
          Deluxe Wheel Pricing
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="4">
          Price 1
          <v-text-field
            label="Spins"
            outlined
            dense
            type="number"
            :placeholder="spins1"
            hint="Number of Spins"
            v-model="spins1"
            ref="spins1"
          />
          <v-text-field
            label="Cost"
            outlined
            dense
            type="number"
            :placeholder="gold1"
            hint="Cost in Gold"
            v-model="gold1"
            ref="gold1"
          />
        </v-col>
        <v-col cols="4">
          Price 2
          <v-text-field
            label="Spins"
            outlined
            dense
            type="number"
            :placeholder="spins2"
            hint="Number of Spins"
            v-model="spins2"
            ref="spins2"
          />
          <v-text-field
            label="Cost"
            outlined
            dense
            type="number"
            :placeholder="gold2"
            hint="Cost in Gold"
            v-model="gold2"
            ref="gold2"
          />
        </v-col>

        <!-- <v-divider vertical class="mx-4"></v-divider> -->

        <v-col cols="4">
          Price 3
          <v-text-field
            label="Spins"
            outlined
            dense
            type="number"
            :placeholder="spins3"
            hint="Number of Spins"
            v-model="spins3"
            ref="spins3"
          />
          <v-text-field
            label="Cost"
            outlined
            dense
            type="number"
            :placeholder="gold3"
            hint="Cost in Gold"
            v-model="gold3"
            ref="gold3"
          />
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="grey" @click="clearPrices"
          >Clear All
        </v-btn>
        <v-btn variant="text" color="green" @click="savePrices">
          Save All
        </v-btn>
      </v-card-actions>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
export default {
  name: 'SpinPrices',

  methods: {
    async getSpinPrices() {
      // Get Spin Prices
      const resp = await fetch('/api/s2w/prices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == 1) {
          this.spins1 = data[i].spins;
          this.gold1 = data[i].price;
        } else if (data[i].id == 2) {
          this.spins2 = data[i].spins;
          this.gold2 = data[i].price;
        } else if (data[i].id == 3) {
          this.spins3 = data[i].spins;
          this.gold3 = data[i].price;
        }
      }

      return data;
    },
    clearPrices() {
      this.spins1 = null;
      this.gold1 = null;
      this.spins2 = null;
      this.gold2 = null;
      this.spins3 = null;
      this.gold3 = null;
    },
    savePrices() {
      this.$store.commit('setSpinPrices', {
        spins1: this.spins1,
        gold1: this.gold1,
        spins2: this.spins2,
        gold2: this.gold2,
        spins3: this.spins3,
        gold3: this.gold3,
      });
    },
  },
  mounted() {
    this.getSpinPrices();
  },
};
</script>
