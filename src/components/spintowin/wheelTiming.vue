<template>
  <v-expansion-panel value="timing">
    <v-expansion-panel-title class="d-flex justify-start">
      <v-row no-gutters>
        <v-col cols="4" class="d-flex justify-start">
          Basic Wheel Timing
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="5">
          <v-text-field
            label="Duration"
            outlined
            dense
            type="number"
            :placeholder="duration"
            hint="Duration in Seconds"
            v-model="duration"
            ref="duration"
          />
        </v-col>

        <v-divider vertical class="mx-4"></v-divider>

        <v-col cols="3"> Set Default Duration </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="grey" @click="duration = null"
          >Clear
        </v-btn>
        <v-btn
          variant="text"
          color="green"
          @click="$emit('saveTiming', duration)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'WheelTiming',

  methods: {
    async getTiming() {
      const response = await fetch('/api/s2w/timing');
      const data = await response.json();
      return (this.duration = data.duration);
    },
  },

  mounted() {
    this.getTiming();
  },

  emits: ['saveTiming'],
};
</script>
