<template>
  <CurrencyHeader />
  <OnlineHeader />
  <Profile />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Profile from '../components/Profile.vue';
import CurrencyHeader from '../components/CurrencyHeader.vue';
import OnlineHeader from '@/components/OnlineHeader.vue';
import snackBar from '../components/utils/snackBar.vue';
export default defineComponent({
  name: 'ProfileView',

  components: {
    CurrencyHeader,
    OnlineHeader,
    Profile,
    snackBar,
  },
});
</script>