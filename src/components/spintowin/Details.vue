<template>
  <v-card v-if="selectedCat != null">
    <v-card-title>{{ catName }}</v-card-title>
    <v-card-subtitle>{{ selectedCat.id }}</v-card-subtitle>
    <v-alert :type="alertType" variant="tonal">
      {{ alertText }}
      <!-- Icon Buttons for cancel and save -->
      <v-btn
        v-if="cancel"
        @click="cancelChanges"
        icon
        size="small"
        class="float-right p-2"
      >
        <v-icon color="red">mdi-close</v-icon>
        <v-tooltip activator="parent" location="bottom" open-delay="500"
          >Cancel changes</v-tooltip
        >
      </v-btn>
      <v-btn
        v-if="save"
        @click="saveChanges"
        style="margin-right: 5px !important"
        icon
        size="small"
        class="float-right p-5"
        ><v-tooltip activator="parent" location="bottom" open-delay="700"
          >Save changes</v-tooltip
        >
        <v-icon color="success">mdi-check</v-icon>
      </v-btn>
    </v-alert>
    <v-tabs v-model="cat_tab" color="#0099cc" align-tabs="left">
      <v-tab :value="1">Properties</v-tab>
      <v-tab :value="2"
        >Prizes ({{ selectedCat.prizes.length }})<v-spacer
          ><v-btn
            v-if="cat_tab != 2"
            disabled
            icon="mdi-plus"
            size="x-small"
          ></v-btn>
          <v-btn
            v-if="cat_tab == 2"
            icon="mdi-plus"
            size="x-small"
          ></v-btn> </v-spacer
      ></v-tab>
    </v-tabs>
    <!-- Show a form of active (checkmark), Name (text), Count(Number) cant go past 99 Weighting (number), Background (number) -->
    <v-form v-if="cat_tab == 1">
      <v-container fluid>
        <v-switch
          label="Active"
          color="#0099cc"
          type="checkbox"
          :true-value="1"
          :false-value="0"
          :model-value="selectedCat.active"
          v-model="activeSwitch"
          @change="modified(selectedCat.active)"
        />
        <v-text-field
          clearable
          label="Name"
          type="text"
          hide-details="auto"
          :model-value="selectedCat.name"
          v-model="catName"
          @change="modified(selectedCat.name)"
        />
        <br />
        <v-text-field
          label="Count"
          type="number"
          :model-value="selectedCat.count"
          :counter="2"
          :rules="[
            (v) => v >= 0 || 'Count must be greater than 0',
            (v) => v <= 99 || 'Count must be less than 99',
          ]"
          v-model="catCount"
          @change="modified(selectedCat.count)"
        />
        <v-text-field
          label="Weighting"
          type="number"
          :model-value="selectedCat.weighting"
          v-model="catWeighting"
          @change="modified(selectedCat.weighting)"
        />
        <!-- TODO convert this into a dropdown -->
        <v-text-field
          label="Background"
          type="number"
          :model-value="selectedCat.background"
          v-model="catBackground"
          @change="modified(selectedCat.background)"
        />
      </v-container>
    </v-form>
    <Prizes v-if="cat_tab == 2" :prize="prize" :items="items" />
  </v-card>
  <br />
  <v-alert
    v-if="selectedCat == null"
    color="red"
    type="error"
    dense
    variant="tonal"
    ><i>Nothing selected.</i></v-alert
  >
</template>

<script>
import Prizes from './Prizes.vue';

export default {
  name: 'Details',
  props: {
    selectedCat: {
      type: null,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    Prizes,
  },
  data() {
    return {
      cat_tab: null,
      dAlert: null,
      alertType: null,
      alertText: '',
      cancel: false,
      save: false,
      active: this.selectedCat != null ? this.selectedCat.active : null,
      activeSwitch: this.selectedCat != null ? this.selectedCat.active : null,
      catName: this.selectedCat != null ? this.selectedCat.name : null,
      name: this.selectedCat != null ? this.selectedCat.name : null,
      catCount: this.selectedCat != null ? this.selectedCat.count : null,
      catWeighting:
        this.selectedCat != null ? this.selectedCat.weighting : null,
      catBackground:
        this.selectedCat != null ? this.selectedCat.background : null,
      prize: this.selectedCat != null ? this.selectedCat.prizes : [],
    };
  },
  methods: {
    cancelChanges() {
      this.activeSwitch = this.selectedCat.active;
      this.active = this.selectedCat.active;
      this.catName = this.selectedCat.name;
      this.name = this.selectedCat.name;
      this.catCount = this.selectedCat.count;
      this.catWeighting = this.selectedCat.weighting;
      this.catBackground = this.selectedCat.background;
      this.cancel = false;
      this.save = false;
      this.alertType = 'success';
      this.alertText = 'Unmodified';
    },
    saveChanges() {
      this.selectedCat.active = this.activeSwitch;
      this.selectedCat.name = this.catName;
      this.selectedCat.count = this.catCount;
      this.selectedCat.weighting = this.catWeighting;
      this.selectedCat.background = this.catBackground;
      this.cancel = false;
      this.save = false;
      this.alertType = 'success';
      this.alertText = 'Saved';

      // TODO save to database
    },
    modified(model) {
      // TODO figure out how to make this cleaner
      switch (model) {
        case this.selectedCat.active:
          // set active to the opposite of what it is
          // check other cases to see if they are modified
          this.active = !this.active;
          if (
            this.selectedCat.active != this.active ||
            this.selectedCat.name != this.catName ||
            this.selectedCat.count != this.catCount ||
            this.selectedCat.weighting != this.catWeighting ||
            this.selectedCat.background != this.catBackground
          ) {
            this.modify();
          } else {
            this.unmodified();
          }
          break;
        case this.selectedCat.name:
          this.name = !this.catName;
          if (
            this.selectedCat.name != this.catName ||
            this.selectedCat.count != this.catCount ||
            this.selectedCat.weighting != this.catWeighting ||
            this.selectedCat.background != this.catBackground ||
            this.selectedCat.active != this.active
          ) {
            this.modify();
          } else {
            this.unmodified();
          }
          break;
        case this.selectedCat.count:
          if (
            this.selectedCat.count != this.catCount ||
            this.selectedCat.weighting != this.catWeighting ||
            this.selectedCat.background != this.catBackground ||
            this.selectedCat.active != this.active ||
            this.selectedCat.name != this.catName
          ) {
            this.modify();
          } else {
            this.unmodified();
          }
          break;
        case this.selectedCat.weighting:
          if (
            this.selectedCat.weighting != this.catWeighting ||
            this.selectedCat.background != this.catBackground ||
            this.selectedCat.active != this.active ||
            this.selectedCat.name != this.catName ||
            this.selectedCat.count != this.catCount ||
            this.selectedCat.active != this.active
          ) {
            this.modify();
          } else {
            this.unmodified();
          }
          break;
        case this.selectedCat.background:
          if (
            this.selectedCat.background != this.catBackground ||
            this.selectedCat.active != this.active ||
            this.selectedCat.name != this.catName ||
            this.selectedCat.count != this.catCount ||
            this.selectedCat.weighting != this.catWeighting
          ) {
            this.modify();
          } else {
            this.unmodified();
          }
          break;

        default:

        // this.active = null;
      }

      // } else {
      //   this.alertType = 'success';
      //   this.alertText = 'Unmodified';
      // }
      // add a v-btn save and cancel buttons to the #alert
    },
    modify() {
      this.alertType = 'warning';
      this.alertText = 'Modified';
      this.cancel = true;
      this.save = true;
    },
    unmodified() {
      this.alertType = 'success';
      this.alertText = 'Unmodified';
      this.cancel = false;
      this.save = false;
    },
  },
  updated() {
    // this.active = this.selectedCat != null ? this.selectedCat.active : null;
    // console.log(this.active);
    this.alertType = 'success';
    this.alertText = 'Unmodified';
    this.cancel = false;
    this.save = false;
    if (this.selectedCat != null) {
      this.active = this.selectedCat.active;
      this.activeSwitch = this.selectedCat.active;
      this.catName = this.selectedCat.name;
      this.name = this.selectedCat.name;
      this.catCount = this.selectedCat.count;
      this.catWeighting = this.selectedCat.weighting;
      this.catBackground = this.selectedCat.background;
      this.prize = this.selectedCat.prizes;
      // this.modify(this.active);
    }
  },

  created() {
    this.alertType = 'success';
    this.alertText = 'Unmodified';
  },
};
</script>
