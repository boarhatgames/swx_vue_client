<template>
  <v-app theme="dark" full-height>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <!-- <snackBar :snackbar="snackbar" /> -->
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
// import snackBar from './components/utils/snackBar.vue';
export default {
  name: 'App',
  components: {
    Header,
    // snackBar,
  },

  data: () => ({
    snackbar: {
      visible: false,
      text: '',
      color: '',
      icon: '',
      timeout: 3000,
    },
  }),

  methods: {
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
    // eslint-disable-next-line no-console
    log(...args) {
      console.log(...args);
    },
    updateHeader(url) {
      this.$refs.header.updateHeader(url);
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
