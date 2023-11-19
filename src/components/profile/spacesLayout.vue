<template>
  <v-row>
          <v-col cols="12">
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('mySpaces')"
              ref="mySpaces"
              :class="{ 'v-btn--active': mySpacesActive }"
            >
              My Spaces
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              ref="myFavs"
              @click="changeTab('favs')"
              :class="{ 'v-btn--active': favsActive }"
            >
              Favorites
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('pop')"
              :class="{ 'v-btn--active': popularActive }"
            >
              Popular
            </v-btn>
            <v-btn
              class="ma-2 text-none"
              rounded
              @click="changeTab('featured')"
              ref="featured"
              :class="{ 'v-btn--active': featuredActive }"
            >
              Featured
            </v-btn>
            <!-- arrow keys to next page use icons -->
            <v-btn
              class="ma-2 float-right"
              id="hasNext"
              rounded
              :class="{ 'v-btn--disabled': rightActive }"
              @click="nextSpace"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              class="ma-2 float-right"
              id="hasPrev"
              rounded
              :class="{ 'v-btn--disabled': leftActive }"
              @click="prevSpace"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
<v-container fluid>
          <v-row>
            <v-col cols="3" v-for="space in spaces" :key="space.id">
              <v-card
                class="mx-auto"
                height="96"
                max-width="128"
                v-if="space.currentVisitors > 0"
                ref="spaceCard"
                :style="{
                  backgroundImage: 'url(' + space.spaceThumbnailSource + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundBlendMode: 'multiply',
                  backgroundColor: 'rgba(0, 153, 0, 0.5)',
                }"
              ></v-card>
              <v-card
                class="mx-auto"
                height="96"
                max-width="128"
                ref="spaceCard"
                @click="this.$router.push('/space/' + space.id + '/')"
                v-else
                :style="{
                  backgroundImage: 'url(' + space.spaceThumbnailSource + ')',
                }"
              ></v-card>
              <p
                class="d-flex font-weight-bold text-caption justify-center"
                v-if="space.currentVisitors > 0"
              >
                {{ space.name }} ({{ space.currentVisitors }})
              </p>
              <p
                class="d-flex font-weight-bold text-caption justify-center"
                style="
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
                v-else
              >
                {{ space.name }}
              </p>
              <!-- <p
                v-if="space.currentVisitors > 0"
                class="d-flex font-weight-bold text-caption justify-center"
              >
                <v-chip
                  color="green"
                  class="white--text text-caption"
                  :alt="space.currentVisitors + 'Online Now'"
                >
                  {{ space.currentVisitors }} {{ visitorText }}
                </v-chip>
              </p> -->
            </v-col>
          </v-row>
        </v-container>
</template>

<script>
export default {
  name: 'spacesLayout',
  props: {
    spaces: {
      type: Array,
      required: true,
    },

    mySpacesActive: {
      type: Boolean,
      required: true,
    },
    favsActive: {
      type: Boolean,
      required: true,
    },
    featuredActive: {
      type: Boolean,
      required: true,
    },
    popularActive: {
      type: Boolean,
      required: true,
    },

    rightActive: {
      type: Boolean,
      required: true,
    },

    leftActive: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['changeTab', 'nextSpace', 'prevSpace'],

  methods: {
    changeTab(tab) {
      this.$emit('changeTab', tab);
    },
    nextSpace() {
      this.$emit('nextSpace');
    },
    prevSpace() {
      this.$emit('prevSpace');
    },
  },
}
</script>

