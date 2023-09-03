<template>
  <!-- Login form -->

  <v-row justify="center" no-gutters>
    <!-- shift page down -->
    <v-col cols="5">
      <v-img
        src="https://images.unsplash.com/photo-1581093458791-3a3b7f0e7e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        aspect-ratio="1"
        class="white--text align-end"
      >
        <v-card
          class="mx-auto"
          height="100"
          max-width="200"
          color="transparent"
        ></v-card>
        <v-row>
          <v-card
            color="transparent"
            elevation="0"
            class="px-8 pb-12 mx-auto mt-5"
          >
            <!-- <v-card color="transparent" elevation="0" class="px-8 pb-12 mx-auto"> -->
            <v-card-title class="text-center">

              <v-avatar size="104" class="mb-5 text-center" :image="img" />
              <h1 class="display-1 font-weight-thin mb-4">Have an Account?</h1>

            </v-card-title>
            <!-- <p class="subheading font-weight-thin mb-4">
              Welcome back! Login to your account to continue.
            </p> -->

            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
              />
              <!-- remember me btn to left -->
              <!-- <v-col cols="12" sm="6" text-sm-left> -->
              <!-- <v-checkbox text-sm-left label="Remember me" color="primary" /> -->

              <!-- </v-col> -->
              <!--  -->
            </v-form>
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
                <v-btn variant="text" color="green" @click="submit" block
                  >Login</v-btn
                >
              </v-col>
            </v-row>
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

    <v-col cols="5">
      <img
        src="intro.png"
        style="height: -webkit-fill-available"
        alt="Welcome"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    //grab data.url from api link and set image
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
        if (value.length >= 8) return true;

        return 'Password must be at least 8 characters.';
      },
    ],
  }),

  methods: {
    setRandom() {
      //if element does not have class pause
      // if (!document.getElementsByClassName('').className.includes('pause')) {
      fetch('https://smallworlds.app/api/avatar/head')
        .then((response) => response.json())
        .then((data) => {
          this.img = '';
          this.img = data.url;
        });
      // }

      // set img to resp data
    },
  },

  mounted() {
    this.setRandom();
    setInterval(() => {
      this.setRandom();
    }, 10000);
  },
};
</script>
