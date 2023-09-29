<template>
  <!--&lt;!&ndash;  iframe router source-->
  <iframe
    :src="'https://smallworlds.app' + url"
    ref="frame"
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
    //update header url when onload is called
    frameChange() {
      //what is the url of the frame?
      // this.url = document.querySelector('iframe').contentWindow.location.href;
      //pass url to header
      //update the current url to the frame address
      // this.url = router.currentRoute.value.path;
      this.$emit(
        'updateHeader', //get url from iframe
        this.url
      );
      console.log(this.url);
    },

    // eslint-disable-next-line no-console
    async getSpaceName(spaceId) {
      //does url have home in it or space? if has home then set home to true
      if (this.url.includes('home')) {
        this.home = true;
        this.type = 'home';
      }
      this.type = 'space';

      const response = await fetch(
        '/api/space/name/' + this.type + '/' + spaceId
      );
      const data = await response.json();
      this.spaceName = data.name;
      this.spaceDesc = data.desc.toString();
    },
  },
  async mounted() {
    const iFrame = this.$refs.frame;
    iFrame.addEventListener('load', () => {
      // get url of iframe
      this.url = iFrame.contentWindow.location.href;
      //remove the https://smallworlds.app from the url and add the rest to our router
      this.url = this.url.replace('https://smallworlds.app', '');
      //update the current url to the frame address
      console.log(this.url);
      this.frameChange();
      router.push(this.url);
      this.spaceId = router.currentRoute.value.path.replace(/[^0-9]/g, '');

    });
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
  //listen for when iframe url changes
  watch: {},
});
</script>
