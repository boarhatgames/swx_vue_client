<template>
  <S2W :items="items" />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import S2W from '../components/S2W.vue';

export default defineComponent({
  name: 'SpinToWin',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    S2W,
  },
});
</script>
