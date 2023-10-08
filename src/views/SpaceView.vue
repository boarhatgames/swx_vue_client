<template>
  <!--&lt;!&ndash;  iframe router source-->
  <iframe
    ref="frame"
    :src="url"
    style="width: 100%; height: 100%; border: none"
  />
  <!-- show a webpage with axios auth bearer token -->
</template>

<script>
import { defineComponent } from 'vue';
import router from '@/router';
import axios from 'axios';
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
      content: '',
    };
  },
  methods: {
    //
    // async setContents() {
    //   let token = JSON.parse(localStorage.getItem('AUTH_STATE')).token;
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //   // get session cookie from base url
    //   const response = await axios.get(this.url);
    //   //set iframe to response.data

    //   //  this.content = this.$refs.frame.contentWindow.document;
    //   //  this.content.open('text/html', 'replace');
    //   //  this.content.write(response.data);
    //   //  this.content.close();
    // },
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
      if (data.desc != null) this.spaceDesc = data.desc.toString();
      else this.spaceDesc = 'No description';
    },
  },
  async mounted() {
    // await this.setContents();
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
    });
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
  //listen for when iframe url changes
  watch: {},
});
</script>
