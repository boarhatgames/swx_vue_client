<template>
  <v-snackbar
    v-model="show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    variant="tonal"
    transition="true"
  >
    {{ snackbar.text }}
    <v-icon class="float-right">{{ snackbar.icon }}</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  name: 'snackBar',
  props: {
    snackbar: {
      type: Object,
      required: true,
    },
  },
  computed: {
    show: {
      get() {
        return this.snackbar.visible;
      },
    },
  },
};
</script>
