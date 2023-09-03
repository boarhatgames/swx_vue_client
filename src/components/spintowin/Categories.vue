<template>
  <v-card>
    <v-table fixed-header height="590px">
      <thead>
        <tr>
          <th class="text-left">Slice</th>
          <th class="text-left">Weighting</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in currCategory" :key="cat.id">
          <!-- Make these selectable -->
          <td>
            {{ cat.name }}
          </td>
          <td class="text-center text-small">
            {{ cat.weighting }}

            <v-btn
              icon
              size="x-small"
              class="float-right"
              @click="$emit('showDeleteDialog', cat.id)"
            >
              <v-icon color="error">mdi-close</v-icon>
              <v-tooltip activator="parent" location="bottom" open-delay="700"
                >Delete this category</v-tooltip
              >
            </v-btn>
            <v-btn
              style="color: transparent !important; box-shadow: none !important"
              icon
              size="small"
              class="float-right"
              ><v-tooltip activator="parent" location="bottom" open-delay="700"
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
  <v-btn class="float-right" size="small" prepend-icon="mdi-pinwheel-outline">
    Add Category
  </v-btn>

  <p class="text-left text-green">
    Total Active Slices {{ currCategory.length }}/32
  </p>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Categories',
  props: {
    currCategory: {
      type: Array,
      required: true,
    },
  },
  emits: ['showDeleteDialog'],
});
</script>
