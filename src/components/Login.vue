<template>
  <!-- Login form -->

  <v-row justify="center" no-gutters>
    <!-- shift page down -->
    <v-col cols="6">
      <v-img aspect-ratio="1" class="white--text align-end">
        <v-card
          class="mx-auto"
          height="100"
          max-width="200"
          color="transparent"
          elevation="0"
        ></v-card>
        <v-row>
          <v-card
            color="transparent"
            class="px-8 pb-12 mx-auto mt-5"
            elevation="0"
          >
            <!-- <v-card color="transparent" elevation="0" class="px-8 pb-12 mx-auto"> -->
            <v-card-title class="text-center">
              <v-avatar
                size="104"
                class="mb-5 text-center"
                :image="img"
                style="
                  background: #00000052;
                  border-radius: 50%;
                  border: solid #bbb 1px;
                "
              />
              <h1 class="display-1 font-weight-thin mb-4">Have an Account?</h1>
            </v-card-title>
            <!-- <p class="subheading font-weight-thin mb-4">
              Welcome back! Login to your account to continue.
            </p> -->

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model.trim="credentials.email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
              />
              <v-text-field
                v-model="credentials.password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
                @keydown.enter="handleLogin"
              />
              <!-- remember me btn to left -->
              <!-- <v-col cols="12" sm="6" text-sm-left> -->
              <!-- <v-checkbox text-sm-left label="Remember me" color="primary" /> -->

              <!-- </v-col> -->
              <!--  -->
              <!-- remember me checkbox -->
              <v-row>
                <v-col cols="12" sm="6" text-sm-left>
                  <v-checkbox label="Remember me" color="blue" />
                </v-col>
                <v-col sm="5" text-sm-right>
                  <!-- make it align on same as remember me text -->
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-sm-right">
                  <v-btn variant="text" color="green" @click="handleLogin" block
                    >Login</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-row>
              <v-col cols="12">
                <v-btn variant="text" color="blue" to="invite" block
                  >Invite Code</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-row>
        <!-- add discord button in a v-card -->
        <v-row justify="center" no-gutters>
          <!-- <v-card
            color="transparent"
            elevation="0"
            class="mt-15"
          > -->
          <!-- icon button -->
          <!-- center it -->

          <v-btn
            icon="mdi-discord"
            class="mx-auto"
            href="discord://-/invite/E6mbjz4nkh"
          />
          <!-- </v-card> -->
        </v-row>
      </v-img>
    </v-col>
    <!-- add an random image to the right -->

    <v-col cols="6">
      <v-img
        src="intro.png"
        style="height: -webkit-fill-available"
        alt="Welcome"
      />
    </v-col>
  </v-row>
</template>

<script>
import { reactive, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();

export default {
  name: 'Login',
  data: () => ({
    //grab data.url from api link and set image
    credentials: reactive({
      email: '',
      password: '',
    }),
    snackbar: {
      visible: false,
      text: '',
      color: '',
      icon: '',
      timeout: null,
    },
    doInterval: true,
    img: '',
    emailRules: [
      (value) => {
        if (value) return true;

        return 'E-mail is required.';
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return 'E-mail must be valid.';
      },
    ],
    passwordRules: [
      (value) => {
        if (value) return true;

        return 'Password is required.';
      },
      (value) => {
        if (value.length >= 6) return true;

        return 'Password must be at least 6 characters.';
      },
    ],
  }),

  methods: {
    async handleLogin() {
      try {
        await auth.login(this.credentials);
        window.location.href = '/vueLogin#/vprofile';
      } catch (error) {
        console.log(error);
      }
      this.doInterval = false;

      // go to profile, but refresh header component
    },
    setUserImg(email) {
      fetch(`/api/avatar/head/${email}`)
        .then((response) => response.json())
        .then((data) => {
          this.img = '';
          this.img = data.url;
        });
    },
    setRandom() {
      //if element does not have class pause
      // if (!document.getElementsByClassName('').className.includes('pause')) {
      if (this.doInterval) {
        fetch('/api/avatar/head')
          .then((response) => response.json())
          .then((data) => {
            this.img = '';
            this.img = data.url;
          });
      } else if (this.emailV) {
        clearInterval();
      } else this.doInterval = true;
      // }

      // set img to resp data
    },
  },

  unmounted() {
    // stop setRandom from running
    this.doInterval = false;
    clearInterval();
  },

  async mounted() {
    //call parent function triggerSnackbar

    this.setRandom();
    setInterval(() => {
      this.setRandom();
    }, 10000);
    // await authStore.fetchAuthUser();
    // // is user is logged in, redirect to profile
    // if (authStore.authUser.id !== null) this.$router.push('/profile');
    // set rpc
    window.rpc.setRPC({
      details: 'SmallWorlds X',
      state: 'Logging in...',
      largeImageKey: 'logo',
      largeImageText: 'SWX',
    });
  },

  computed: {
    authUser() {
      return auth.authUser;
    },
  },
  // emits: ['triggerSnackbar'],

  watch: {
    'credentials.email': function (val) {
      //is email valid?
      //has @ and .com
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          val
        )
      ) {
        this.doInterval = false;
        this.emailV = true;
        this.setUserImg(val);
      } else {
        this.emailV = false;
      }
    },
  },
};
</script>
