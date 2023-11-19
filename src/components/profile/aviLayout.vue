<template>
  <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
          <v-slide-group-item
            v-for="n in 4"
            :key="n"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :color="isSelected ? '#0099cc' : ''"
              class="ma-3"
              height="250"
              width="180"
              @click="toggle"
            >
              <!-- show pet url next to avatar -->
              <v-img :src="user.$state.defaultAvatar.snapUrl">
                <!-- position to lower -->
              </v-img>
              <v-img
                :src="user.$state.defaultAvatar.pet.snapUrl"
                style="
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  left: 2;
                  width: 128px;
                  height: 128px;
                "
              ></v-img>
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon v-if="isSelected" color="white" size="48"></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <!-- Display user snapUrl -->
        <v-card-title class="align-center justify-center d-flex">
          {{ user.$state.defaultAvatar.fullName }}</v-card-title
        >
</template>
<script>
export default {
  name: 'aviLayout',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    model: null,
  }),
};
</script>