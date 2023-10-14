<template>
  <v-row justify="center" no-gutters>
    <!-- shift page down -->
    <v-col cols="6">
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
          elevation="0"
          class="px-8 pb-12 mx-auto mt-5"
        >
          <v-card
            color="transparent"
            elevation="0"
            class="px-8 pb-12 mx-auto"
          ></v-card>

          <h1 class="display-1 font-weight-thin mb-4">Ready to Join?</h1>
          <v-card
            color="transparent"
            elevation="0"
            class="px-8 pb-12 mx-auto"
          ></v-card>

          <v-card-title class="text-center">
            <!-- <p class="heading font-weight-thin mb-4">
              Ready to Join?
            </p> -->
          </v-card-title>

          <v-form>
            <v-text-field
              v-model="code"
              label="Invite Code"
              type="text"
              :rules="emailRules"
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
            <v-col sm="5" text-sm-right>
              <!-- make it align on same as remember me text -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-sm-right">
              <v-btn variant="text" color="green" @click="checkInvite" block
                >Proceed</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn variant="text" color="blue" to="login" block
                >Return to Login</v-btn
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
import vdialog from '@/components/utils/dialogFrame.vue';
export default {
  name: 'Login',
  data: () => ({
    code: '',
    password: '',
    //grab data.url from api link and set image
    img: '',
    emailRules: [
      (value) => {
        if (value) return true;

        return 'Code is required.';
      },
      // (value) => {

      //   return 'code must be valid.';
      // },
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
    async checkInvite() {
      fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: this.code,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // this.$router.push({
            //   name: 'Register',
            //   params: { code: this.code },
            // });
            // window.frame.register(this.code);
            
          } else {
            this.$toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },

  mounted() {},
};
</script>
