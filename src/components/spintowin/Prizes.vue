<template>
  <!-- comboBox & textarea -->
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Prize</th>
        <th class=""></th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody height="100vh">
      <tr>
        <!-- Make these selectable -->
        <td>
          <v-row align-content="space-evenly">
            <v-col cols="5">
              <v-select
                :model-value="getType(prizeType)"
                :items="type"
                outlined
                dense
                persistent-hint
                :rules="prizeRules"
                :prepend-inner-icon="typeIcon"
              />
            </v-col>
            <v-col cols="7">
              <v-autocomplete
                v-if="prizeType == 1"
                v-model="select"
                v-model:search="search"
                :items="items"
                :loading="loading"
                color="blue-grey-lighten-2"
                item-title="model_desc"
                item-value="model_desc"
                label="Select"
                hide-no-data
                hide-details
                return-object
              >
                <!-- <template v-slot:chip="{ props, item }">
                  <v-chip v-bind="props" :text="item.raw.name"></v-chip>
                </template> -->

                <!-- <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item?.raw?.name"
                  ></v-list-item>
                </template> -->
              </v-autocomplete>
              <v-text-field
                v-if="prizeType == 3"
                outlined
                dense
                persistent-hint
                clearable
                :rules="descriptionRules"
            /></v-col>
          </v-row>
        </td>
        <td class="checkboxes">
          <!-- Two checkboxes -->
          <v-row align-content="stretch">
            <!-- <v-col cols="6"> -->
            <v-checkbox />
            <!-- </v-col> -->
            <!-- <v-col cols="6"> -->
            <v-checkbox />
            <!-- </v-col> -->
          </v-row>
        </td>
        <td>
          <v-row justify="center" align-content="start">
            <v-btn icon size="small" class="float-right" @click="">
              <v-icon color="red">mdi-close</v-icon>
              <v-tooltip activator="parent" location="bottom" open-delay="700"
                >Delete this category</v-tooltip
              >
            </v-btn>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'Prizes',
  props: {
    prize: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      type: ['Model', 'Gold', 'Tokens'],
      item: [],
      select: null,
      search: null,
      itemSearch: [],
      loading: false,
      itemData: [],
      prizeRules: [(v) => !!v || 'Prize is required'],
      descriptionRules: [(v) => !!v || 'Description is required'],
      prizeType: this.prize.length > 0 ? this.prize[0].type : null,
      items: this.items.map((item) => {
        return {
          name: item.model_desc,
          modelId: item.model_id,
          icon: item.model_icon,
        };
      }),
    };
  },

  methods: {
    getType(data) {
      switch (data) {
        case 1:
          return this.type[0];
        case 2:
          return this.type[1];
        case 3:
          return this.type[2];
      }
    },
    typeIcon() {
      if (this.prize.length > 0) {
        if (this.prize[0].type == 1) {
          return '';
        } else if (this.prize[0].type == 2) {
          return '';
        } else if (this.prize[0].type == 3) {
          return '';
        }
      }
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items.filter((e) => {
          console.log(e);
          return e.model_desc.toLowerCase().indexOf(v.toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },

  updated() {
    if (this.prize.length > 0) {
      this.prizeType = this.prize[0].type;
      // this.items = this.items.map((item) => {
      //   return {
      //     name: item.model_desc,
      //     modelId: item.model_id,
      //     icon: item.model_icon,
      //   };
      // });
      console.log(this.icons);
      this.getType(this.prizeType);
    }
    // this.prize = console.log('Prizes updated');
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  created() {
    if (this.prize.length > 0) {
      this.prizeType = this.prize[0].type;

      // this.items.map((item) => {
      //   return {
      //     name: item.model_desc,
      //     modelId: item.model_id,
      //     icon: item.model_icon,
      //   };
      // });
    }
  },
};
</script>

<style scoped>
.checkboxes {
  width: 88px;
}
</style>
