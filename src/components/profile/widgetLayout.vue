<template>
   <v-card-title class="align-center justify-center d-flex"
          >Widgets</v-card-title>
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
</template>
<script>
export default {
  name: 'widgetLayout',
  emits: ['triggerDialog'],
  methods : {
    triggerDialog(payload) {
      this.$emit('triggerDialog', payload);
    },
  },
};
</script>
<style scoped>
 /* make v-img show click mouse icon on mouse hover */
  .v-img:hover {
    cursor: pointer;
  }
</style>
