<template>
  <!--&lt;!&ndash;  iframe router source-->
  <iframe
    :src="'https://smallworlds.app' + url"
    style="width: 100%; height: 100%; border: none"
  />
</template>

<script>
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  name: 'SpaceView',
  data() {
    return {
      url: router.currentRoute.value.path,
      // find the number in the url after /space/ and set it to spaceId
      spaceId: null,
      spaceName: null,
      spaceDesc: null,
      home: false,
      type: null,
    };
  },
  methods: {
    // eslint-disable-next-line no-console
    async getSpaceName(spaceId) {
      //does url have home in it or space? if has home then set home to true
      if (this.url.includes('home')) {
        this.home = true;
        this.type = 'home';
      }
      this.type = 'space';

      const response = await fetch(
        'https://smallworlds.app/api/space/name/' + this.type + '/' + spaceId
      );
      const data = await response.json();
      this.spaceName = data.name;
      this.spaceDesc = data.desc.toString();
    },
  },
  async mounted() {
    this.spaceId = router.currentRoute.value.path.replace(/[^0-9]/g, '');
    await this.getSpaceName(this.spaceId);
    await window.rpc.setRPC({
      details: 'At ' + this.spaceName,
      state: this.spaceDesc,
      largeImageKey: 'logo',
      largeImageText: 'SWX',
      startTimestamp: Date.now(),
      // show buttons go there
      buttons: [
        {
          label: 'Go there',
          // app link
          url: 'swx://smallworlds.app' + this.url,
        },
      ],
    });
  },
});
</script>
