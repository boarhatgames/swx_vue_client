<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" color="#0099cc" align-tabs="left">
        <v-tab :value="1" @click="changeTab">Normal</v-tab>
        <v-tab :value="2" @click="changeTab">Deluxe</v-tab>
      </v-tabs>
    </v-card>
    <v-row>
      <!-- S2W CATEGORIES -->
      <v-col cols="5">
        <v-card>
          <v-table fixed-header height="590px">
            <thead>
              <tr>
                <th class="text-left">Slice</th>
                <th class="text-left">Weighting</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cat in currCategory"
                :key="cat.id"
                :id="'cat_' + cat.id"
                :class="cat.selected ? 'selected ' : ''"
              >
                <!-- Make these selectable -->
                <td @click="selectCat(cat.id)" class="clickable">
                  {{ cat.name }}
                </td>
                <td class="text-center text-small">
                  {{ cat.weighting }}
                  <v-btn
                    icon
                    size="small"
                    class="float-right"
                    @click="showDeleteDialog(cat.id)"
                  >
                    <v-icon color="red">mdi-close</v-icon>
                    <v-tooltip
                      activator="parent"
                      location="bottom"
                      open-delay="700"
                      >Delete this category</v-tooltip
                    >
                  </v-btn>
                  <v-btn
                    style="
                      background: transparent !important;
                      box-shadow: none !important;
                    "
                    icon
                    size="small"
                    class="float-right"
                    ><v-tooltip
                      activator="parent"
                      location="bottom"
                      open-delay="700"
                      >Slice is currently active.</v-tooltip
                    >
                    <v-icon color="success">mdi-check</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        <br />
        <v-btn
          class="float-right"
          size="small"
          prepend-icon="mdi-pinwheel-outline"
          @click="addCategory"
        >
          Add Category
        </v-btn>

        <p v-if="currCategory.length <= 32" class="text-left text-green">
          Total Active Slices {{ currCategory.length }}/32
        </p>
        <p v-else class="text-left text-red">
          Total Active Slices {{ currCategory.length }}/32
        </p>
      </v-col>
      <v-col cols="7">
        <Details :selectedCat="getCat(selectedCat)" :items="items" />
      </v-col>

      <!-- Category Info + Prizes -->
    </v-row>
    <!-- Misc Settings -->
    <v-row>
      <v-col cols="12">
        <v-expansion-panels v-model="panels">
          <WheelTiming @saveTiming="saveTiming" ref="duration" />
          <SpinPrices />
        </v-expansion-panels>
      </v-col>
    </v-row>
    <!-- Close Dialog -->
    <v-dialog
      v-model="dialog"
      :catId="catId"
      height="500"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-text>
          Are you sure you want to delete this category?<br />
          <span class="text-red"
            >This will delete all prizes in the category!</span
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialog = false">Cancel</v-btn>
          <v-btn class="text-red" @click="(dialog = false), deleteCat(catId)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <snackBar :snackbar="snackbar" />
  </v-container>
</template>

<script>
import Details from './spintowin/Details.vue';
import SpinPrices from './spintowin/SpinPrices.vue';
import snackBar from './utils/snackBar.vue';
import WheelTiming from './spintowin/wheelTiming.vue';

export default {
  name: 'S2W',
  components: {
    Details,
    SpinPrices,
    snackBar,
    WheelTiming,
  },
  props: {
    items: {
      type: Array,
    },
  },

  data() {
    return {
      tab: 1,
      dialog: false,
      panels: [],
      duration: null,
      durationData: null,
      icon: '',
      snackbar: {
        visible: false,
        text: '',
        color: '',
        timeout: null,
        icon: '',
      },

      selectedCat: null,
      selectedClass: '',
      catId: 0,
      categories: [],
      basicCategories: [],
      deluxeCategories: [],
      currCategory: [],
    };
  },
  methods: {
    selectCat(id) {
      this.selectedCat = id;

      this.currCategory.forEach((cat) => {
        if (cat.id == id) {
          let select = { selected: true };
          // append select to cat at this id
          Object.assign(cat, select);

          // this.currCategory
          // console.log(this.currCategory);
        }
        // else remove selected
        else {
          let select = { selected: false };
          Object.assign(cat, select);
        }
      });
    },

    async getCategories() {
      // Get Categories
      const resp = await fetch('/api/s2w/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return data;
    },

    deleteCat(id) {
      this.currCategory = this.currCategory.filter((cat) => cat.id != id);
      console.log(id);
    },
    showDeleteDialog(id) {
      this.dialog = true;
      this.catId = id;
    },
    changeTab() {
      if (this.tab == 1) {
        this.currCategory = this.basicCategories;
      } else if (this.tab == 2) {
        this.currCategory = this.deluxeCategories;
      }
    },
    addCategory() {
      // TODO  add category to database via api
      this.currCategory.push({
        id: 0,
        name: 'New Category',
        count: 0,
        weighting: 0,
        background: 0,
        isDeluxe: 0,
      });
    },
    getCat(id) {
      return this.currCategory.find((cat) => cat.id == id);
    },

    async saveTiming(data) {
      // TODO save timing to database via api
      // Error Handling
      if (data == null) {
        this.triggerSnackbar({
          visible: true,
          text: 'Please enter a duration',
          color: 'error',
          timeout: 2000,
          icon: 'mdi-alert-circle',
        });

        // make the v-text-field typing
        this.$refs.duration.$refs.duration.focus();
        return;
      }
      this.panels = [];
      this.triggerSnackbar({
        visible: true,
        text: 'Timing Saved',
        color: 'success',
        timeout: 2000,
        icon: 'mdi-check-circle',
      });

      // Save to database
      await fetch('/api/s2w/timing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // postData = timing=> {timing: data}

        body: JSON.stringify({ timing: data }),
      });
    },

    triggerSnackbar(data) {
      this.snackbar.visible = data.visible;
      this.snackbar.text = data.text;
      this.snackbar.color = data.color;
      this.snackbar.icon = data.icon;
      this.snackbar.timeout = data.timeout;
      setTimeout(() => {
        this.snackbar.visible = false;
      }, this.snackbar.timeout);
    },
    updateDuration(data) {
      this.durationData = data;
    },
  },
  computed: {},
  async created() {
    // Get Categories
    const resp = await fetch('/api/s2w/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();

    this.categories = data;
    data.forEach((category) => {
      if (category.isDeluxe == 1) {
        this.deluxeCategories.push(category);
      } else {
        this.basicCategories.push(category);
      }
    });
    this.changeTab();
    this.duration = await this.getTiming();
  },
};
</script>

<style scoped>
.selected {
  background-color: #333;
}

/* tr not selected hover */
tr:not(.selected):hover {
  background-color: #333;
}

.selected .v-btn {
  /* background: #2121; */
}

.clickable {
  cursor: pointer;
}
</style>
