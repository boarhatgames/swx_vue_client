<template>
  <v-btn color="primary" dark @click="close" />
</template>
<script>
export default {
  name: 'Register',
  methods: {
    close() {
      window.close();
    },
  },
};
</script>
