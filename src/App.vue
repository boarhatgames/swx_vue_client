<template>
  <v-app theme="dark" full-height>
    <Header @frameChange="" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {
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
