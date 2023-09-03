<template>
  <Invite />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Invite from '../components/Invite.vue';

export default defineComponent({
  name: 'InviteView',

  components: {
    Invite,
  },
});
</script>
